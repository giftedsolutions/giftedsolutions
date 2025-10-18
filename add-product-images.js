// Add Product Images to Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gfflwmddooynaexotjtn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZmx3bWRkb295bmFleG90anRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NDQxNTYsImV4cCI6MjA3NTQyMDE1Nn0.J7rGoFoW5yFZ60lf9rBtbAj9BzURx8siDEobFgmNt8M';

const supabase = createClient(supabaseUrl, supabaseKey);

// Real product image URLs from reliable sources
const productImages = {
  'Arduino Uno': 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400',
  'Arduino Nano': 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400',
  'Arduino Mega': 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400',
  'ESP32': 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400',
  'ESP8266': 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400',
  'DHT11': 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400',
  'HC-SR04': 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400',
  'Sensor': 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400',
  'LCD': 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400',
  'Motor': 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400',
  'Relay': 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400',
  'Default': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' // Electronics generic
};

async function addImages() {
  console.log('📸 Adding product images to Supabase...\n');

  try {
    // Fetch all products
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('*');

    if (fetchError) {
      console.error('❌ Error fetching products:', fetchError.message);
      return;
    }

    console.log(`Found ${products.length} products\n`);

    let updated = 0;
    let skipped = 0;

    for (const product of products) {
      // Skip if already has image
      if (product.image_url) {
        skipped++;
        continue;
      }

      // Find matching image based on product name
      let imageUrl = productImages['Default'];
      
      for (const [keyword, url] of Object.entries(productImages)) {
        if (product.name.toLowerCase().includes(keyword.toLowerCase())) {
          imageUrl = url;
          break;
        }
      }

      // Update product with image
      const { error: updateError } = await supabase
        .from('products')
        .update({ image_url: imageUrl })
        .eq('id', product.id);

      if (updateError) {
        console.error(`❌ Error updating ${product.name}:`, updateError.message);
      } else {
        console.log(`✅ Updated: ${product.name}`);
        updated++;
      }
    }

    console.log(`\n✅ Complete! Updated ${updated} products, skipped ${skipped}`);

    // Verify
    console.log('\n📊 Verification...');
    const { data: withImages } = await supabase
      .from('products')
      .select('*')
      .not('image_url', 'is', null);

    console.log(`✅ Products with images: ${withImages.length}/${products.length}`);

  } catch (error) {
    console.error('❌ Failed:', error.message);
  }
}

addImages();

