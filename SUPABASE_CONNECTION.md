# 🗄️ Supabase Connection Guide

Your Supabase connection is configured! Follow these steps to complete the setup.

## ✅ What's Already Done

- ✓ Supabase credentials configured in `.env.local`
- ✓ Connection test page created
- ✓ Helper scripts ready

## 🚀 Quick Setup (2 Minutes)

### Step 1: Run the Database Migration

**Option A: Using Supabase Dashboard (Recommended)**

1. Open your Supabase project:
   ```
   https://supabase.com/dashboard/project/gfflwmddooynaexotjtn
   ```

2. Navigate to **SQL Editor** (left sidebar)

3. Click **"New Query"**

4. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`

5. Paste into the editor and click **"Run"**

6. Verify success - you should see:
   - ✓ Tables created (products, orders)
   - ✓ Sample products inserted (~160+ items)
   - ✓ RLS policies enabled

**Option B: Using Helper Script**

```bash
./setup-supabase-db.sh
```

This will guide you through the process step-by-step.

### Step 2: Test Your Connection

1. Make sure your dev server is running:
   ```bash
   pnpm run dev
   ```

2. Visit the test page:
   ```
   http://localhost:3000/supabase-test
   ```

3. You should see:
   - ✅ Successfully Connected to Supabase!
   - ✅ Found 160+ active products
   - ✅ Sample products displayed in a table

## 📋 Your Supabase Configuration

```env
NEXT_PUBLIC_SUPABASE_URL=https://gfflwmddooynaexotjtn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc... (configured in .env.local)
SUPABASE_PROJECT_ID=gfflwmddooynaexotjtn
```

## 🛠️ Useful Scripts

| Script | Description |
|--------|-------------|
| `./update-supabase-credentials.sh` | Update Supabase credentials interactively |
| `./setup-supabase-db.sh` | Guide for running database migrations |

## 🧪 Test Pages

- **Supabase Test**: `/supabase-test` - Test database connection
- **Firebase Test**: `/firebase-test` - Test Firebase connection
- **Home Page**: `/` - View products from Supabase
- **Admin Panel**: `/admin` - Manage products and orders

## 📊 What's in the Database

The migration creates and populates:

### Products Table (~160 items)
- Arduino boards (Uno, Nano, Mega, ESP32)
- Sensors (DHT11, HC-SR04, PIR, etc.)
- Displays (LCD 16x2, 20x4)
- Motors & drivers
- Communication modules
- Power supplies
- Components

### Orders Table
- Customer order tracking
- Order status management
- JSON-based order items

## 🔒 Security Features

- ✅ Row Level Security (RLS) enabled
- ✅ Public read access to active products only
- ✅ Secure admin operations via service role
- ✅ Firebase Authentication for admin panel

## 🐛 Troubleshooting

### Error: "Could not find the table 'public.products'"
**Solution**: Run the database migration (Step 1 above)

### Error: "Invalid API key"
**Solution**: Check your credentials in Supabase dashboard → Settings → API

### No products showing on homepage
**Solution**: 
1. Verify migration ran successfully
2. Check `is_active = true` in Table Editor
3. Refresh browser cache

### Connection timeout
**Solution**:
1. Check if Supabase project is paused (free tier auto-pauses after inactivity)
2. Visit Supabase dashboard to wake it up
3. Retry connection

## 📚 Next Steps

1. ✅ **Complete database migration** (if not done)
2. ✅ **Test connection** at `/supabase-test`
3. 🔧 **Set up Firebase Authentication** (already configured)
4. 👤 **Create admin user** in Firebase
5. 📦 **Test admin panel** at `/admin`
6. 🚀 **Deploy to production** (Vercel recommended)

## 🆘 Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [Project README](./README.md)

---

**Status**: 🟢 Ready to connect! Just run the migration and test.

