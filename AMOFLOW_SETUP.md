# AMOflow Integration Setup Guide

This guide walks you through configuring the AMOflow AI platform integration with your portfolio.

## Architecture Overview

```
User Browser
    ↓
aungmyintoo.com/amoflow (Vercel Next.js)
    ↓
/api/chat (Vercel API Route - Server-side proxy)
    ↓
Railway Backend (Flask/Python + PostgreSQL)
```

## Benefits of This Architecture

- ✅ **No CORS Issues**: Server-to-server communication (Vercel → Railway)
- ✅ **Secure**: Railway API URL hidden from client
- ✅ **Session Management**: Conversation history maintained
- ✅ **Scalable**: Vercel handles frontend, Railway handles AI workload
- ✅ **Modular**: Easy to swap out or upgrade

---

## Setup Steps

### Step 1: Get Your Railway API URL

1. Go to your Railway dashboard: https://railway.app
2. Select your `ai_chat` project
3. Click on your service
4. Copy the public domain URL (e.g., `https://your-app.up.railway.app`)

### Step 2: Configure Vercel Environment Variables

1. Go to Vercel dashboard: https://vercel.com
2. Select your `aungmyintoo-portfolio` project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `RAILWAY_API_URL`
   - **Value**: `https://your-railway-app.up.railway.app` (from Step 1)
   - **Environment**: All (Production, Preview, Development)
5. Click **Save**

### Step 3: Configure Railway CORS

Your Railway backend needs to allow requests from your Vercel domain.

1. Go to Railway dashboard
2. Select your `ai_chat` project
3. Go to **Variables** tab
4. Find or create `FRONTEND_URL` variable:
   - **Name**: `FRONTEND_URL`
   - **Value**: `https://aungmyintoo.com`
5. Click **Add** or **Update**

**Note**: Railway automatically redeploys when you change environment variables.

### Step 4: Update Local Environment

In your local development:

```bash
cd /Users/davidchen/Documents/Projects/amo_com
```

Edit `.env.local` and update:

```bash
RAILWAY_API_URL=https://your-actual-railway-app.up.railway.app
```

### Step 5: Test Locally

```bash
npm run dev
```

Navigate to: http://localhost:3000/amoflow

Try the interactive chatbot (last tab) and verify:
- Messages are sent successfully
- AI responses are returned
- Conversation history is maintained

### Step 6: Deploy to Vercel

```bash
git add .
git commit -m "Add AMOflow integration"
git push
```

Vercel will automatically deploy your changes.

### Step 7: Verify Production

1. Visit: https://aungmyintoo.com/amoflow
2. Test the interactive chatbot
3. Check browser console for errors (should be none)
4. Verify conversation continuity (responses remember context)

---

## Troubleshooting

### Issue: "Backend configuration error"

**Cause**: `RAILWAY_API_URL` not set in Vercel

**Solution**:
1. Check Vercel dashboard → Settings → Environment Variables
2. Ensure `RAILWAY_API_URL` is set for all environments
3. Redeploy if needed

### Issue: CORS errors in browser console

**Cause**: Railway `FRONTEND_URL` doesn't match your domain

**Solution**:
1. Check Railway Variables tab
2. Ensure `FRONTEND_URL=https://aungmyintoo.com` (no trailing slash)
3. Wait for automatic redeploy
4. Clear browser cache and retry

### Issue: "Failed to get response from AI backend"

**Cause**: Railway backend is down or URL is incorrect

**Solution**:
1. Verify Railway service is running (check Railway dashboard)
2. Test Railway URL directly: `curl https://your-railway-app.up.railway.app/api/health`
3. Check Railway logs for errors
4. Ensure `RAILWAY_API_URL` in Vercel matches Railway public domain

### Issue: Chatbot doesn't remember conversation

**Cause**: Session ID not being stored

**Solution**:
- This is handled automatically via `sessionStorage`
- Check browser console for session ID logs
- Try clearing browser cache and starting fresh

### Issue: Slow responses

**Cause**: Railway cold start or LLM provider rate limits

**Solution**:
- Railway free tier has cold starts (first request takes ~10s)
- Upgrade to paid plan for always-on instances
- Check Railway logs for LLM API errors
- Verify GROQ_API_KEY or OPENAI_API_KEY is set in Railway

---

## Railway Backend Configuration

Your Railway backend (`ai_chat`) should have these variables set:

### Required Variables:
```bash
# LLM Provider
LLM_PROVIDER=groq
GROQ_API_KEY=your_groq_api_key
OPENAI_API_KEY=your_openai_api_key  # Optional, backup provider

# CORS Configuration
FRONTEND_URL=https://aungmyintoo.com

# Flask Security
FLASK_SECRET_KEY=your_secret_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password

# PostgreSQL Database
DATABASE_URL=postgresql://...  # Auto-provided by Railway Postgres addon

# Optional: CRM Integration
MEMBRAIN_API_KEY=your_membrain_key  # If using CRM sync
MEMBRAIN_SUBDOMAIN=your-company
```

---

## API Endpoint Reference

### POST /api/chat

**Request:**
```json
{
  "message": "What is your chatbot platform about?",
  "sessionId": "optional-session-id"
}
```

**Response:**
```json
{
  "response": "Our AI chatbot platform...",
  "sessionId": "session_12345_abc",
  "status": "success"
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "status": "error"
}
```

---

## Monitoring & Analytics

### Vercel Logs
1. Vercel Dashboard → Your Project → Logs
2. Filter by `/api/chat` to see API proxy requests
3. Check for error rates

### Railway Logs
1. Railway Dashboard → Your Service → Deployments
2. Click latest deployment → View Logs
3. Look for:
   - `[Chat API]` entries (incoming requests)
   - LLM API call logs
   - Error traces

### Conversation Database
Access Railway backend admin panel:
1. Go to: `https://your-railway-app.up.railway.app/admin/login`
2. Login with `ADMIN_USERNAME` and `ADMIN_PASSWORD`
3. View conversation analytics, leads, and CRM sync status

---

## Future Enhancements

### Add Custom Domain for Railway
1. Buy domain for API (e.g., `api.aungmyintoo.com`)
2. Point CNAME to Railway domain
3. Update `RAILWAY_API_URL` in Vercel
4. Update `FRONTEND_URL` in Railway to include subdomain

### Add Rate Limiting
Railway backend already has rate limiting, but you can add client-side throttling:

```tsx
// In ChatbotDemo.tsx
const rateLimiter = {
  requests: 0,
  resetTime: Date.now(),
  limit: 10, // 10 requests per minute
};
```

### Add Analytics
Track chatbot usage with Google Analytics or Vercel Analytics:

```tsx
// Track chat interactions
analytics.track('chatbot_message_sent', {
  sessionId,
  messageLength: message.length
});
```

---

## Security Notes

- ✅ Railway API URL is server-side only (not exposed to browser)
- ✅ CORS properly configured (only your domain allowed)
- ✅ Rate limiting active on Railway backend
- ✅ Session IDs are random and temporary
- ✅ PII auto-deleted after 24 hours (configurable via `PII_RETENTION_HOURS`)

---

## Need Help?

- **Railway Issues**: Check Railway documentation or community forum
- **Vercel Issues**: Vercel support chat (bottom right of dashboard)
- **CORS Issues**: Verify both `RAILWAY_API_URL` (Vercel) and `FRONTEND_URL` (Railway)
- **API Issues**: Check Railway logs for backend errors

---

## Quick Verification Checklist

- [ ] `RAILWAY_API_URL` set in Vercel (all environments)
- [ ] `FRONTEND_URL=https://aungmyintoo.com` set in Railway
- [ ] Railway service is running (check dashboard)
- [ ] `/amoflow` route accessible locally
- [ ] Interactive chatbot responds successfully
- [ ] No CORS errors in browser console
- [ ] Conversation history maintained across messages
- [ ] Production deployment successful
- [ ] Production chatbot tested and working
