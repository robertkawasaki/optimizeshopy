// Configuration
const config = {
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