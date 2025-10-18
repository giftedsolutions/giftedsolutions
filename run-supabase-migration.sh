#!/bin/bash

# Simple SQL runner using psql
# This will run the migration using PostgreSQL connection

set -e

echo "🗄️ Supabase Migration Runner"
echo ""
echo "To run the migration, you have 3 options:"
echo ""
echo "1️⃣  Use Supabase Dashboard (EASIEST - 30 seconds):"
echo "   → https://supabase.com/dashboard/project/gfflwmddooynaexotjtn/sql"
echo "   → Click 'New Query', paste the SQL from supabase/migrations/001_initial_schema.sql"
echo "   → Click 'Run'"
echo ""
echo "2️⃣  Use psql command (if you have your database password):"
echo "   psql \"postgresql://postgres:[YOUR-DB-PASSWORD]@db.gfflwmddooynaexotjtn.supabase.co:5432/postgres\" \\"
echo "        -f supabase/migrations/001_initial_schema.sql"
echo ""
echo "3️⃣  Get Supabase Access Token:"
echo "   → Go to: https://supabase.com/dashboard/account/tokens"
echo "   → Generate new token"
echo "   → Run: ./bin/supabase login --token YOUR_TOKEN"
echo "   → Then: ./bin/supabase db push --project-ref gfflwmddooynaexotjtn"
echo ""
echo "📄 The SQL file to run is: supabase/migrations/001_initial_schema.sql"
echo ""

# Ask user which option they want
echo "Which method would you like to use? (1/2/3)"
read -p "Enter your choice: " choice

case $choice in
  1)
    echo ""
    echo "✅ Great! Opening the SQL file for you to copy..."
    echo ""
    cat supabase/migrations/001_initial_schema.sql
    echo ""
    echo "📋 Copy the SQL above and paste it into:"
    echo "https://supabase.com/dashboard/project/gfflwmddooynaexotjtn/sql"
    ;;
  2)
    echo ""
    read -sp "Enter your Supabase database password: " DB_PASSWORD
    echo ""
    echo "Running migration..."
    psql "postgresql://postgres:${DB_PASSWORD}@db.gfflwmddooynaexotjtn.supabase.co:5432/postgres" \
         -f supabase/migrations/001_initial_schema.sql
    echo "✅ Migration complete!"
    ;;
  3)
    echo ""
    read -p "Enter your Supabase access token: " ACCESS_TOKEN
    echo "Logging in..."
    ./bin/supabase login --token "$ACCESS_TOKEN"
    echo "Pushing database changes..."
    ./bin/supabase db push --project-ref gfflwmddooynaexotjtn
    echo "✅ Migration complete!"
    ;;
  *)
    echo "Invalid choice. Please run the script again."
    exit 1
    ;;
esac

