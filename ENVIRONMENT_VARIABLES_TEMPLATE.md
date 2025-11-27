# Environment Variables Template
## Copy and Fill These Values for Deployment

Use this template to prepare all environment variables before deployment to any platform (Vercel, Railway, Render, etc.).

---

## 📋 Required Variables

Copy these and fill in your actual values in your deployment platform:

```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/roots2global?retryWrites=true&w=majority

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_STRIPE_PUBLISHABLE_KEY

STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY

NEXT_PUBLIC_STRIPE_CURRENCY=USD

NEXT_PUBLIC_SITE_URL=https://your-site-name.vercel.app
```

## 📋 Optional Variables (Recommended for Production)

```
# Encryption key (optional - build will work without it, but recommended for production)
NEXT_PUBLIC_ENCRYPTION_KEY=YOUR_32_CHARACTER_RANDOM_KEY_HERE
```

---

## 🔍 Where to Get Each Variable

### 1. MONGODB_URI
**Source:** MongoDB Atlas
1. Go to MongoDB Atlas Dashboard
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `<dbname>` with `roots2global`

**Example:**
```
mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/roots2global?retryWrites=true&w=majority
```

---

### 2. NEXT_PUBLIC_ENCRYPTION_KEY (Optional but Recommended)
**Note:** This is optional - the build will work without it, but it's recommended for production security.

**Generate:** Run this command in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Example output:**
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

**Copy the entire output** (64 characters) as your encryption key.

**⚠️ Important:** 
- Build will succeed without this variable
- Recommended to set it in production for better security
- If not set, a default fallback key will be used (development mode only)

---

### 3. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
**Source:** Stripe Dashboard
1. Go to https://dashboard.stripe.com
2. Navigate to Developers → API keys
3. Copy "Publishable key" (starts with `pk_test_` or `pk_live_`)

**Example:**
```
pk_test_51AbC123dEf456GhI789JkL012MnOpQrStUvWxYz
```

---

### 4. STRIPE_SECRET_KEY
**Source:** Stripe Dashboard
1. Go to https://dashboard.stripe.com
2. Navigate to Developers → API keys
3. Click "Reveal test key" or "Reveal live key"
4. Copy "Secret key" (starts with `sk_test_` or `sk_live_`)

**Example:**
```
sk_test_51AbC123dEf456GhI789JkL012MnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrSt
```

**⚠️ Keep this secret! Never commit to GitHub.**

---

### 5. NEXT_PUBLIC_STRIPE_CURRENCY
**Value:** Currency code (usually USD)

**Options:**
- `USD` - US Dollar
- `EUR` - Euro
- `GBP` - British Pound
- `INR` - Indian Rupee
- Or any other Stripe-supported currency

---

### 6. NEXT_PUBLIC_SITE_URL
**Value:** Your deployment platform site URL

**Steps:**
1. Deploy your site first
2. Your platform will give you a URL (e.g., `https://your-app.vercel.app`)
3. Copy that URL
4. Add it as `NEXT_PUBLIC_SITE_URL`
5. Trigger a new deployment

**Examples:**
```
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-app.railway.app
NEXT_PUBLIC_SITE_URL=https://your-app.onrender.com
```

**Note:** If you add a custom domain later, update this value.

---

## 📝 How to Add Environment Variables

### For Vercel:
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Enter variable name and value
6. Select environment (Production, Preview, Development)
7. Click **"Save"**
8. Repeat for all variables
9. Redeploy your site

### For Railway/Render/Other Platforms:
1. Go to your platform dashboard
2. Select your project/service
3. Navigate to **Environment Variables** or **Config**
4. Add each variable with name and value
5. Save and redeploy

---

## ✅ Verification

After adding all variables:

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for build to complete
4. Check build logs for any errors
5. Test your site

---

## 🔒 Security Notes

- ✅ Never commit `.env` files to GitHub
- ✅ Use test Stripe keys during development
- ✅ Switch to live keys only in production
- ✅ Keep encryption key secure
- ✅ Rotate keys if compromised

---

## 🆘 Need Help?

If you're missing any values:
- **MongoDB:** Create account at https://www.mongodb.com/cloud/atlas
- **Stripe:** Create account at https://stripe.com
- **Encryption Key:** Generate using the command above

---

**Template Ready!** Fill in your values and deploy! 🚀

