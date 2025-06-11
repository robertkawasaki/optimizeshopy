// Configuration
const config = {
    
    // Payment Links
    paymentLinks: {
        report: 'https://buy.stripe.com/9AQ7wl9mtd7Z87eeUU',
        implementation: 'https://buy.stripe.com/eVq6oGbbhbem5fAcnT1Fe01'
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