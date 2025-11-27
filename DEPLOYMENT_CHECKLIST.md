# 🚀 Deployment Checklist

## ✅ Pre-Deployment Verification

### Code Quality
- [x] TypeScript: No type errors
- [x] ESLint: No linting errors
- [x] Build: Successful compilation
- [x] Dependencies: All installed correctly
- [x] Console statements: Removed from production code
- [x] Error handling: All API routes have try-catch
- [x] Type safety: No `any` types in critical paths

### Currency Conversion
- [x] API-based conversion implemented
- [x] Exchange rates fetched on app load
- [x] Fallback rates configured
- [x] All prices convert from USD correctly

### Performance
- [x] Images optimized with lazy loading
- [x] Code splitting enabled
- [x] Bundle size optimized
- [x] Next.js config optimized

### Security
- [x] Environment variables properly handled
- [x] Encryption key has fallback
- [x] MongoDB connection safe
- [x] API routes protected

---

## 📋 Required Environment Variables

### Production (Required)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/roots2global?retryWrites=true&w=majority
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_CURRENCY=USD
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Optional (Recommended)
```
NEXT_PUBLIC_ENCRYPTION_KEY=your-64-character-key
NEXT_PUBLIC_ERROR_TRACKING_ENABLED=true
NEXT_PUBLIC_DEBUG=false
```

---

## 🔧 Deployment Steps

### 1. Pre-Deployment
- [ ] Review all environment variables
- [ ] Test build locally: `npm run build`
- [ ] Test production build: `npm run start`
- [ ] Verify all API endpoints work
- [ ] Check currency conversion works
- [ ] Test payment flow (Stripe test mode)

### 2. Platform Setup (Vercel/Netlify/Railway)
- [ ] Connect GitHub repository
- [ ] Set build command: `npm run build`
- [ ] Set output directory: `.next`
- [ ] Set Node.js version: `18.x` or `20.x`
- [ ] Add all environment variables
- [ ] Configure custom domain (if applicable)

### 3. Environment Variables Setup
- [ ] Add `MONGODB_URI`
- [ ] Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] Add `STRIPE_SECRET_KEY`
- [ ] Add `NEXT_PUBLIC_STRIPE_CURRENCY`
- [ ] Add `NEXT_PUBLIC_SITE_URL` (after first deploy)
- [ ] Add `NEXT_PUBLIC_ENCRYPTION_KEY` (optional but recommended)

### 4. First Deployment
- [ ] Trigger initial deployment
- [ ] Monitor build logs for errors
- [ ] Verify build completes successfully
- [ ] Test website loads correctly
- [ ] Update `NEXT_PUBLIC_SITE_URL` with actual URL
- [ ] Redeploy after updating site URL

### 5. Post-Deployment Testing
- [ ] Test homepage loads
- [ ] Test product listing page
- [ ] Test product detail page
- [ ] Test cart functionality
- [ ] Test checkout process
- [ ] Test currency conversion
- [ ] Test payment (test mode)
- [ ] Test user registration/login
- [ ] Test seller dashboard
- [ ] Test API endpoints

### 6. Production Verification
- [ ] Switch Stripe to live mode (when ready)
- [ ] Update `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to live key
- [ ] Update `STRIPE_SECRET_KEY` to live key
- [ ] Test live payment flow
- [ ] Monitor error logs
- [ ] Check performance metrics

---

## 🐛 Common Issues & Solutions

### Build Fails
- **Issue:** Missing environment variables
- **Solution:** Add all required variables in platform settings

### MongoDB Connection Error
- **Issue:** `MONGODB_URI` not set or incorrect
- **Solution:** Verify connection string, check IP whitelist in MongoDB Atlas

### Stripe Payment Fails
- **Issue:** Stripe keys not set or incorrect
- **Solution:** Verify keys match environment (test vs live)

### Currency Conversion Not Working
- **Issue:** Exchange rate API failing
- **Solution:** Check API endpoint, fallback rates will be used automatically

### Images Not Loading
- **Issue:** Image domain not configured
- **Solution:** Add domain to `next.config.js` remotePatterns

---

## 📊 Performance Checklist

- [x] Images optimized (lazy loading, proper sizes)
- [x] Code splitting enabled
- [x] Bundle size optimized
- [x] API calls cached
- [x] Exchange rates cached (1 hour)
- [x] Static pages pre-rendered
- [x] Dynamic routes optimized

---

## 🔒 Security Checklist

- [x] Environment variables not in code
- [x] API routes protected
- [x] User input sanitized
- [x] Passwords hashed
- [x] Encryption key configured
- [x] HTTPS enabled
- [x] Security headers configured

---

## ✅ Final Verification

Before going live:
1. [ ] All tests pass
2. [ ] Build succeeds
3. [ ] All environment variables set
4. [ ] Payment flow tested
5. [ ] Currency conversion verified
6. [ ] Performance acceptable
7. [ ] No console errors
8. [ ] Error tracking configured
9. [ ] Backup plan ready

---

## 🚀 Ready to Deploy!

Your application is ready for production deployment. Follow the steps above and monitor the first deployment closely.

**Good luck! 🎉**

