# Deployment Guide

## ✅ Prerequisites Complete
- ✓ Firebase configured
- ✓ Supabase connected (70 products loaded)
- ✓ Environment variables set

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Easiest) ⭐

1. **Push to GitHub (if not already done)**
   ```bash
   git add .
   git commit -m "Initial commit - Gifted Solutions e-commerce"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/giftedsolutions.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to: https://vercel.com/new
   - Import your GitHub repository
   - Add environment variables (copy from `.env.local`)
   - Click "Deploy"

### Option 2: Deploy via CLI

```bash
# Login to Vercel (will open browser)
pnpm dlx vercel login

# Deploy
pnpm dlx vercel

# For production deployment
pnpm dlx vercel --prod
```

### Option 3: One-Click Vercel Button

Add this to your README.md:
```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)
```

## 📋 Environment Variables to Set in Vercel

Copy these from your `.env.local`:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

# Admin
NEXT_PUBLIC_ADMIN_EMAIL

# Business
NEXT_PUBLIC_WHATSAPP_NUMBER
NEXT_PUBLIC_BUSINESS_NAME
NEXT_PUBLIC_BUSINESS_LOCATION

# Supabase
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_PROJECT_ID
```

## 🔐 Security Checklist

- ✅ `.env.local` is in `.gitignore`
- ✅ Firebase RLS policies enabled
- ✅ Supabase RLS policies enabled
- ⚠️ Set environment variables in Vercel Dashboard
- ⚠️ Never commit API keys to Git

## 📱 After Deployment

1. **Test your deployed site**
   - Visit your Vercel URL
   - Check products load correctly
   - Test Firebase authentication
   - Verify admin panel access

2. **Add Custom Domain (Optional)**
   - Go to Vercel Dashboard → Domains
   - Add your custom domain
   - Update DNS records

3. **Enable Analytics**
   - Firebase Analytics is already enabled
   - Vercel Analytics: Dashboard → Analytics → Enable

## 🐛 Troubleshooting

### Build Fails
- Check environment variables are set
- Review build logs in Vercel Dashboard
- Ensure TypeScript errors are fixed

### Products Not Loading
- Verify Supabase URL in environment variables
- Check Supabase RLS policies
- Test API endpoint: `/api/products`

### Admin Panel Not Working
- Enable Firebase Authentication Email/Password
- Create admin user in Firebase
- Set `NEXT_PUBLIC_ADMIN_EMAIL` correctly

## 🎉 You're Ready!

Your app is production-ready with:
- ✅ 70 products in database
- ✅ Firebase authentication
- ✅ Supabase backend
- ✅ Admin panel
- ✅ Responsive design
- ✅ SEO optimized

**Ready to deploy? Run:**
```bash
pnpm dlx vercel
```
