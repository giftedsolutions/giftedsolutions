#!/bin/bash

# Gifted Solutions - Setup Script
# This script helps you set up the project for development

set -e  # Exit on error

echo "🚀 Gifted Solutions Setup"
echo "========================="
echo ""

# Check Node.js version
echo "✓ Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 22 ]; then
    echo "❌ Node.js 22+ is required. You have $(node -v)"
    echo "Please upgrade: https://nodejs.org/"
    exit 1
fi
echo "  Node.js version: $(node -v) ✓"

# Check pnpm
echo ""
echo "✓ Checking pnpm..."
if ! command -v pnpm &> /dev/null; then
    echo "  pnpm not found. Installing..."
    npm install -g pnpm
fi
echo "  pnpm version: $(pnpm -v) ✓"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
pnpm install

# Check for .env.local
echo ""
echo "🔐 Checking environment configuration..."
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found!"
    echo ""
    echo "Please create .env.local with your Supabase credentials:"
    echo ""
    echo "NEXT_PUBLIC_SUPABASE_URL=your-project-url"
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key"
    echo ""
    echo "See SUPABASE_SETUP.md for detailed instructions."
    echo ""
    read -p "Press Enter to continue without .env.local (will fail at runtime) or Ctrl+C to exit..."
else
    echo "  .env.local found ✓"
    
    # Check if variables are set
    if grep -q "your-project-url" .env.local || grep -q "your-anon-key" .env.local; then
        echo "⚠️  Warning: .env.local contains placeholder values"
        echo "  Please update with your actual Supabase credentials"
    fi
fi

# Create public directory if it doesn't exist
echo ""
echo "📁 Setting up directories..."
mkdir -p public
echo "  Directories created ✓"

# Run type check
echo ""
echo "🔍 Running TypeScript type check..."
pnpm run typecheck

# Run linter
echo ""
echo "🧹 Running linter..."
pnpm run lint

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Set up Supabase (see SUPABASE_SETUP.md)"
echo "  2. Update .env.local with your credentials"
echo "  3. Run: pnpm run dev"
echo "  4. Open: http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "  - QUICKSTART.md - Quick start guide"
echo "  - README.md - Full documentation"
echo "  - DEPLOYMENT.md - Deployment guide"
echo ""
echo "Happy coding! 🎉"

