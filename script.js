// Initialize Stripe
const stripe = Stripe('pk_test_YOUR_STRIPE_PUBLISHABLE_KEY'); // Replace with your actual Stripe publishable key

// DOM Elements
const reportBtn = document.getElementById('report-btn');
const implementationBtn = document.getElementById('implementation-btn');
const finalReportBtn = document.getElementById('final-report-btn');
const finalImplementationBtn = document.getElementById('final-implementation-btn');
const paymentModal = document.getElementById('payment-modal');
const closeModal = document.querySelector('.close');
const paymentForm = document.getElementById('payment-form');
const chatButton = document.querySelector('.chat-button');

// Prices
const REPORT_PRICE = 149;
const IMPLEMENTATION_PRICE = 399;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Payment buttons
    if (reportBtn) {
        reportBtn.addEventListener('click', () => openPaymentModal('report'));
    }
    
    if (implementationBtn) {
        implementationBtn.addEventListener('click', () => openPaymentModal('implementation'));
    }
    
    if (finalReportBtn) {
        finalReportBtn.addEventListener('click', () => openPaymentModal('report'));
    }
    
    if (finalImplementationBtn) {
        finalImplementationBtn.addEventListener('click', () => openPaymentModal('implementation'));
    }
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            console.log('Close button clicked');
            closePaymentModal();
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            closePaymentModal();
        }
    });
    
    // Chat widget
    if (chatButton) {
        chatButton.addEventListener('click', openChatWidget);
    }
    
    // Track page view in Google Analytics
    if (typeof gtag === 'function') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
        });
    }

    // Google Reviews Integration
    function initGoogleReviews() {
        try {
            if (typeof reviewsData === 'undefined') {
                console.error('reviewsData is not defined. Make sure reviews-data.js is loaded properly.');
                return;
            }
            console.log('Initializing Google Reviews with data:', reviewsData);
            loadGoogleReviews();
        } catch (error) {
            console.error('Error initializing Google Reviews:', error);
        }
    }

    function loadGoogleReviews() {
        try {
            const container = document.getElementById('google-reviews-container');
            if (!container) {
                console.error('Could not find google-reviews-container element');
                return;
            }
            
            // Update average rating and total reviews
            const averageRatingElement = document.getElementById('average-rating');
            const totalReviewsElement = document.getElementById('total-reviews');
            
            if (!averageRatingElement || !totalReviewsElement) {
                console.error('Could not find rating elements');
                return;
            }

            // Update the header with verification info
            const headerSection = document.querySelector('.google-reviews-header');
            if (headerSection) {
                const verificationInfo = document.createElement('div');
                verificationInfo.className = 'verification-info';
                verificationInfo.innerHTML = `
                    <div class="verification-details">
                        <i class="fas fa-shield-alt"></i>
                        <span>Last verified: ${new Date(reviewsData.verification.lastVerified).toLocaleDateString()}</span>
                    </div>
                    <a href="https://www.google.com/maps/place?cid=${reviewsData.placeId}" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       class="verify-link">
                        <i class="fab fa-google"></i>
                        Verify on Google
                    </a>
                `;
                headerSection.appendChild(verificationInfo);
            }

            averageRatingElement.textContent = reviewsData.averageRating.toFixed(1);
            totalReviewsElement.textContent = `Based on ${reviewsData.totalReviews}+ reviews`;

            // Clear existing reviews
            container.innerHTML = '';

            // Display reviews
            reviewsData.reviews.forEach(review => {
                const reviewCard = createReviewCard(review);
                container.appendChild(reviewCard);
            });
        } catch (error) {
            console.error('Error loading Google reviews:', error);
        }
    }

    function createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'google-review-card';

        const date = new Date(review.createTime);
        const formattedDate = date.toLocaleDateString(document.documentElement.lang, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Create verification badge
        const verificationBadge = review.verification.verified ? 
            `<div class="verification-badge">
                <i class="fas fa-check-circle"></i>
                <span>Verified Google Review</span>
            </div>` : '';

        // Create avatar with profile photo or fallback to initials
        const avatarContent = review.reviewer.profilePhotoUrl ? 
            `<img src="${review.reviewer.profilePhotoUrl}" alt="${review.reviewer.displayName}" class="google-review-avatar-img">` :
            `<div class="google-review-avatar-initial">${review.reviewer.displayName.charAt(0)}</div>`;

        card.innerHTML = `
            <div class="google-review-header">
                <div class="google-review-avatar">
                    ${avatarContent}
                </div>
                <div class="google-review-author">
                    <div class="google-review-name">
                        ${review.reviewer.displayName}
                        ${verificationBadge}
                    </div>
                    <!--<div class="google-review-date">${formattedDate}</div>-->
                </div>
            </div>
            <div class="google-review-rating">
                ${createStarRating(review.starRating)}
            </div>
            <div class="google-review-text">${review.comment}</div>
            <!--<div class="google-review-footer">
                <a href="${review.verification.reviewUrl}" target="_blank" rel="noopener noreferrer" class="google-review-link">
                    <i class="fab fa-google"></i>
                    View on Google
                </a>
            </div>-->
        `;

        return card;
    }

    function createStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    // Initialize Google Reviews when the page loads
    initGoogleReviews();
});

// Open payment modal
function openPaymentModal(type) {
    const price = type === 'report' ? REPORT_PRICE : IMPLEMENTATION_PRICE;
    const title = type === 'report' ? 'Store Report' : 'Report + Implementation';
    
    // Update modal content
    document.querySelector('.modal-content h2').textContent = `Complete Your Purchase - ${title}`;
    
    // Create Stripe Elements
    const elements = stripe.elements();
    
    // Create card element
    const card = elements.create('card', {
        style: {
            base: {
                color: '#212b36',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '16px',
                backgroundColor: '#fff',
                '::placeholder': {
                    color: '#637381',
                },
                iconColor: '#00d39e',
                border: '1px solid #dfe3e8',
                borderRadius: '4px',
                padding: '12px',
            },
            invalid: {
                color: '#de3618',
                iconColor: '#de3618',
            },
        },
    });
    
    // Mount card element
    card.mount('#payment-form');
    
    // Create Shopify store URL input field
    const shopUrlContainer = document.createElement('div');
    shopUrlContainer.className = 'form-group';
    
    const shopUrlLabel = document.createElement('label');
    shopUrlLabel.htmlFor = 'shop-url';
    shopUrlLabel.textContent = 'Your Shopify Store URL *';
    
    const shopUrlInput = document.createElement('input');
    shopUrlInput.type = 'url';
    shopUrlInput.id = 'shop-url';
    shopUrlInput.name = 'shop-url';
    shopUrlInput.placeholder = 'https://your-store.myshopify.com';
    shopUrlInput.required = true;
    shopUrlInput.className = 'form-control';
    
    shopUrlContainer.appendChild(shopUrlLabel);
    shopUrlContainer.appendChild(shopUrlInput);
    
    // Add shop URL field before the form
    paymentForm.insertBefore(shopUrlContainer, paymentForm.firstChild);
    
    // Handle form submission
    const form = document.createElement('form');
    form.id = 'payment-form-element';
    
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'btn btn-primary';
    submitButton.textContent = `Pay $${price}`;
    
    form.appendChild(submitButton);
    paymentForm.appendChild(form);
    
    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate shop URL
        const shopUrl = document.getElementById('shop-url').value.trim();
        if (!shopUrl) {
            showError('Please enter your Shopify store URL');
            return;
        }
        
        // Validate URL format
        if (!isValidShopifyUrl(shopUrl)) {
            showError('Please enter a valid Shopify store URL');
            return;
        }
        
        // Show loading state
        submitButton.textContent = 'Processing...';
        submitButton.disabled = true;
        
        // Create payment method
        stripe.createPaymentMethod({
            type: 'card',
            card: card
        }).then(result => {
            if (result.error) {
                // Handle error
                showError(result.error.message);
                
                // Reset button
                submitButton.textContent = `Pay $${price}`;
                submitButton.disabled = false;
            } else {
                // Send payment method ID to your server
                simulatePayment(result.paymentMethod.id, type, price, shopUrl);
            }
        });
    });
    
    // Show modal
    paymentModal.style.display = 'flex';
    
    // Track event in Google Analytics
    if (typeof gtag === 'function') {
        gtag('event', 'begin_checkout', {
            currency: 'USD',
            value: price,
            items: [{
                item_name: title,
                price: price,
                quantity: 1
            }]
        });
    }
}

function closePaymentModal() {
    // Implementation of closePaymentModal function
}

function openChatWidget() {
    // Implementation of openChatWidget function
}

function showError(message) {
    // Implementation of showError function
}

function isValidShopifyUrl(url) {
    // Implementation of isValidShopifyUrl function
    return true; // Placeholder return, actual implementation needed
}