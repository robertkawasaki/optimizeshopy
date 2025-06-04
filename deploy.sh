#!/bin/bash

# OptimizeYourShopify Deployment Script
# This script helps deploy the website to various hosting services

echo "OptimizeYourShopify Deployment Script"
echo "====================================="

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "Error: Git is not installed. Please install Git and try again."
    exit 1
fi

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
echo "1) Deploy to Netlify"
echo "2) Deploy to Vercel"
echo "3) Exit"
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        deploy_to_netlify
        ;;
    2)
        deploy_to_vercel
        ;;
    3)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid choice. Exiting..."
        exit 1
        ;;
esac

echo "Deployment process completed!" 