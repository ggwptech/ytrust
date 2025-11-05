# YTrust - Deployment Guide

## Prerequisites
- Google Cloud Project with OAuth configured
- GitHub account
- Vercel account

## Deploy to Vercel

### 1. Push to GitHub

```bash
cd c:\Users\ggwpt\Desktop\app23\ytrust
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ggwptech/ytrust.git
git push -u origin main
```

### 2. Configure Google Cloud Console

Add production URLs to OAuth Client:

**Authorized JavaScript origins:**
- `https://your-app.vercel.app`

**Authorized redirect URIs:**
- `https://your-app.vercel.app/api/auth/callback/google`

### 3. Deploy on Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository: `ggwptech/ytrust`
3. Configure Environment Variables:
   - `NEXTAUTH_URL` = `https://your-app.vercel.app`
   - `NEXTAUTH_SECRET` = (your secret from .env.local)
   - `GOOGLE_CLIENT_ID` = (your Google Client ID)
   - `GOOGLE_CLIENT_SECRET` = (your Google Client Secret)
4. Click "Deploy"

### 4. After Deployment

1. Get your production URL from Vercel (e.g., `ytrust.vercel.app`)
2. Update `NEXTAUTH_URL` in Vercel environment variables with the actual URL
3. Redeploy the project

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Database Note

Currently using JSON file storage (`data/channels.json`). For production, consider:
- Vercel Postgres
- MongoDB Atlas
- Supabase
- PlanetScale

JSON file storage will reset on each deployment as Vercel is serverless.
