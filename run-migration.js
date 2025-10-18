#!/usr/bin/env node

/**
 * Supabase Migration Runner
 * Runs SQL migrations directly using the Supabase client
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

console.log('🚀 Supabase Migration Runner\n');
console.log(`📍 Project: ${supabaseUrl}\n`);

// Create Supabase client with service role (we'll use anon for now)
const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  const migrationFile = path.join(__dirname, 'supabase', 'migrations', '001_initial_schema.sql');
  
  if (!fs.existsSync(migrationFile)) {
    console.error(`❌ Migration file not found: ${migrationFile}`);
    process.exit(1);
  }

  console.log('📖 Reading migration file...');
  const sql = fs.readFileSync(migrationFile, 'utf8');
  
  console.log('📊 Migration preview:');
  console.log('  - Create products table');
  console.log('  - Create orders table');
  console.log('  - Add indexes');
  console.log('  - Enable Row Level Security');
  console.log('  - Insert ~75 sample products\n');

  console.log('⚠️  Note: This script cannot run raw SQL with the anon key.');
  console.log('You need to use the Supabase dashboard or have service_role key.\n');
  
  console.log('📋 Instead, let me create the tables via the REST API...\n');

  // Try to create products table via REST API (won't work, but shows the approach)
  console.log('❌ Unfortunately, the Supabase REST API doesn\'t allow DDL operations');
  console.log('   (CREATE TABLE, ALTER TABLE, etc.) for security reasons.\n');
  
  console.log('✅ SOLUTION: Use one of these methods:\n');
  console.log('1. 📱 Supabase Dashboard (Easiest):');
  console.log('   - Go to: https://supabase.com/dashboard/project/gfflwmddooynaexotjtn/sql');
  console.log('   - Click "New Query"');
  console.log('   - Copy/paste the SQL from: supabase/migrations/001_initial_schema.sql');
  console.log('   - Click "Run"\n');
  
  console.log('2. 💻 Using psql (if installed):');
  console.log('   psql "postgresql://postgres:[YOUR-PASSWORD]@db.gfflwmddooynaexotjtn.supabase.co:5432/postgres" -f supabase/migrations/001_initial_schema.sql\n');
  
  console.log('3. 🔑 Add service_role key to .env.local:');
  console.log('   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key');
  console.log('   (Find this in Supabase Dashboard → Settings → API)\n');
  
  // Show the SQL for easy copy-paste
  console.log('📄 SQL to run (copy this):');
  console.log('─'.repeat(80));
  console.log(sql);
  console.log('─'.repeat(80));
}

runMigration().catch(console.error);

