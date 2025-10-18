# GitHub Secrets Setup Guide

This guide will help you set up GitHub Actions for automated deployment to Vercel with proper secrets management.

## Prerequisites

1. A GitHub repository for your project
2. A Vercel account with your project deployed
3. Access to your GitHub repository settings

## Step 1: Get Vercel Credentials

### Get Vercel Token
1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Give it a name (e.g., "GitHub Actions")
4. Copy the token (you won't see it again!)

### Get Vercel Project and Org IDs
Run these commands in your terminal:

```bash
cd /home/bupe/giftedsolutions
vercel link
```

This will create a `.vercel` directory with `project.json` containing:
- `projectId` - Your Vercel Project ID
- `orgId` - Your Vercel Organization ID

Or you can find them in the Vercel dashboard URL:
- URL format: `https://vercel.com/[ORG_ID]/[PROJECT_NAME]`

## Step 2: Add Secrets to GitHub

1. Go to your GitHub repository
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** for each of the following:

### Vercel Secrets (3 required)
```
VERCEL_TOKEN=ZJWVknPTi4kr7d65HOW2QQmi
VERCEL_ORG_ID=team_vw8jnMBNnHbqQFfefRoSzpLn
VERCEL_PROJECT_ID=prj_R2jdmsb4XGrlCvRwDaG0LZcs3eMd
```

### Firebase Secrets (7 required)
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBh04GVONeNfgvK5uR_8U9wDJ5oy2QqhiQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=giftedsolutions-53124.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=giftedsolutions-53124
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=giftedsolutions-53124.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=708765156733
NEXT_PUBLIC_FIREBASE_APP_ID=1:708765156733:web:3a830c02e784575c6a7814
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-FNVVZLRNRD
```

### Supabase Secrets (2 required)
```
NEXT_PUBLIC_SUPABASE_URL=https://gfflwmddooynaexotjtn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZmx3bWRkb295bmFleG90anRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NDQxNTYsImV4cCI6MjA3NTQyMDE1Nn0.J7rGoFoW5yFZ60lf9rBtbAj9BzURx8siDEobFgmNt8M
```

### Business Secrets (3 required)
```
NEXT_PUBLIC_ADMIN_EMAIL=admin@giftedsolutions.com
NEXT_PUBLIC_WHATSAPP_NUMBER=260779421717
NEXT_PUBLIC_BUSINESS_NAME=Gifted Solutions
NEXT_PUBLIC_BUSINESS_LOCATION=Lusaka, Chalala near Information and Communications University
```

## Step 3: Initialize Git Repository

If you haven't already, initialize your repository:

```bash
cd /home/bupe/giftedsolutions

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit with GitHub Actions deployment"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Verify Deployment

1. Go to your GitHub repository
2. Click on **Actions** tab
3. You should see your workflow running
4. Once complete, your site will be deployed to Vercel!

## How It Works

- Every push to `main` branch triggers automatic deployment
- GitHub Actions securely injects environment variables during build
- Vercel receives the pre-built project and deploys it
- No secrets are exposed in your code or logs

## Troubleshooting

### Workflow fails with "Missing environment variable"
- Double-check that all secrets are added to GitHub
- Verify secret names match exactly (case-sensitive)

### Vercel token invalid
- Generate a new token from https://vercel.com/account/tokens
- Update the `VERCEL_TOKEN` secret in GitHub

### Build succeeds but site shows errors
- Check Vercel deployment logs
- Ensure all environment variables are set in Vercel dashboard as backup

## Security Best Practices

✅ **DO:**
- Use GitHub Secrets for all sensitive data
- Rotate tokens periodically
- Use different tokens for different environments
- Review GitHub Actions logs for any issues

❌ **DON'T:**
- Commit `.env.local` or any files with secrets
- Share your Vercel token publicly
- Use production secrets in development

## Next Steps

1. Set up branch protection rules
2. Add pull request checks
3. Configure deployment previews for PRs
4. Set up custom domain in Vercel
5. Enable deployment notifications

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- GitHub Actions Docs: https://docs.github.com/actions

