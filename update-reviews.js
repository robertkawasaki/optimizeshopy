import { fetchGoogleReviews } from './js/fetch-google-reviews.js';

// Function to run the update process
async function updateReviews() {
    try {
        console.log('Starting Google Reviews update process...');
        await fetchGoogleReviews();
        console.log('Google Reviews update completed successfully');
    } catch (error) {
        console.error('Failed to update Google Reviews:', error);
        process.exit(1);
    }
}

// Run the update process
updateReviews(); 