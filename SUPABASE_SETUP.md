# Supabase Setup Guide

This guide will help you set up Supabase for the Gifted Solutions e-commerce platform.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))

## Steps

### 1. Create a New Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"New Project"**
3. Fill in the details:
   - **Name**: `gifted-solutions`
   - **Database Password**: Generate a strong password (save it securely)
   - **Region**: Choose closest to your users (e.g., `eu-west-1` for Europe)
   - **Pricing Plan**: Select **Free** tier

### 2. Run the Migration

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **"New Query"**
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste into the SQL Editor
5. Click **"Run"**
6. Verify tables were created:
   - `products` table with sample data
   - `orders` table
   - Indexes and RLS policies

### 3. Get Your Credentials

1. Go to **Settings** > **API**
2. Copy the following:
   - **Project URL**: e.g., `https://abcdefgh.supabase.co`
   - **Anon/Public Key**: The long string under "Project API keys"

### 4. Configure Environment Variables

Update your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Verify Connection

1. Start your development server: `pnpm run dev`
2. Open [http://localhost:3000](http://localhost:3000)
3. You should see products loaded from Supabase

## Row Level Security (RLS)

The migration automatically sets up RLS policies:

- **Products**: Public read access (only active products)
- **Orders**: Public insert, admin-only read

### Testing RLS

Run these queries in SQL Editor to test:

```sql
-- Should return all active products
SELECT * FROM products WHERE is_active = true;

-- Should return count
SELECT COUNT(*) FROM products;
```

## Optional: Add Product Images

You can store product images in Supabase Storage:

1. Go to **Storage** in Supabase dashboard
2. Create a bucket named `product-images`
3. Set it to **public**
4. Upload images
5. Update product records with image URLs:

```sql
UPDATE products 
SET image_url = 'https://your-project.supabase.co/storage/v1/object/public/product-images/arduino-uno.jpg'
WHERE name = 'Arduino Uno + USB Cable';
```

## Monitoring

- **Table Editor**: View and edit data
- **Database**: Monitor queries and performance
- **Logs**: Check API request logs

## Free Tier Limits

- **Database**: 500 MB
- **Storage**: 1 GB
- **Bandwidth**: 2 GB
- **API Requests**: Unlimited

Perfect for a small to medium e-commerce store!

## Troubleshooting

### Connection Errors

1. Verify URL and keys are correct
2. Check project is not paused (Supabase pauses inactive projects)
3. Ensure RLS policies are active

### No Products Showing

1. Check data was inserted: `SELECT COUNT(*) FROM products;`
2. Verify `is_active = true`
3. Check browser console for errors

### Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)

