# Admin Panel Setup Guide

This guide explains how to set up and use the admin panel for managing your Gifted Solutions e-commerce store.

## 🔐 Admin Access

The admin panel is accessible at: **`/admin`**

### Security Features

- ✅ Firebase Authentication
- ✅ Email whitelist (only authorized admins)
- ✅ Protected routes (automatic redirects)
- ✅ Secure session management

---

## 📋 Prerequisites

1. **Firebase Account** (free tier available)
2. **Admin email** configured
3. **Supabase Storage** bucket created

---

## 🚀 Setup Instructions

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or select existing project
3. Name it: `gifted-solutions` (or your preference)
4. Disable Google Analytics (optional for simple setup)
5. Click **"Create project"**

### Step 2: Enable Firebase Authentication

1. In Firebase Console, go to **"Authentication"**
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable **"Email/Password"** provider
5. Click **"Save"**

### Step 3: Add Admin User

1. Go to **Authentication** > **"Users"** tab
2. Click **"Add user"**
3. Enter:
   - **Email**: `admin@giftedsolutions.com` (or your email)
   - **Password**: Create a strong password
4. Click **"Add user"**

### Step 4: Get Firebase Credentials

1. Go to **Project Settings** (gear icon) > **"General"** tab
2. Scroll to **"Your apps"** section
3. Click **"Web"** icon (`</>`)
4. Register app name: `Gifted Solutions Admin`
5. Copy the configuration values

### Step 5: Configure Environment Variables

Update your `.env.local` file with Firebase credentials:

```env
# Existing Supabase config
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx

# Firebase Authentication
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:xxxxx

# Admin Configuration
NEXT_PUBLIC_ADMIN_EMAIL=admin@giftedsolutions.com

# Business Configuration (existing)
NEXT_PUBLIC_WHATSAPP_NUMBER=260779421717
NEXT_PUBLIC_BUSINESS_NAME=Gifted Solutions
NEXT_PUBLIC_BUSINESS_LOCATION=Lusaka, Chalala near ICU
```

### Step 6: Set Up Supabase Storage

1. Go to **Supabase Dashboard**
2. Navigate to **Storage**
3. Run the migration:
   - Go to **SQL Editor**
   - Copy contents of `supabase/migrations/002_admin_storage.sql`
   - Click **"Run"**
4. Verify bucket `product-images` was created

### Step 7: Restart Development Server

```bash
pnpm run dev
```

---

## 🎯 Using the Admin Panel

### Accessing Admin Panel

1. Navigate to: `http://localhost:3000/admin`
2. Enter your admin email and password
3. Click **"Sign In"**

### Dashboard

The dashboard shows:
- Total products count
- Active products count
- Total orders
- Pending orders

**Quick Actions:**
- Manage Products
- View Orders

### Managing Products

#### View Products

- Navigate to **Products** from sidebar
- Use search to find specific products
- Filter by category
- See product status (Active/Inactive)

#### Add New Product

1. Click **"Add Product"** button
2. Upload product image (optional)
3. Fill in details:
   - **Name**: Product name (e.g., "Arduino Uno + USB Cable")
   - **Category**: Select from dropdown
   - **Price**: Price in Kwacha
   - **Unit**: Unit of measurement (e.g., "each", "IC")
   - **Description**: Product details, features, specs
   - **Active**: Check to make visible in store
4. Click **"Save Product"**

#### Edit Product

1. Click **Edit** icon (pencil) next to product
2. Update any fields
3. Upload new image to replace existing
4. Click **"Save Product"**

#### Delete Product

1. Click **Delete** icon (trash) next to product
2. Confirm deletion
3. Product will be soft-deleted (marked inactive)

#### Image Upload

- **Supported formats**: PNG, JPG, JPEG, WebP
- **Max size**: 5 MB
- **Recommendations**:
  - Use square images (1:1 ratio)
  - Minimum 400x400px
  - Transparent background (PNG) works best
  - Compress images before upload

### Managing Orders

#### View Orders

- Navigate to **Orders** from sidebar
- Filter by status:
  - Pending
  - Processing
  - Completed
  - Cancelled

#### Update Order Status

1. Find order in list
2. Click status dropdown
3. Select new status
4. Status updates automatically

#### Order Information

Each order shows:
- Order ID (shortened)
- Creation date/time
- Customer information (if provided)
- Order items with quantities
- Total amount
- Order notes

---

## 🔒 Security Best Practices

### Email Whitelist

Only emails in the whitelist can access admin:

**To add more admins**, edit `src/lib/firebase.ts`:

```typescript
export const ADMIN_EMAILS = [
  'admin@giftedsolutions.com',
  'manager@giftedsolutions.com', // Add more emails here
];
```

### Password Security

- Use strong passwords (12+ characters)
- Include uppercase, lowercase, numbers, symbols
- Don't share passwords
- Change passwords regularly

### Logout

Always logout when finished:
1. Click your profile at bottom of sidebar
2. Click **"Logout"** button

---

## 🛠️ Troubleshooting

### Can't Login

**Issue**: "Access denied" error

**Solution**:
1. Verify email is in whitelist (`src/lib/firebase.ts`)
2. Check Firebase user exists
3. Verify environment variables are set

**Issue**: Firebase error

**Solution**:
1. Check Firebase API key in `.env.local`
2. Verify Firebase authentication is enabled
3. Check browser console for detailed errors

### Image Upload Fails

**Issue**: "Failed to upload image" error

**Solution**:
1. Verify Supabase storage migration ran successfully
2. Check bucket `product-images` exists and is public
3. Verify image size < 5MB
4. Try different image format

### Products Not Updating

**Issue**: Changes don't appear in store

**Solution**:
1. Check "Active" checkbox is enabled
2. Wait 1 hour for ISR cache to expire, or
3. Force refresh store page (Ctrl+Shift+R)
4. Check Supabase connection in console

---

## 📱 Mobile Admin Access

The admin panel is fully responsive:

- ✅ Works on tablets
- ✅ Works on smartphones
- ✅ Touch-optimized
- ✅ Collapsible sidebar

**Note**: For security, use HTTPS in production.

---

## 🚀 Production Deployment

### Vercel Environment Variables

Add all environment variables in Vercel Dashboard:

1. Go to **Project Settings** > **Environment Variables**
2. Add each `NEXT_PUBLIC_*` variable
3. Click **"Save"**
4. Redeploy application

### Firebase Security Rules

Firebase authentication is secure by default:
- Email/password requires verification
- Session expires after inactivity
- HTTPS enforced in production

### Recommended Security Enhancements

For production, consider:

1. **Email Verification**: Require verified email
2. **2FA**: Enable two-factor authentication
3. **IP Whitelist**: Restrict admin access by IP
4. **Audit Logging**: Log all admin actions
5. **Regular Backups**: Backup database regularly

---

## 📊 Admin Features Summary

| Feature | Description | Status |
|---------|-------------|--------|
| Authentication | Firebase email/password | ✅ |
| Dashboard | Stats overview | ✅ |
| Product Management | CRUD operations | ✅ |
| Image Upload | Supabase Storage | ✅ |
| Order Management | View & update status | ✅ |
| Mobile Responsive | Works on all devices | ✅ |
| Secure Access | Email whitelist | ✅ |

---

## 🎓 Admin Workflow

### Daily Tasks

1. **Check pending orders**
   - Review new orders
   - Update to "Processing"
   - Mark as "Completed" when shipped

2. **Update inventory**
   - Add new products
   - Update out-of-stock items
   - Adjust prices

3. **Monitor sales**
   - Review dashboard statistics
   - Track popular products

### Weekly Tasks

1. **Product updates**
   - Add new arrivals
   - Update product images
   - Refresh descriptions

2. **Order fulfillment**
   - Complete all pending orders
   - Archive completed orders

---

## 💡 Tips & Best Practices

### Product Management

- ✅ Use clear, descriptive product names
- ✅ Include all specifications in description
- ✅ Upload high-quality images
- ✅ Set competitive prices
- ✅ Use consistent naming conventions

### Image Guidelines

- ✅ 1:1 aspect ratio (square)
- ✅ White or transparent background
- ✅ Show product clearly
- ✅ Compress before upload
- ✅ Use descriptive filenames

### Order Processing

- ✅ Respond to orders within 24 hours
- ✅ Update status promptly
- ✅ Keep customers informed
- ✅ Archive old completed orders

---

## 📞 Support

Need help with the admin panel?

- 📧 **Email**: admin-support@giftedsolutions.com
- 📱 **WhatsApp**: +260 779 421717
- 📚 **Documentation**: See README.md and related docs

---

**Admin panel built with ❤️ for Gifted Solutions**

