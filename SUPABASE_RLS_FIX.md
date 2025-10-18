# 🔧 Fix Supabase RLS & Add Product Images

## ⚠️ Current Issue
- Products don't have images
- RLS (Row Level Security) policies prevent updates via anon key

## ✅ Solution

Run this SQL script in Supabase SQL Editor:

### **Step 1: Go to Supabase SQL Editor**
https://supabase.com/dashboard/project/gfflwmddooynaexotjtn/sql/new

### **Step 2: Copy and Run This SQL:**

```sql
-- Enable RLS policies for public access
DROP POLICY IF EXISTS "Public read access" ON products;
DROP POLICY IF EXISTS "Public insert access" ON products;
DROP POLICY IF EXISTS "Public update access" ON products;
DROP POLICY IF EXISTS "Public delete access" ON products;
DROP POLICY IF EXISTS "Public read access" ON orders;
DROP POLICY IF EXISTS "Public insert access" ON orders;
DROP POLICY IF EXISTS "Public update access" ON orders;

-- Create new policies for products
CREATE POLICY "Public read access" ON products FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON products FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON products FOR DELETE USING (true);

-- Create policies for orders
CREATE POLICY "Public read access" ON orders FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON orders FOR UPDATE USING (true);

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
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' WHERE image_url IS NULL;
```

### **Step 3: Click "Run" button**

###  Step 4: Verify**

Run this query to check:
```sql
SELECT name, image_url FROM products LIMIT 10;
```

You should see image URLs for all products!

## 📋 After Running SQL:

1. ✅ RLS policies will allow public access
2. ✅ All products will have images
3. ✅ Frontend will display real images
4. ✅ Admin can update products

## 🔐 Security Note:

These policies allow public access for a demo/shop. For production, you should:
- Restrict INSERT/UPDATE/DELETE to authenticated admins only
- Keep SELECT public for product browsing

---

**Direct Link to SQL Editor:**
https://supabase.com/dashboard/project/gfflwmddooynaexotjtn/sql/new

