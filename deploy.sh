#!/bin/bash

# OptimizeYourShopify Deployment Script
# This script helps deploy the website to GitHub Pages or other hosting services

echo "OptimizeYourShopify Deployment Script"
echo "====================================="

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "Error: Git is not installed. Please install Git and try again."
    exit 1
fi

# Function to deploy to GitHub Pages
deploy_to_github_pages() {
    echo "Deploying to GitHub Pages..."
    
    # Check if remote repository is set up
    if ! git remote -v | grep -q "origin"; then
        echo "No remote repository found. Please set up a GitHub repository first."
        echo "Then run: git remote add origin https://github.com/yourusername/optimizeshopy.git"
        exit 1
    fi
    
    # Create a gh-pages branch
    git checkout -b gh-pages
    
    # Add all files
    git add .
    
    # Commit changes
    git commit -m "Deploy to GitHub Pages"
    
    # Push to GitHub
    git push origin gh-pages --force
    
    echo "Deployment to GitHub Pages complete!"
    echo "Your site should be available at: https://yourusername.github.io/optimizeshopy/"
    
    # Switch back to main branch
    git checkout main
}

# Function to deploy to Netlify
deploy_to_netlify() {
    echo "Deploying to Netlify..."
    
    # Check if Netlify CLI is installed
    if ! command -v netlify &> /dev/null; then
        echo "Netlify CLI is not installed. Installing..."
        npm install -g netlify-cli
    fi
    
    # Deploy to Netlify
    netlify deploy --prod
    
    echo "Deployment to Netlify complete!"
}

# Function to deploy to Vercel
deploy_to_vercel() {
    echo "Deploying to Vercel..."
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        echo "Vercel CLI is not installed. Installing..."
        npm install -g vercel
    fi
    
    # Deploy to Vercel
    vercel --prod
    
    echo "Deployment to Vercel complete!"
}

# Main menu
echo "Select deployment option:"
echo "1) Deploy to GitHub Pages"
echo "2) Deploy to Netlify"
echo "3) Deploy to Vercel"
echo "4) Exit"
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        deploy_to_github_pages
        ;;
    2)
        deploy_to_netlify
        ;;
    3)
        deploy_to_vercel
        ;;
    4)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid choice. Exiting..."
        exit 1
        ;;
esac

echo "Deployment process completed!" 