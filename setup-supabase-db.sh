#!/bin/bash

# Supabase Migration Helper Script
# This script helps you set up the database schema

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "================================================"
echo "  Supabase Database Migration Helper"
echo "================================================"
echo ""

# Check if migration file exists
MIGRATION_FILE="supabase/migrations/001_initial_schema.sql"

if [ ! -f "$MIGRATION_FILE" ]; then
    echo -e "${RED}✗ Migration file not found: $MIGRATION_FILE${NC}"
    exit 1
fi

echo -e "${BLUE}This script will help you set up your Supabase database.${NC}"
echo ""
echo "You have two options:"
echo ""
echo "1. Manual Setup (Recommended)"
echo "   - Copy the SQL migration and run it in Supabase dashboard"
echo ""
echo "2. View SQL Content"
echo "   - Display the SQL to review before running"
echo ""
echo -n "Choose an option (1 or 2): "
read OPTION

case $OPTION in
    1)
        echo ""
        echo "================================================"
        echo "  Manual Setup Instructions"
        echo "================================================"
        echo ""
        echo "Follow these steps:"
        echo ""
        echo -e "${GREEN}1.${NC} Open your Supabase dashboard:"
        echo "   https://supabase.com/dashboard/project/gfflwmddooynaexotjtn"
        echo ""
        echo -e "${GREEN}2.${NC} Navigate to: SQL Editor (in left sidebar)"
        echo ""
        echo -e "${GREEN}3.${NC} Click 'New Query'"
        echo ""
        echo -e "${GREEN}4.${NC} Copy the migration file:"
        echo "   File: $MIGRATION_FILE"
        echo ""
        echo -e "${GREEN}5.${NC} Paste into SQL Editor and click 'Run'"
        echo ""
        echo -e "${GREEN}6.${NC} Verify tables were created:"
        echo "   - Go to 'Table Editor'"
        echo "   - You should see 'products' and 'orders' tables"
        echo "   - Products table should have sample data"
        echo ""
        
        # Offer to copy file to clipboard if xclip is available
        if command -v xclip &> /dev/null; then
            echo -n "Copy migration SQL to clipboard now? (y/n): "
            read COPY_CHOICE
            if [ "$COPY_CHOICE" = "y" ]; then
                cat "$MIGRATION_FILE" | xclip -selection clipboard
                echo -e "${GREEN}✓ SQL copied to clipboard! Ready to paste in Supabase.${NC}"
            fi
        else
            echo -e "${YELLOW}Tip: Install 'xclip' to copy SQL to clipboard automatically${NC}"
        fi
        
        echo ""
        echo "After running the migration, test your connection at:"
        echo -e "${BLUE}http://localhost:3000/supabase-test${NC}"
        ;;
        
    2)
        echo ""
        echo "================================================"
        echo "  SQL Migration Content"
        echo "================================================"
        echo ""
        cat "$MIGRATION_FILE"
        echo ""
        echo "================================================"
        echo ""
        echo "To apply this migration:"
        echo "1. Copy the SQL above"
        echo "2. Open Supabase dashboard → SQL Editor"
        echo "3. Paste and run"
        ;;
        
    *)
        echo -e "${RED}Invalid option${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Done! 🚀${NC}"

