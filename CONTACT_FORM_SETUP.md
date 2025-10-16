# Free Contact Form Setup (No Monthly Limits!)

Your contact form now uses a completely free solution with NO monthly limits!

## How It Works

- **Vercel Serverless Function**: Free, unlimited requests
- **Resend API**: 3,000 emails/month FREE (100/day)
- **No Database Needed**: Emails sent directly to your inbox
- **You Own The Data**: No third-party dependencies

## Setup Steps

### 1. Create Resend Account (Free)

1. Go to [https://resend.com](https://resend.com)
2. Sign up for free (no credit card needed)
3. Verify your email

### 2. Get Your API Key

1. In Resend dashboard, go to [API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name: "Portfolio Contact Form"
4. Copy the API key (starts with `re_...`)

### 3. Add API Key to Vercel

**Option A: Via Vercel Dashboard (Recommended)**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `amo_com`
3. Go to Settings → Environment Variables
4. Add new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_your_actual_api_key`
   - **Environments**: Check all (Production, Preview, Development)
5. Click "Save"
6. Redeploy your site (Vercel → Deployments → Click the 3 dots → Redeploy)

**Option B: Via Terminal**
```bash
vercel env add RESEND_API_KEY
# Paste your API key when prompted
# Select all environments
```

### 4. For Local Development (Optional)

If you want to test locally:
1. Create `.env.local` file in your project root:
   ```
   RESEND_API_KEY=re_your_actual_api_key
   ```
2. Run `npm run dev`
3. Test the form at `http://localhost:3000`

**Note**: `.env.local` is already in `.gitignore` so your key stays private

## What You Get

✅ **3,000 emails/month FREE** (100/day)
✅ **No monthly limits with Vercel** (serverless is free)
✅ **Emails sent to**: aungmyintoo.david@gmail.com
✅ **Reply-to field**: Automatically set to sender's email
✅ **Spam protection**: Built-in validation
✅ **Form states**: Loading, success, error messages

## Testing

After adding the API key to Vercel:
1. Visit https://aungmyintoo.com
2. Fill out the contact form
3. Check your email: aungmyintoo.david@gmail.com
4. You can reply directly to the email!

## Troubleshooting

**"Failed to send email" error:**
- Check that `RESEND_API_KEY` is added to Vercel
- Verify the API key is correct in Resend dashboard
- Make sure you redeployed after adding the environment variable

**Not receiving emails:**
- Check your spam folder
- Verify your email in Resend dashboard
- Check Resend logs: https://resend.com/logs

**Need more emails?**
- Free tier: 3,000/month (100/day)
- To increase: Verify your domain in Resend (free)
- Or upgrade to paid plan if you need more

## Cost Comparison

| Service | Free Tier | Your Usage (Est.) |
|---------|-----------|-------------------|
| Formspree | 50/month | ❌ Limited |
| Resend | 3,000/month | ✅ More than enough |
| Vercel Functions | Unlimited | ✅ Perfect |

## Your Setup Cost: $0/month forever! 🎉
