// Stripe Configuration Template
// Copy this file to config.js and replace the values with your actual Stripe configuration
const stripeConfig = {
    // Stripe API Keys
    publishableKey: 'pk_test_your_publishable_key', // Replace with your publishable key
    secretKey: 'sk_test_your_secret_key', // Replace with your secret key

    // Payment Links
    paymentLinks: {
        report: 'https://buy.stripe.com/your_report_link', // Replace with your report payment link
        implementation: 'https://buy.stripe.com/your_implementation_link' // Replace with your implementation payment link
    }
};

// Export the configuration
export default stripeConfig; 