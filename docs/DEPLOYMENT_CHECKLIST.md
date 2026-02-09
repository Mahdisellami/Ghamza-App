# Deployment Checklist

Complete guide for deploying Ghamza Shop to production using Vercel (frontend) and Render (backend + database).

## Pre-Deployment Checklist

- [ ] Code is committed and pushed to GitHub
- [ ] All tests pass locally
- [ ] Environment variables are documented
- [ ] Database migrations are up to date
- [ ] Security: Remove or change default credentials
- [ ] Security: Generate strong SECRET_KEY for JWT

## Part 1: Database Deployment (Render)

### 1.1 Create PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name:** ghamza-shop-db
   - **Database:** ghamza_shop
   - **User:** (auto-generated)
   - **Region:** Choose closest to your users
   - **Plan:** Free or Starter
4. Click "Create Database"
5. **SAVE** the connection details:
   - Internal Database URL
   - External Database URL
   - PSQL Command

### 1.2 Initialize Database

```bash
# Connect to database
psql <External-Database-URL>

# Or use the PSQL command provided by Render
```

Database tables will be created automatically when backend starts.

## Part 2: Backend Deployment (Render)

### 2.1 Create Web Service

1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** ghamza-shop-api
   - **Region:** Same as database
   - **Branch:** main
   - **Root Directory:** backend
   - **Runtime:** Python 3.11
   - **Build Command:**
     ```bash
     pip install -r requirements.txt
     ```
   - **Start Command:**
     ```bash
     uvicorn app.main:app --host 0.0.0.0 --port $PORT
     ```
   - **Plan:** Free or Starter

### 2.2 Set Environment Variables

Add these environment variables in Render:

```env
DATABASE_URL=<Internal-Database-URL-from-step-1.1>
DEBUG=False
API_HOST=0.0.0.0
API_PORT=8000
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,https://www.instagram.com
SECRET_KEY=<generate-a-strong-random-secret-key>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**Generate SECRET_KEY:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 2.3 Deploy

1. Click "Create Web Service"
2. Wait for build and deployment
3. **SAVE** your backend URL: `https://ghamza-shop-api.onrender.com`

### 2.4 Verify Backend

```bash
curl https://ghamza-shop-api.onrender.com/health
```

Expected response:
```json
{"status": "healthy"}
```

### 2.5 Seed Database

1. Go to Render Dashboard → your backend service
2. Click "Shell" tab
3. Run:
   ```bash
   python seed_data.py
   ```

## Part 3: Frontend Deployment (Vercel)

### 3.1 Prepare Repository

Ensure `vercel.json` exists in root:
```json
{
  "version": 2
}
```

### 3.2 Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** frontend
   - **Build Command:** (leave default)
   - **Output Directory:** (leave default)

### 3.3 Set Environment Variables

Add in Vercel project settings:

```env
NEXT_PUBLIC_API_URL=https://ghamza-shop-api.onrender.com
```

### 3.4 Deploy

1. Click "Deploy"
2. Wait for build and deployment
3. **SAVE** your frontend URL: `https://ghamza-shop.vercel.app`

### 3.5 Update Backend CORS

Go back to Render → Backend Service → Environment Variables

Update `ALLOWED_ORIGINS`:
```env
ALLOWED_ORIGINS=https://ghamza-shop.vercel.app,https://www.instagram.com
```

Then redeploy the backend service.

## Part 4: Custom Domain (Optional)

### 4.1 Frontend Domain (Vercel)

1. Go to Vercel → Project → Settings → Domains
2. Add your custom domain (e.g., `ghamza.tn`)
3. Follow Vercel's DNS configuration instructions
4. Wait for DNS propagation

### 4.2 Backend Domain (Render)

1. Go to Render → Service → Settings → Custom Domain
2. Add your API subdomain (e.g., `api.ghamza.tn`)
3. Follow Render's DNS configuration instructions
4. Update frontend `NEXT_PUBLIC_API_URL` in Vercel
5. Update backend `ALLOWED_ORIGINS` in Render

## Part 5: Post-Deployment

### 5.1 Update CORS Origins

Make sure backend `ALLOWED_ORIGINS` includes:
- Your Vercel domain
- Your custom domain (if applicable)
- Instagram domain (for future integration)

### 5.2 Test Production

1. **Test Homepage**
   - Visit your frontend URL
   - Check for console errors

2. **Test API**
   ```bash
   curl https://ghamza-shop-api.onrender.com/api/products
   ```

3. **Test User Registration**
   - Try registering a new user
   - Check if it works end-to-end

4. **Test Product Listing**
   - Browse products
   - View product details

5. **Test Cart & Orders**
   - Add items to cart
   - Create a test order

### 5.3 Monitor

1. **Backend Logs:** Render Dashboard → Service → Logs
2. **Frontend Logs:** Vercel Dashboard → Project → Deployments → Logs
3. **Database:** Render Dashboard → Database → Metrics

### 5.4 Security Checklist

- [ ] Change all default passwords
- [ ] Use strong SECRET_KEY
- [ ] Enable HTTPS only
- [ ] Review CORS origins
- [ ] Implement rate limiting (future)
- [ ] Add authentication middleware
- [ ] Implement proper password hashing

## Part 6: Continuous Deployment

Both Vercel and Render will auto-deploy when you push to main branch.

### Enable Auto-Deploy

**Vercel:**
- Already enabled by default
- Pushes to `main` → automatic deployment

**Render:**
- Go to Settings → Build & Deploy
- Enable "Auto-Deploy"
- Pushes to `main` → automatic deployment

## Common Issues

### Issue: CORS Errors

**Solution:**
- Check `ALLOWED_ORIGINS` in backend includes your frontend URL
- Redeploy backend after changing environment variables

### Issue: Database Connection Failed

**Solution:**
- Verify `DATABASE_URL` is correct
- Use Internal Database URL from Render (not External)
- Check database is in the same region as backend

### Issue: Frontend Can't Connect to Backend

**Solution:**
- Verify `NEXT_PUBLIC_API_URL` in Vercel is correct
- Redeploy frontend after changing environment variables
- Check backend is running: visit `/health` endpoint

### Issue: Render Service Times Out

**Solution:**
- Free tier services sleep after 15 minutes of inactivity
- First request may take 30+ seconds
- Consider upgrading to paid tier for always-on service

## Rollback Plan

### Frontend (Vercel)

1. Go to Vercel → Project → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

### Backend (Render)

1. Go to Render → Service → Deploys
2. Find previous working deploy
3. Click "Redeploy"

### Database (Render)

1. If you have backups enabled, restore from backup
2. Or manually restore from local backup:
   ```bash
   pg_dump <local-db> | psql <External-Database-URL>
   ```

## Production Monitoring

### Set Up Alerts

**Render:**
- Go to Service → Notifications
- Enable email notifications for deploy failures

**Vercel:**
- Go to Project → Settings → Notifications
- Configure deployment notifications

### Health Checks

Set up external monitoring:
- [UptimeRobot](https://uptimerobot.com/) (free)
- [Pingdom](https://www.pingdom.com/)
- Monitor: `https://your-api.onrender.com/health`

## Next Steps

- [ ] Set up CI/CD pipeline with GitHub Actions
- [ ] Configure staging environment
- [ ] Set up database backups
- [ ] Implement error tracking (Sentry)
- [ ] Add analytics (Google Analytics, Plausible)
- [ ] Performance monitoring
- [ ] SSL certificate verification
- [ ] SEO optimization

## Support

For deployment issues:
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs
- GitHub Issues: Create an issue in your repository
