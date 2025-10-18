#!/bin/bash
# Fix all unescaped quotes
sed -i 's/"New Query"/"New Query"/g' src/app/supabase-test/page.tsx
sed -i 's/"Run"/"Run"/g' src/app/supabase-test/page.tsx
sed -i 's/"Project URL"/"Project URL"/g' src/app/supabase-test/page.tsx
sed -i 's/"anon public"/"anon public"/g' src/app/supabase-test/page.tsx
