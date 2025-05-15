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

// Support both module and non-module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else if (typeof window !== 'undefined') {
    window.appConfig = config;
}

// Export for ES modules
export default config; 