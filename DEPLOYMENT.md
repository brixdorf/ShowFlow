# ShowFlow Deployment Guide

Complete step-by-step guide to deploy ShowFlow on Render (Backend) and Vercel (Frontend).

---

## Prerequisites

Before deploying, ensure you have:
- ✅ GitHub account
- ✅ Render account (sign up at [render.com](https://render.com))
- ✅ Vercel account (sign up at [vercel.com](https://vercel.com))
- ✅ MongoDB Atlas account with a cluster created
- ✅ TMDB API key
- ✅ Your code pushed to a GitHub repository

---

## Part 1: Deploy Backend on Render

### Step 1: Prepare MongoDB Atlas

1. **Login to MongoDB Atlas**: https://cloud.mongodb.com
2. **Whitelist all IPs** (for Render):
   - Go to **Network Access**
   - Click **Add IP Address**
   - Click **Allow Access From Anywhere** (0.0.0.0/0)
   - Click **Confirm**
3. **Get Connection String**:
   - Go to **Database** → **Connect**
   - Choose **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/?appName=ShowFlow`

### Step 2: Push Code to GitHub

```bash
# Navigate to your project root
cd ShowFlow

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/ShowFlow.git

# Push to GitHub
git push -u origin main
```

### Step 3: Create Render Web Service

1. **Login to Render**: https://dashboard.render.com
2. **Create New Web Service**:
   - Click **New +** → **Web Service**
   - Click **Connect GitHub** (authorize if needed)
   - Select your **ShowFlow** repository
   - Click **Connect**

3. **Configure Web Service**:
   ```
   Name: showflow-backend
   Region: Oregon (or closest to you)
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables**:
   Click **Advanced** → **Add Environment Variable**
   
   Add these variables:
   ```
   MONGODB_URI = your_mongodb_atlas_connection_string
   JWT_SECRET = your_generated_jwt_secret
   TMDB_API_KEY = your_tmdb_api_key
   FRONTEND_URL = (leave empty for now, will add after frontend deployment)
   NODE_VERSION = 18.17.0
   ```

5. **Create Web Service**:
   - Click **Create Web Service**
   - Wait for deployment (5-10 minutes)
   - Once done, you'll see a URL like: `https://showflow-backend.onrender.com`

6. **Test Backend**:
   - Visit: `https://your-backend-url.onrender.com/api/health`
   - Should see: `{"status":"OK","message":"Server is running"}`

7. **Copy Backend URL** - You'll need this for frontend deployment!

---

## Part 2: Deploy Frontend on Vercel

### Step 1: Update Environment Variable

Before deploying frontend, create/update `.env` file in `client/frontend/`:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

**Important**: Replace `your-backend-url` with your actual Render URL!

### Step 2: Commit and Push Changes

```bash
# From project root
git add .
git commit -m "Update API URL for production"
git push origin main
```

### Step 3: Deploy on Vercel

1. **Login to Vercel**: https://vercel.com
2. **Import Project**:
   - Click **Add New** → **Project**
   - Click **Import Git Repository**
   - Select your **ShowFlow** repository
   - Click **Import**

3. **Configure Project**:
   ```
   Framework Preset: Vite
   Root Directory: client/frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variable**:
   - Click **Environment Variables**
   - Add:
     ```
     Name: VITE_API_URL
     Value: https://your-backend-url.onrender.com/api
     ```
   - Select all environments (Production, Preview, Development)

5. **Deploy**:
   - Click **Deploy**
   - Wait for build to complete (2-5 minutes)
   - You'll get a URL like: `https://showflow-xyz.vercel.app`

### Step 4: Update Backend CORS

Now that you have the frontend URL, update Render backend:

1. **Go to Render Dashboard**
2. **Select your web service** (showflow-backend)
3. **Go to Environment**
4. **Edit FRONTEND_URL**:
   ```
   FRONTEND_URL = https://your-vercel-app.vercel.app
   ```
5. **Save Changes**
6. Render will **automatically redeploy**

---

## Part 3: Final Testing

### Test Complete Flow:

1. **Visit your Vercel frontend URL**
2. **Register a new account**
3. **Login**
4. **Search for a TV series** (e.g., "Breaking Bad")
5. **View series details**
6. **Add to favorites**
7. **Check favorites page**

If everything works, **congratulations!** 🎉 Your app is live!

---

## Part 4: Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Render (Backend):
1. Go to Settings → Custom Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## Troubleshooting

### Common Issues:

**1. CORS Errors**
- ✅ Check that FRONTEND_URL is set correctly in Render
- ✅ Make sure both URLs (http and https) are in allowedOrigins

**2. API Calls Failing**
- ✅ Verify VITE_API_URL in Vercel environment variables
- ✅ Check Render logs for backend errors
- ✅ Test health endpoint: `/api/health`

**3. Database Connection Errors**
- ✅ Verify MongoDB connection string in Render
- ✅ Check IP whitelist in MongoDB Atlas (should be 0.0.0.0/0)
- ✅ Ensure password doesn't have special characters (or encode them)

**4. Authentication Not Working**
- ✅ Check JWT_SECRET is set in Render
- ✅ Clear browser localStorage and try again
- ✅ Check browser console for errors

**5. Render Service Sleeping (Free Tier)**
- ⚠️ Free tier services sleep after 15 mins of inactivity
- First request after sleep takes ~30 seconds to wake up
- This is normal for free tier

### View Logs:

**Render Logs:**
- Dashboard → Your Service → Logs tab

**Vercel Logs:**
- Dashboard → Your Project → Deployments → View Function Logs

---

## Updating Your Deployed App

### After Making Changes:

```bash
# Make your changes locally
# Test thoroughly

# Commit and push
git add .
git commit -m "Description of changes"
git push origin main
```

**Both Vercel and Render will auto-deploy!** ✨

---

## Environment Variables Summary

### Render (Backend):
```
MONGODB_URI = mongodb+srv://user:pass@cluster.mongodb.net/
JWT_SECRET = your_64_char_random_string
TMDB_API_KEY = your_tmdb_api_key
FRONTEND_URL = https://your-app.vercel.app
NODE_VERSION = 18.17.0
```

### Vercel (Frontend):
```
VITE_API_URL = https://your-backend.onrender.com/api
```

---

## Performance Tips

1. **Render Free Tier**: Sleeps after 15 mins. Consider upgrading if needed.
2. **MongoDB Atlas**: Free tier is limited to 512MB storage
3. **Vercel**: Generous free tier, perfect for this project
4. **Keep Awake**: Use a service like UptimeRobot to ping your Render backend every 10 minutes

---

## Security Checklist

- ✅ All environment variables are set
- ✅ `.env` files are in `.gitignore`
- ✅ MongoDB IP whitelist configured
- ✅ CORS configured with specific origins
- ✅ JWT secret is long and random
- ✅ Passwords are hashed with bcrypt

---

## Cost Summary

- **MongoDB Atlas**: Free (512MB)
- **Render**: Free (with sleep on inactivity)
- **Vercel**: Free (generous limits)
- **TMDB API**: Free (rate limited)

**Total Monthly Cost: $0** 🎉

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Render and Vercel logs
3. Check GitHub Issues
4. Create a new issue with error details

---

**Happy Deploying! 🚀**
