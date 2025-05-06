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

### Running Locally

You can run the site locally using any of these methods:

1. Using Python (if installed):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

2. Using Node.js (if installed):
   ```bash
   # Install http-server globally
   npm install -g http-server
   
   # Run the server
   http-server
   ```

3. Using VS Code:
   - Install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"

After starting the server, open your browser and navigate to:
- For Python: `http://localhost:8000`
- For http-server: `http://localhost:8080`
- For VS Code Live Server: The browser will open automatically

4. Deploy to your web server

## Deployment Options

### Option 1: Using the Deployment Script

We've included a deployment script that makes it easy to deploy to various platforms:

1. Make the script executable:
   ```bash
   chmod +x deploy.sh
   ```

2. Run the script:
   ```bash
   ./deploy.sh
   ```

3. Follow the prompts to deploy to your preferred platform.

### Option 2: Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Add the remote repository:
   ```bash
   git remote add origin https://github.com/yourusername/optimizeshopy.git
   ```
3. Push your code to GitHub:
   ```bash
   git push -u origin main
   ```
4. Go to your repository settings on GitHub
5. Scroll down to the "GitHub Pages" section
6. Select the "main" branch as the source
7. Your site will be published at `https://yourusername.github.io/optimizeshopy/`

### Option 3: Deploy to Netlify

1. Create an account on [Netlify](https://www.netlify.com/)
2. Connect your GitHub repository
3. Configure the build settings:
   - Build command: (leave empty)
   - Publish directory: /
4. Click "Deploy site"

### Option 4: Deploy to Vercel

1. Create an account on [Vercel](https://vercel.com/)
2. Connect your GitHub repository
3. Configure the build settings:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: /
4. Click "Deploy"

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