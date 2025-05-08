import fetch from 'node-fetch';
import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Google Places API Integration
const GOOGLE_PLACE_ID = ''; // Replace with your actual Google Place ID
const API_KEY = ''; // Replace with your actual Google API key

async function fetchGoogleReviews() {
    try {
        console.log('Fetching reviews from Google Places API...');
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=reviews,rating,user_ratings_total,name&key=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status !== 'OK') {
            throw new Error(`Google Places API error: ${data.status}`);
        }

        console.log('Processing reviews data...');
        // Process and format the reviews
        const processedReviews = data.result.reviews.map(review => ({
            reviewer: {
                displayName: review.author_name,
                profilePhotoUrl: review.profile_photo_url,
                googleProfileUrl: review.author_url
            },
            starRating: review.rating,
            comment: review.text,
            createTime: review.time,
            verification: {
                source: 'Google Places',
                verified: true,
                reviewUrl: `https://www.google.com/maps/place?cid=${GOOGLE_PLACE_ID}`,
                timestamp: new Date().toISOString()
            }
        }));

        // Create the reviews data object
        const reviewsData = {
            lastUpdated: new Date().toISOString(),
            averageRating: data.result.rating,
            totalReviews: data.result.user_ratings_total,
            placeId: GOOGLE_PLACE_ID,
            verification: {
                source: 'Google Places API',
                lastVerified: new Date().toISOString(),
                apiVersion: 'v1',
                placeDetails: {
                    name: data.result.name,
                    placeId: GOOGLE_PLACE_ID
                }
            },
            reviews: processedReviews
        };

        // Generate the JavaScript code to update reviews-data.js
        const jsCode = `// Google Reviews Data - Auto-generated from Google Places API
// Last updated: ${new Date().toLocaleString()}
const reviewsData = ${JSON.stringify(reviewsData, null, 2)};`;

        // Write directly to file instead of using the API endpoint
        const filePath = join(__dirname, 'reviews-data.js');
        await writeFile(filePath, jsCode, 'utf8');
        
        console.log('Successfully updated reviews data');
        return reviewsData;
    } catch (error) {
        console.error('Error fetching Google reviews:', error);
        throw error;
    }
}

// Export the function for use in other scripts
export { fetchGoogleReviews }; 