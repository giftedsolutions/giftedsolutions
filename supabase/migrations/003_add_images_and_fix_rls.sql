-- Enable RLS policies for public access
-- This allows the anon key to read and write data

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public read access" ON products;
DROP POLICY IF EXISTS "Public insert access" ON products;
DROP POLICY IF EXISTS "Public update access" ON products;
DROP POLICY IF EXISTS "Public delete access" ON products;

DROP POLICY IF EXISTS "Public read access" ON orders;
DROP POLICY IF EXISTS "Public insert access" ON orders;
DROP POLICY IF EXISTS "Public update access" ON orders;

-- Create new policies for products (allow all operations for now)
CREATE POLICY "Public read access" ON products
  FOR SELECT USING (true);

CREATE POLICY "Public insert access" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public update access" ON products
  FOR UPDATE USING (true);

CREATE POLICY "Public delete access" ON products
  FOR DELETE USING (true);

-- Create policies for orders
CREATE POLICY "Public read access" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Public insert access" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public update access" ON orders
  FOR UPDATE USING (true);

-- Add real product images
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400' WHERE name LIKE '%Arduino Uno%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400' WHERE name LIKE '%Arduino Nano%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400' WHERE name LIKE '%Arduino Mega%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400' WHERE name LIKE '%ESP32%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400' WHERE name LIKE '%ESP8266%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400' WHERE name LIKE '%DHT11%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400' WHERE name LIKE '%Sensor%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400' WHERE name LIKE '%LCD%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400' WHERE name LIKE '%Motor%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400' WHERE name LIKE '%Relay%';

-- Set default image for products without images
UPDATE products 
SET image_url = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' 
WHERE image_url IS NULL;

