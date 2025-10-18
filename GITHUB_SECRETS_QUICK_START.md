# 🚀 GitHub Secrets Management - Quick Reference

## Your Vercel Project IDs

```
Project ID: prj_R2jdmsb4XGrlCvRwDaG0LZcs3eMd
Org ID: team_vw8jnMBNnHbqQFfefRoSzpLn
```

## Setup Steps

### 1️⃣ Get Vercel Token

1. Visit: https://vercel.com/account/tokens
2. Click **"Create Token"**
3. Name: `GitHub Actions`
4. Copy the token (save it somewhere safe!)

### 2️⃣ Add Secrets to GitHub

Go to your GitHub repository:
```
Settings → Secrets and variables → Actions → New repository secret
```

Add these **15 secrets** (copy exact names):

#### Vercel Secrets (3)
```
VERCEL_TOKEN = ZJWVknPTi4kr7d65HOW2QQmi
VERCEL_ORG_ID = team_vw8jnMBNnHbqQFfefRoSzpLn
VERCEL_PROJECT_ID = prj_R2jdmsb4XGrlCvRwDaG0LZcs3eMd
```

#### Firebase Secrets (7)
```
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyBh04GVONeNfgvK5uR_8U9wDJ5oy2QqhiQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = giftedsolutions-53124.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = giftedsolutions-53124
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = giftedsolutions-53124.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 708765156733
NEXT_PUBLIC_FIREBASE_APP_ID = 1:708765156733:web:3a830c02e784575c6a7814
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = G-FNVVZLRNRD
```

#### Supabase Secrets (2)
```
NEXT_PUBLIC_SUPABASE_URL = https://gfflwmddooynaexotjtn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZmx3bWRkb295bmFleG90anRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NDQxNTYsImV4cCI6MjA3NTQyMDE1Nn0.J7rGoFoW5yFZ60lf9rBtbAj9BzURx8siDEobFgmNt8M
```

#### Business Secrets (3)
```
NEXT_PUBLIC_ADMIN_EMAIL = admin@giftedsolutions.com
NEXT_PUBLIC_WHATSAPP_NUMBER = 260779421717
NEXT_PUBLIC_BUSINESS_NAME = Gifted Solutions
NEXT_PUBLIC_BUSINESS_LOCATION = Lusaka, Chalala near Information and Communications University
```

### 3️⃣ Push to GitHub

```bash
# Initialize repository (if not done)
cd /home/bupe/giftedsolutions
git init
git add .
git commit -m "Initial commit with GitHub Actions deployment"

# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/giftedsolutions.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🎉 What Happens Next?

- ✅ GitHub Actions automatically builds your project
- ✅ Environment variables are securely injected during build
- ✅ Project is deployed to Vercel
- ✅ Future commits to `main` branch auto-deploy
- ✅ Pull requests get preview deployments

## 📁 Files Created

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `GITHUB_SECRETS_SETUP.md` - Detailed setup guide
- `setup-github-secrets.sh` - Helper script
- `.vercel/project.json` - Vercel project config (gitignored)

## 🔒 Security

- All secrets are encrypted in GitHub
- Secrets are never exposed in logs
- Only authorized users can view/edit secrets
- `.env.local` is gitignored to prevent leaks

## 🐛 Troubleshooting

### "Missing environment variable" error
✅ **Solution**: Double-check all 15 secrets are added to GitHub with exact names

### Build fails in GitHub Actions
✅ **Solution**: Check the Actions tab for detailed error logs

### Vercel token invalid
✅ **Solution**: Generate a new token and update `VERCEL_TOKEN` secret

## 📚 Additional Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [GitHub Actions Docs](https://docs.github.com/actions)
- [Next.js Environment Variables](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)

---

**Ready to deploy?** Just push to GitHub and watch the magic happen! 🚀

