# Quick Start Guide

Get Gifted Solutions running locally in 5 minutes!

## Prerequisites

- Node.js 22+
- pnpm 10.13.1+
- Supabase account (free)

## Steps

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Supabase

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to SQL Editor
4. Run migration from `supabase/migrations/001_initial_schema.sql`

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials (find in Supabase Dashboard > Settings > API):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Development Server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

```bash
# Install Vercel CLI
pnpm install -g vercel

# Deploy
vercel
```

## Next Steps

- 📖 Read [README.md](./README.md) for full documentation
- 🗄️ See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed Supabase setup
- 🚀 See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment guide

## Troubleshooting

**Products not loading?**
- Check Supabase URL and key in `.env.local`
- Verify migration ran successfully
- Check browser console for errors

**Build errors?**
```bash
rm -rf .next node_modules
pnpm install
pnpm run build
```

## Need Help?

WhatsApp: +260 779 421717

