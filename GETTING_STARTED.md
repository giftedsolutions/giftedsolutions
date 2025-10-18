# 🎯 Getting Started - Gifted Solutions

Welcome! This guide will get you from zero to deployed in under 30 minutes.

## 🚦 Prerequisites Checklist

- [ ] Node.js 22+ installed ([download](https://nodejs.org/))
- [ ] Git installed
- [ ] Text editor (VS Code recommended)
- [ ] Supabase account (free - [sign up](https://supabase.com))
- [ ] Vercel account (free - [sign up](https://vercel.com))

## ⚡ Quick Start (5 minutes)

### 1. Install Dependencies

```bash
# Using our setup script
chmod +x setup.sh
./setup.sh

# Or manually
pnpm install
```

### 2. Set Up Supabase

**Create Project:**
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Name it `gifted-solutions`
4. Save your database password

**Run Migration:**
1. Go to SQL Editor in Supabase dashboard
2. Copy contents from `supabase/migrations/001_initial_schema.sql`
3. Paste and click "Run"

**Get Credentials:**
1. Settings > API
2. Copy Project URL and anon/public key

### 3. Configure Environment

```bash
# Create .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Development Server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 🚀 Deploy to Production (5 minutes)

### Option 1: Vercel Dashboard (Easiest)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repo
5. Add environment variables
6. Click "Deploy"

### Option 2: Vercel CLI (Fastest)

```bash
# Install CLI
pnpm install -g vercel

# Deploy
vercel --prod
```

## 📚 What's Next?

### Customize Your Store

1. **Update Business Info** - Edit `.env.local`:
   ```env
   NEXT_PUBLIC_WHATSAPP_NUMBER=your-number
   NEXT_PUBLIC_BUSINESS_NAME=Your Name
   NEXT_PUBLIC_BUSINESS_LOCATION=Your Location
   ```

2. **Add Product Images** - Upload to Supabase Storage:
   ```sql
   UPDATE products 
   SET image_url = 'https://...'
   WHERE id = '...';
   ```

3. **Customize Colors** - Edit `tailwind.config.ts`:
   ```typescript
   colors: {
     primary: '#your-color',
     accent: '#your-accent',
   }
   ```

### Learn the Codebase

- 📖 **README.md** - Full documentation
- 🏗️ **PROJECT_STRUCTURE.md** - Architecture overview
- 🗄️ **SUPABASE_SETUP.md** - Database details
- 🚀 **DEPLOYMENT.md** - Advanced deployment

## 🆘 Troubleshooting

### Products Not Loading?

```bash
# Check environment variables
cat .env.local

# Verify Supabase connection
# Go to: Settings > API in Supabase dashboard
```

### Build Errors?

```bash
# Clear cache and rebuild
rm -rf .next node_modules
pnpm install
pnpm run build
```

### TypeScript Errors?

```bash
# Run type check
pnpm run typecheck

# Fix formatting
pnpm run format
```

## 💡 Pro Tips

1. **Use the setup script**: `./setup.sh` automates checks
2. **Test locally first**: Always `pnpm run build` before deploying
3. **Monitor logs**: Check Vercel dashboard for runtime errors
4. **Use preview deployments**: Test changes on preview URLs
5. **Enable analytics**: Add Vercel Analytics for insights

## 📞 Get Help

- 💬 **Issues**: Open a GitHub issue
- 📧 **Email**: support@giftedsolutions.com
- 📱 **WhatsApp**: +260 779 421717

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## ✅ Success Checklist

After setup, verify:

- [ ] Products display on homepage
- [ ] Search works
- [ ] Category filter works
- [ ] Can add items to cart
- [ ] Cart persists on refresh
- [ ] WhatsApp checkout opens
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Fast page loads

## 🎉 You're Ready!

Your store is now live and ready to accept orders. 

**Next Steps:**
1. Share your store URL
2. Test checkout flow
3. Monitor orders in Supabase
4. Customize to your brand
5. Add more features

Happy selling! 🛒✨

---

Made with ❤️ by Gifted Solutions

