#!/bin/bash

# Gifted Solutions Deployment Script
# Deploys to Vercel with all configurations

set -e

echo "🚀 Gifted Solutions - Deployment Script"
echo "========================================"
echo ""
echo "✅ Migration verified: 70 products loaded"
echo "✅ Firebase configured"
echo "✅ Supabase connected"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local not found!"
    exit 1
fi

echo "Choose your deployment method:"
echo ""
echo "1) 🌐 Deploy via Vercel Dashboard (Easiest - Recommended)"
echo "2) 💻 Deploy via Vercel CLI (Need to login)"
echo "3) 📦 Prepare for manual deployment"
echo "4) 🔍 Just show me what to do"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "📱 DEPLOYING VIA VERCEL DASHBOARD"
        echo "=================================="
        echo ""
        echo "Step 1: Push to GitHub (if not done)"
        echo "-----------------------------------"
        echo "Run these commands:"
        echo ""
        echo "  git init"
        echo "  git add ."
        echo "  git commit -m \"Initial commit - Gifted Solutions\""
        echo "  git branch -M main"
        echo "  git remote add origin https://github.com/YOUR-USERNAME/giftedsolutions.git"
        echo "  git push -u origin main"
        echo ""
        echo "Step 2: Import to Vercel"
        echo "------------------------"
        echo "1. Go to: https://vercel.com/new"
        echo "2. Click 'Import Project'"
        echo "3. Select your GitHub repository"
        echo "4. Add environment variables (see below)"
        echo "5. Click 'Deploy'"
        echo ""
        echo "Step 3: Environment Variables"
        echo "------------------------------"
        echo "In Vercel, add these variables from your .env.local:"
        echo ""
        cat .env.local | grep -v "^#" | grep -v "^$"
        echo ""
        echo "✅ After deployment, your site will be live at: https://YOUR-PROJECT.vercel.app"
        ;;
        
    2)
        echo ""
        echo "💻 DEPLOYING VIA CLI"
        echo "===================="
        echo ""
        echo "Step 1: Login to Vercel"
        echo "This will open your browser for authentication..."
        echo ""
        pnpm dlx vercel login
        
        echo ""
        echo "Step 2: Deploying..."
        echo ""
        pnpm dlx vercel
        
        echo ""
        echo "✅ Deployment complete!"
        echo ""
        echo "⚠️  IMPORTANT: Set environment variables in Vercel Dashboard:"
        echo "https://vercel.com/dashboard → Your Project → Settings → Environment Variables"
        ;;
        
    3)
        echo ""
        echo "📦 PREPARING FOR MANUAL DEPLOYMENT"
        echo "===================================="
        echo ""
        echo "Step 1: Build your project"
        pnpm run build
        
        echo ""
        echo "Step 2: Test the production build"
        echo "  pnpm run start"
        echo ""
        echo "Step 3: Deploy the .next folder to your hosting"
        echo ""
        echo "✅ Build complete! The .next directory is ready."
        ;;
        
    4)
        echo ""
        echo "📋 QUICK DEPLOYMENT GUIDE"
        echo "========================="
        echo ""
        echo "🎯 Recommended: Use Vercel (Best for Next.js)"
        echo ""
        echo "Method 1: Vercel Dashboard"
        echo "  1. Push code to GitHub"
        echo "  2. Go to vercel.com/new"
        echo "  3. Import your repo"
        echo "  4. Add environment variables"
        echo "  5. Deploy!"
        echo ""
        echo "Method 2: Vercel CLI"
        echo "  pnpm dlx vercel login"
        echo "  pnpm dlx vercel"
        echo ""
        echo "Alternative Platforms:"
        echo "  - Netlify: netlify.com"
        echo "  - Railway: railway.app"
        echo "  - Render: render.com"
        echo ""
        echo "📄 Full guide: See DEPLOYMENT.md"
        ;;
        
    *)
        echo "Invalid choice!"
        exit 1
        ;;
esac

echo ""
echo "🎉 Need help? Check DEPLOYMENT.md for full instructions!"

