// Configuration
const config = {
    // Stripe Configuration
    publishableKey: 'pk_test_51RONKdPFOqaqG3QzHbWffrOiD2zAuR25nE7OG845axzk69jEdPZ0zRGUpZ6YTGtc6AtzpzOPa98VC9MhFvoU7y2K00eNamxqx8',
    
    // Payment Links
    paymentLinks: {
        report: 'https://buy.stripe.com/test_28EeVffinbvU9r31qj5Ne00',
        implementation: 'https://buy.stripe.com/your_implementation_link'
    },
    
    // Google Analytics
    googleAnalyticsId: 'G-PCRCLQXFND'
};

// Make config available globally
window.appConfig = config;

// Support CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}

// Support ES modules
if (typeof window !== 'undefined' && window.importScripts) {
    self.config = config;
} 