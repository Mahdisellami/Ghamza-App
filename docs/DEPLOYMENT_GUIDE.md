# Ghamza Shop - Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (connected to GitHub)
- Render account

## Step 1: Push Code to GitHub

```bash
# If not already pushed, configure git and push
git remote -v  # Verify remote is set
git push origin main
```

If you encounter SSH key issues, you can:
1. Set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
2. Or use HTTPS: `git remote set-url origin https://github.com/YOUR_USERNAME/Ghamza-App.git`

## Step 2: Deploy Backend to Render

### 2.1 Create PostgreSQL Database
1. Go to https://dashboard.render.com
2. Click "New +" → "PostgreSQL"
3. Configure:
   - Name: `ghamza-db`
   - Database: `ghamza_shop`
   - Region: Choose closest to your users
   - Plan: Free (to start)
4. Click "Create Database"
5. **SAVE** the Internal Database URL

### 2.2 Create FastAPI Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name:** `ghamza-api`
   - **Region:** Same as database
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Python 3.11`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### 2.3 Set Environment Variables
Add these in Render dashboard:

```env
DATABASE_URL=<Internal-Database-URL-from-step-2.1>
DEBUG=False
API_HOST=0.0.0.0
API_PORT=8000
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
SECRET_KEY=<generate-strong-random-key>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Generate SECRET_KEY:
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 2.4 Deploy and Seed Database
1. Click "Create Web Service"
2. Wait for deployment
3. **SAVE** your backend URL: `https://ghamza-api.onrender.com`
4. Seed database:
   - Go to Shell tab in Render
   - Run: `python seed_data.py`

## Step 3: Deploy Frontend to Vercel

### 3.1 Import Project
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend`
   - **Build Settings:** (use defaults)

### 3.2 Set Environment Variables
Add in Vercel project settings:

```env
NEXT_PUBLIC_API_URL=https://ghamza-api.onrender.com
```

### 3.3 Deploy
1. Click "Deploy"
2. Wait for build to complete
3. **SAVE** your frontend URL: `https://ghamza-shop.vercel.app`

### 3.4 Update Backend CORS
1. Go back to Render → Backend Service
2. Update `ALLOWED_ORIGINS` environment variable:
   ```
   ALLOWED_ORIGINS=https://ghamza-shop.vercel.app,https://www.instagram.com
   ```
3. Redeploy backend

## Step 4: Vercel Speed Insights (Already Integrated!)

Speed Insights is already integrated in the frontend. Once deployed to Vercel:
1. Go to your Vercel project dashboard
2. Click "Speed Insights" tab
3. You'll automatically see performance metrics after deployment

## Step 5: Custom Domain (Optional)

### Frontend Domain
1. In Vercel → Project Settings → Domains
2. Add your custom domain (e.g., `ghamza.tn`)
3. Follow DNS configuration instructions
4. Update backend `ALLOWED_ORIGINS`

### Backend Domain
1. In Render → Service Settings → Custom Domain
2. Add API subdomain (e.g., `api.ghamza.tn`)
3. Update frontend `NEXT_PUBLIC_API_URL`

## Step 6: Verify Deployment

### Test Backend
```bash
curl https://ghamza-api.onrender.com/health
# Expected: {"status":"healthy"}

curl https://ghamza-api.onrender.com/api/products/
# Expected: JSON array of products
```

### Test Frontend
1. Visit your Vercel URL
2. Navigate through:
   - Homepage
   - Products page
   - Product detail page
   - Add to cart
   - View cart
3. Check Speed Insights in Vercel dashboard

## Troubleshooting

### Backend Issues
- **Database connection failed:** Verify `DATABASE_URL` is the Internal URL
- **CORS errors:** Check `ALLOWED_ORIGINS` includes your frontend domain
- **Service sleeping:** Free tier sleeps after 15 min inactivity (first request takes 30s)

### Frontend Issues
- **Can't connect to API:** Verify `NEXT_PUBLIC_API_URL` is correct
- **Build failures:** Check for TypeScript errors in build logs
- **Images not loading:** Ensure `next.config.js` has proper image configuration

## Monitoring

### Vercel Dashboard
- **Speed Insights:** Real-time performance metrics
- **Deployment logs:** Build and runtime logs
- **Analytics:** Page views and user behavior (upgrade required)

### Render Dashboard
- **Logs:** Application logs for debugging
- **Metrics:** CPU, memory usage
- **Database:** Connection stats and size

## Cost Estimate (Starting Free)

### Free Tier
- **Vercel:** Free for hobby projects
- **Render:**
  - PostgreSQL Free: 90 days, then $7/month
  - Web Service Free: Limited hours, sleeps after inactivity

### Production Tier (Recommended for Launch)
- **Vercel Pro:** $20/month (custom domains, analytics)
- **Render Starter:**
  - PostgreSQL Starter: $7/month
  - Web Service Starter: $7/month
- **Total:** ~$34/month for production-ready setup

## Next Steps

1. ✅ Deploy to staging (use free tiers)
2. 🔄 Test thoroughly
3. 📊 Monitor performance with Speed Insights
4. 🎨 Customize with actual Ghamza brand assets
5. 💳 Integrate payment gateway
6. 🚀 Launch to production
7. 📱 Consider mobile app (React Native)

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **FastAPI Docs:** https://fastapi.tiangolo.com

---

**Your Ghamza e-commerce platform is ready for deployment! 🚀**
