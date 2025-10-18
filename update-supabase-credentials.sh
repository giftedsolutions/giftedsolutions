#!/bin/bash

# Supabase Credentials Update Script
# This script helps you update Supabase credentials in .env.local

set -e

echo "================================================"
echo "  Supabase Credentials Update Wizard"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}Warning: .env.local not found. Creating new file...${NC}"
    touch .env.local
fi

echo "Please enter your Supabase credentials:"
echo ""

# Get Supabase URL
echo -n "Supabase Project URL (e.g., https://xxxxx.supabase.co): "
read SUPABASE_URL

# Get Supabase Anon Key
echo -n "Supabase Anon/Public Key: "
read SUPABASE_ANON_KEY

# Extract project ID from URL
if [[ $SUPABASE_URL =~ https://([^.]+)\.supabase\.co ]]; then
    SUPABASE_PROJECT_ID="${BASH_REMATCH[1]}"
else
    echo -e "${YELLOW}Could not extract project ID from URL. Please enter manually:${NC}"
    echo -n "Supabase Project ID: "
    read SUPABASE_PROJECT_ID
fi

echo ""
echo "================================================"
echo "  Updating .env.local file..."
echo "================================================"

# Backup existing .env.local
if [ -f .env.local ]; then
    cp .env.local .env.local.backup
    echo -e "${GREEN}✓ Backed up existing .env.local to .env.local.backup${NC}"
fi

# Update or add Supabase credentials
if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
    # Update existing
    sed -i "s|NEXT_PUBLIC_SUPABASE_URL=.*|NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL|" .env.local
    sed -i "s|NEXT_PUBLIC_SUPABASE_ANON_KEY=.*|NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY|" .env.local
    sed -i "s|SUPABASE_PROJECT_ID=.*|SUPABASE_PROJECT_ID=$SUPABASE_PROJECT_ID|" .env.local
    echo -e "${GREEN}✓ Updated Supabase credentials${NC}"
else
    # Add new
    echo "" >> .env.local
    echo "# Supabase Configuration" >> .env.local
    echo "NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL" >> .env.local
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY" >> .env.local
    echo "SUPABASE_PROJECT_ID=$SUPABASE_PROJECT_ID" >> .env.local
    echo -e "${GREEN}✓ Added Supabase credentials${NC}"
fi

echo ""
echo "================================================"
echo "  Testing Connection..."
echo "================================================"

# Test connection using curl if available
if command -v curl &> /dev/null; then
    echo "Testing Supabase connection..."
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
        -H "apikey: $SUPABASE_ANON_KEY" \
        -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
        "$SUPABASE_URL/rest/v1/")
    
    if [ "$RESPONSE" = "200" ] || [ "$RESPONSE" = "401" ]; then
        echo -e "${GREEN}✓ Connection successful!${NC}"
    else
        echo -e "${RED}✗ Connection failed (HTTP $RESPONSE)${NC}"
        echo -e "${YELLOW}  Please verify your credentials in Supabase dashboard${NC}"
    fi
else
    echo -e "${YELLOW}curl not found. Skipping connection test.${NC}"
fi

echo ""
echo "================================================"
echo "  Next Steps"
echo "================================================"
echo ""
echo "1. Run database migration in Supabase SQL Editor:"
echo "   - Copy contents of: supabase/migrations/001_initial_schema.sql"
echo "   - Paste in SQL Editor and run"
echo ""
echo "2. Restart your development server:"
echo "   $ pnpm run dev"
echo ""
echo "3. Test the connection:"
echo "   - Visit: http://localhost:3000/supabase-test"
echo ""
echo -e "${GREEN}Setup complete! 🎉${NC}"
echo ""

