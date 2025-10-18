#!/bin/bash

# GitHub Secrets Quick Setup Script
# This script helps you set up GitHub repository secrets for deployment

echo "================================================"
echo "GitHub Secrets Setup for Gifted Solutions"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Step 1: Get Vercel Credentials${NC}"
echo "----------------------------------------"
echo ""
echo "1. Get Vercel Token:"
echo "   - Go to: https://vercel.com/account/tokens"
echo "   - Click 'Create Token'"
echo "   - Name it: 'GitHub Actions'"
echo "   - Copy the token"
echo ""

# Check if .vercel directory exists
if [ -d ".vercel" ]; then
    echo -e "${GREEN}✓ Found .vercel directory${NC}"
    if [ -f ".vercel/project.json" ]; then
        echo ""
        echo -e "${BLUE}Your Vercel Project Info:${NC}"
        cat .vercel/project.json | grep -E '"projectId"|"orgId"' | sed 's/,$//'
        echo ""
    fi
else
    echo -e "${YELLOW}⚠ .vercel directory not found${NC}"
    echo "   Run: pnpm dlx vercel link --yes"
    echo ""
fi

echo ""
echo -e "${YELLOW}Step 2: Add Secrets to GitHub${NC}"
echo "----------------------------------------"
echo ""
echo "Go to your GitHub repository:"
echo "Settings → Secrets and variables → Actions → New repository secret"
echo ""

echo -e "${BLUE}Required Secrets (copy these names exactly):${NC}"
echo ""

echo "=== Vercel (3 secrets) ==="
echo "VERCEL_TOKEN"
echo "VERCEL_ORG_ID"
echo "VERCEL_PROJECT_ID"
echo ""

echo "=== Firebase (7 secrets) ==="
echo "NEXT_PUBLIC_FIREBASE_API_KEY"
echo "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
echo "NEXT_PUBLIC_FIREBASE_PROJECT_ID"
echo "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
echo "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
echo "NEXT_PUBLIC_FIREBASE_APP_ID"
echo "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"
echo ""

echo "=== Supabase (2 secrets) ==="
echo "NEXT_PUBLIC_SUPABASE_URL"
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo ""

echo "=== Business (3 secrets) ==="
echo "NEXT_PUBLIC_ADMIN_EMAIL"
echo "NEXT_PUBLIC_WHATSAPP_NUMBER"
echo "NEXT_PUBLIC_BUSINESS_NAME"
echo "NEXT_PUBLIC_BUSINESS_LOCATION"
echo ""

echo -e "${YELLOW}Step 3: Push to GitHub${NC}"
echo "----------------------------------------"
echo ""
echo "# If you haven't initialized git yet:"
echo "git init"
echo "git add ."
echo "git commit -m 'Initial commit with GitHub Actions'"
echo ""
echo "# Add your GitHub repository:"
echo "git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
echo "git branch -M main"
echo "git push -u origin main"
echo ""

echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}After pushing, GitHub Actions will automatically${NC}"
echo -e "${GREEN}deploy your site to Vercel on every commit!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""

echo "For detailed instructions, see: GITHUB_SECRETS_SETUP.md"

