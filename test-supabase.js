// Test Supabase Connection and Data
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gfflwmddooynaexotjtn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZmx3bWRkb295bmFleG90anRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NDQxNTYsImV4cCI6MjA3NTQyMDE1Nn0.J7rGoFoW5yFZ60lf9rBtbAj9BzURx8siDEobFgmNt8M';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔍 Testing Supabase Connection...\n');

  try {
    // Test 1: Fetch products
    console.log('1️⃣ Fetching products...');
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(5);

    if (productsError) {
      console.error('❌ Products Error:', productsError.message);
    } else {
      console.log(`✅ Found ${products.length} products`);
      if (products.length > 0) {
        console.log('   Sample product:', products[0].name);
        console.log('   Has image_url:', products[0].image_url ? 'YES ✅' : 'NO ❌');
      }
    }

    // Test 2: Fetch categories
    console.log('\n2️⃣ Fetching categories...');
    const { data: categories, error: categoriesError } = await supabase
      .from('products')
      .select('category')
      .limit(100);

    if (categoriesError) {
      console.error('❌ Categories Error:', categoriesError.message);
    } else {
      const uniqueCategories = [...new Set(categories.map(c => c.category))];
      console.log(`✅ Found ${uniqueCategories.length} unique categories`);
      console.log('   Categories:', uniqueCategories.slice(0, 3).join(', '), '...');
    }

    // Test 3: Check orders table
    console.log('\n3️⃣ Checking orders table...');
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .limit(1);

    if (ordersError) {
      console.error('❌ Orders Error:', ordersError.message);
    } else {
      console.log(`✅ Orders table accessible (${orders.length} orders)`);
    }

    // Test 4: Check product with image
    console.log('\n4️⃣ Checking products with images...');
    const { data: productsWithImages, error: imagesError } = await supabase
      .from('products')
      .select('*')
      .not('image_url', 'is', null);

    if (imagesError) {
      console.error('❌ Images Error:', imagesError.message);
    } else {
      console.log(`✅ Products with images: ${productsWithImages.length}`);
      if (productsWithImages.length > 0) {
        console.log('   Sample image URL:', productsWithImages[0].image_url);
      } else {
        console.log('   ⚠️ No products have images yet!');
      }
    }

    console.log('\n✅ Supabase connection test complete!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testConnection();

