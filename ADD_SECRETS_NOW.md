# 🚀 Add GitHub Secrets - Step by Step

Your code is now on GitHub! Now add secrets to enable automatic deployment.

## Step 1: Go to GitHub Secrets Page

**Direct Link:** https://github.com/giftedsolutions/giftedsolutions/settings/secrets/actions/new

Or navigate:
1. Go to: https://github.com/giftedsolutions/giftedsolutions
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

## Step 2: Add These 15 Secrets (One at a Time)

Copy the **Name** and **Value** exactly as shown:

### Secret 1: VERCEL_TOKEN
**Value:** `ZJWVknPTi4kr7d65HOW2QQmi`

### Secret 2: VERCEL_ORG_ID
**Value:** `team_vw8jnMBNnHbqQFfefRoSzpLn`

### Secret 3: VERCEL_PROJECT_ID
**Value:** `prj_R2jdmsb4XGrlCvRwDaG0LZcs3eMd`

### Secret 4: NEXT_PUBLIC_FIREBASE_API_KEY
**Value:** `AIzaSyBh04GVONeNfgvK5uR_8U9wDJ5oy2QqhiQ`

### Secret 5: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
**Value:** `giftedsolutions-53124.firebaseapp.com`

### Secret 6: NEXT_PUBLIC_FIREBASE_PROJECT_ID
**Value:** `giftedsolutions-53124`

### Secret 7: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
**Value:** `giftedsolutions-53124.firebasestorage.app`

### Secret 8: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
**Value:** `708765156733`

### Secret 9: NEXT_PUBLIC_FIREBASE_APP_ID
**Value:** `1:708765156733:web:3a830c02e784575c6a7814`

### Secret 10: NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
**Value:** `G-FNVVZLRNRD`

### Secret 11: NEXT_PUBLIC_SUPABASE_URL
**Value:** `https://gfflwmddooynaexotjtn.supabase.co`

### Secret 12: NEXT_PUBLIC_SUPABASE_ANON_KEY
**Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZmx3bWRkb295bmFleG90anRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NDQxNTYsImV4cCI6MjA3NTQyMDE1Nn0.J7rGoFoW5yFZ60lf9rBtbAj9BzURx8siDEobFgmNt8M`

### Secret 13: NEXT_PUBLIC_ADMIN_EMAIL
**Value:** `admin@giftedsolutions.com`

### Secret 14: NEXT_PUBLIC_WHATSAPP_NUMBER
**Value:** `260779421717`

### Secret 15: NEXT_PUBLIC_BUSINESS_NAME
**Value:** `Gifted Solutions`

### Secret 16: NEXT_PUBLIC_BUSINESS_LOCATION
**Value:** `Lusaka, Chalala near Information and Communications University`

## Step 3: Trigger Deployment

After adding all secrets:

```bash
cd /home/bupe/giftedsolutions
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

Or just make any small change and push.

## Step 4: Watch Deployment

1. Go to: https://github.com/giftedsolutions/giftedsolutions/actions
2. You'll see your workflow running
3. Once complete (green checkmark), your site is deployed!

## ✅ Result

After GitHub Actions completes:
- ✅ All environment variables will be set
- ✅ No more Firebase/image errors
- ✅ Site fully functional on Vercel

---

**Quick Reference:** All secrets are also in `github-secrets.sh` - run `./github-secrets.sh` to see them.

