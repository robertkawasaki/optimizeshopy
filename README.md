# OptimizeYourShopify Landing Page

A clean, conversion-focused landing page for the OptimizeYourShopify service, inspired by Shopify's pricing page design. This single-page website is designed to validate the MVP concept with direct payment integration.

## Features

- Clean, minimalist design with plenty of white space
- Mobile-responsive layout
- Stripe payment integration
- Google Analytics tracking
- Live chat widget
- Smooth scrolling and animations
- Thank you page with next steps

## Project Structure

- `index.html` - Main landing page
- `thank-you.html` - Thank you page after purchase
- `styles.css` - CSS styles
- `script.js` - JavaScript for interactivity and payment processing

## Setup Instructions

1. Clone this repository
2. Replace the Stripe publishable key in `script.js` with your actual key:
   ```javascript
   const stripe = Stripe('pk_test_YOUR_STRIPE_PUBLISHABLE_KEY');
   ```
3. Replace the Google Analytics ID in both HTML files:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   ```
4. Deploy to your web server

## Customization

### Colors

The color scheme is defined in the CSS variables at the top of `styles.css`. You can easily change the primary color and other colors by modifying these variables:

```css
:root {
    --primary-color: #008060;
    --primary-dark: #004c3f;
    --primary-light: #e3f1ee;
    /* other colors */
}
```

### Content

Update the content in `index.html` to match your specific service offerings and messaging.

### Pricing

Update the pricing in both `index.html` and `script.js`:

In `index.html`:
```html
<div class="price">
    <span class="currency">$</span>
    <span class="amount">149</span>
</div>
```

In `script.js`:
```javascript
const REPORT_PRICE = 149;
const IMPLEMENTATION_PRICE = 399;
```

## Payment Processing

This demo uses Stripe for payment processing. In a production environment, you would need to:

1. Set up a Stripe account
2. Replace the test publishable key with your live key
3. Implement server-side code to process payments securely
4. Set up webhooks to handle successful payments

## Analytics

The site includes Google Analytics tracking for:
- Page views
- Button clicks
- Form submissions
- Purchases

## Browser Support

The site is compatible with all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Design inspired by [Shopify's pricing page](https://www.shopify.com/es-es/precios)
- Icons from [Font Awesome](https://fontawesome.com/)
- Payment processing by [Stripe](https://stripe.com/) 