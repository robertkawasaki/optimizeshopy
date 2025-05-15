// Load header
document.addEventListener('DOMContentLoaded', function() {
    fetch('includes/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            initializeMobileMenu(); // Initialize mobile menu after header is loaded
        });
});

// Mobile Navigation
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.main-nav a');

    if (!mobileMenuToggle || !mainNav || !navOverlay) {
        console.error('Mobile menu elements not found');
        return;
    }

    function toggleMenu() {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    }

    function closeMenu() {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileMenuToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on window resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Use the global config instead of importing
const stripeConfig = window.appConfig;

// Initialize Stripe
let stripe = null;
function initializeStripe() {
    try {
        if (typeof Stripe === 'function' && stripeConfig && stripeConfig.publishableKey) {
            stripe = Stripe(stripeConfig.publishableKey);
            console.log('Stripe initialized successfully');
        } else {
            console.warn('Stripe not available or missing publishable key');
        }
    } catch (error) {
        console.error('Error initializing Stripe:', error);
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Stripe
    initializeStripe();

    // Get button references
    const reportBtn = document.getElementById('report-btn');
    const implementationBtn = document.getElementById('implementation-btn');
    const finalReportBtn = document.getElementById('final-report-btn');
    const finalImplementationBtn = document.getElementById('final-implementation-btn');
    const closeModal = document.querySelector('.close-modal');
    const paymentModal = document.querySelector('.payment-modal');
    const chatButton = document.querySelector('.chat-button');

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
        reportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            try {
                if (stripeConfig && stripeConfig.paymentLinks && stripeConfig.paymentLinks.report) {
                    window.location.href = stripeConfig.paymentLinks.report;
                } else {
                    console.error('Report payment link not configured');
                }
            } catch (error) {
                console.error('Error handling report button click:', error);
            }
        });
    }
    
    if (implementationBtn) {
        implementationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            try {
                if (stripeConfig && stripeConfig.paymentLinks && stripeConfig.paymentLinks.implementation) {
                    window.location.href = stripeConfig.paymentLinks.implementation;
                } else {
                    console.error('Implementation payment link not configured');
                }
            } catch (error) {
                console.error('Error handling implementation button click:', error);
            }
        });
    }
    
    if (finalReportBtn) {
        finalReportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            try {
                if (stripeConfig && stripeConfig.paymentLinks && stripeConfig.paymentLinks.report) {
                    window.location.href = stripeConfig.paymentLinks.report;
                } else {
                    console.error('Report payment link not configured');
                }
            } catch (error) {
                console.error('Error handling final report button click:', error);
            }
        });
    }
    
    if (finalImplementationBtn) {
        finalImplementationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            try {
                if (stripeConfig && stripeConfig.paymentLinks && stripeConfig.paymentLinks.implementation) {
                    window.location.href = stripeConfig.paymentLinks.implementation;
                } else {
                    console.error('Implementation payment link not configured');
                }
            } catch (error) {
                console.error('Error handling final implementation button click:', error);
            }
        });
    }
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            console.log('Close button clicked');
            closePaymentModal();
        });
    }
    
    // Close modal when clicking outside
    if (paymentModal) {
        window.addEventListener('click', (e) => {
            if (e.target === paymentModal) {
                closePaymentModal();
            }
        });
    }
    
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

        // Convert Unix timestamp to milliseconds for JavaScript Date
        const date = new Date(review.createTime * 1000);
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
                    </div>
                    <div class="google-review-date">${formattedDate}</div>
                </div>
            </div>
            <div class="google-review-rating">
                ${createStarRating(review.starRating)}
            </div>
            <div class="google-review-text">${review.comment}</div>
            <div class="google-review-footer">
                ${verificationBadge}
                <a href="${review.verification.reviewUrl}" target="_blank" rel="noopener noreferrer" class="google-review-link">
                    <i class="fab fa-google"></i>
                    View on Google
                </a>
            </div>
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

    // Initialize Google Reviews
    initGoogleReviews();
});

// Mobile CTA Button
const mobileCtaBtn = document.getElementById('mobile-cta-btn');
if (mobileCtaBtn) {
    mobileCtaBtn.addEventListener('click', () => {
        // Scroll to pricing section
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ... rest of your existing script.js code ... 