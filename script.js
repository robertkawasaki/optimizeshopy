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
        closeModal.addEventListener('click', closePaymentModal);
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
                '::placeholder': {
                    color: '#637381'
                }
            }
        }
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
                // This is where you would typically make an API call to your backend
                // For demo purposes, we'll simulate a successful payment
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

// Validate Shopify URL
function isValidShopifyUrl(url) {
    // Basic validation for Shopify URLs
    // This can be enhanced with more specific validation if needed
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.includes('myshopify.com') || 
               urlObj.hostname.includes('shopify.com') ||
               urlObj.hostname.includes('.com') && urlObj.hostname !== 'myshopify.com';
    } catch (e) {
        return false;
    }
}

// Show error message
function showError(message) {
    // Remove any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and show new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    paymentForm.appendChild(errorElement);
    
    // Reset button
    const submitButton = document.querySelector('#payment-form-element button');
    if (submitButton) {
        submitButton.textContent = `Pay $${document.querySelector('.modal-content h2').textContent.includes('Report') ? REPORT_PRICE : IMPLEMENTATION_PRICE}`;
        submitButton.disabled = false;
    }
}

// Close payment modal
function closePaymentModal() {
    paymentModal.style.display = 'none';
    
    // Clear payment form
    paymentForm.innerHTML = '';
}

// Simulate payment processing
function simulatePayment(paymentMethodId, type, price, shopUrl) {
    // In a real implementation, you would send the paymentMethodId to your server
    // and process the payment there. For this demo, we'll simulate a successful payment.
    
    // Store the shop URL in localStorage for the thank you page
    localStorage.setItem('shopUrl', shopUrl);
    
    setTimeout(() => {
        // Hide modal
        closePaymentModal();
        
        // Redirect to thank you page
        window.location.href = 'thank-you.html';
        
        // Track purchase in Google Analytics
        if (typeof gtag === 'function') {
            gtag('event', 'purchase', {
                transaction_id: 'T_' + Math.random().toString(36).substr(2, 9),
                value: price,
                currency: 'USD',
                items: [{
                    item_name: type === 'report' ? 'Store Report' : 'Report + Implementation',
                    price: price,
                    quantity: 1
                }]
            });
        }
    }, 2000);
}

// Open chat widget
function openChatWidget() {
    // In a real implementation, this would open a chat widget
    // For this demo, we'll just show an alert
    alert('Chat widget would open here. In a real implementation, this would connect to a live chat service.');
    
    // Track event in Google Analytics
    if (typeof gtag === 'function') {
        gtag('event', 'chat_start');
    }
}

// Add smooth scrolling for the entire page
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling behavior to the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add animation to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.problem-card, .pricing-card, .testimonial, .faq-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animation on load
    animateOnScroll();
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

mobileMenuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    if (mainNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (!mainNav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
        mainNav.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Function to change language programmatically
function changeLanguage(lang) {
    if (lang === 'en' || lang === 'es') {
        updateLanguage(lang);
        // Optional: store the preference
        localStorage.setItem('preferredLanguage', lang);
    } else {
        console.error('Unsupported language code. Use "en" or "es".');
    }
}

// Example usage:
// changeLanguage('es'); // Change to Spanish
// changeLanguage('en'); // Change to English 