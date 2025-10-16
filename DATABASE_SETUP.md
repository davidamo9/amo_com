# Database + Admin Dashboard Setup

Your portfolio now has a **FREE** database to store all contact form submissions + a beautiful admin dashboard to view them!

## What You Get

✅ **PostgreSQL Database** (Vercel Postgres - 256 MB free)
✅ **Beautiful Admin Dashboard** at `/admin`
✅ **Email notifications** (Resend)
✅ **Database storage** (never lose a message)
✅ **Read/unread tracking**
✅ **Password protected** dashboard

---

## Setup Steps

### 1. Create Vercel Postgres Database

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **amo_com**
3. Click on the **"Storage"** tab
4. Click **"Create Database"**
5. Select **"Postgres"**
6. Choose a name: `portfolio-db`
7. Select region closest to you
8. Click **"Create"**

Vercel will automatically add these environment variables to your project:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- etc.

### 2. Initialize the Database

After deploying, visit this URL once to create the table:
```
https://aungmyintoo.com/api/init-db
```

You should see:
```json
{
  "message": "Database initialized successfully"
}
```

### 3. Set Admin Password

Add one more environment variable in Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add new variable:
   - **Name**: `ADMIN_PASSWORD`
   - **Value**: Choose a strong password (e.g., `MySecureP@ssw0rd123`)
   - **Environments**: Check all (Production, Preview, Development)
3. Click **"Save"**
4. **Redeploy** your site

---

## Using the Admin Dashboard

### Access the Dashboard

1. Visit: **https://aungmyintoo.com/admin**
2. Enter your `ADMIN_PASSWORD`
3. Click "Login"

### Dashboard Features

**📊 Overview**
- See total number of submissions
- View all messages in chronological order
- Unread messages have a blue indicator

**✉️ Each Submission Shows:**
- Sender's name and email
- Message content
- Date and time received
- Read/unread status
- Submission ID

**🔧 Actions You Can Do:**
- Mark as read/unread
- Reply via email (opens your email client)
- Refresh to see new submissions
- Logout

### Password Storage

- Password is stored in `localStorage` for convenience
- You only need to enter it once per browser
- Click "Logout" to clear the password

---

## How It Works

### When Someone Submits the Form:

```
1. User fills out contact form
         ↓
2. Data sent to /api/contact
         ↓
3. Saved to Vercel Postgres database
         ↓
4. Email sent via Resend
         ↓
5. You get email notification
   + Data stored in database forever
```

### When You View Dashboard:

```
1. Visit /admin
         ↓
2. Enter password
         ↓
3. API fetches all submissions from database
         ↓
4. Beautiful UI displays all messages
```

---

## Database Schema

```sql
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read BOOLEAN DEFAULT false
)
```

---

## Cost Breakdown

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel Postgres | 256 MB, 60 hrs compute/month | $0 |
| Vercel Functions | Unlimited | $0 |
| Resend Emails | 3,000/month | $0 |
| **Total** | | **$0/month** |

---

## Local Development (Optional)

If you want to test locally:

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel env pull .env.local`
   - This downloads all environment variables
3. Run: `npm run dev`
4. Visit: `http://localhost:3000/admin`

---

## Troubleshooting

**"Failed to fetch submissions"**
- Make sure you've created the Vercel Postgres database
- Visit `/api/init-db` to initialize the table
- Check that `ADMIN_PASSWORD` environment variable is set

**"Unauthorized" error**
- Double-check your password
- Make sure `ADMIN_PASSWORD` is set in Vercel
- Try logging out and logging in again

**Database not saving submissions**
- Verify Postgres database is created in Vercel
- Check Vercel function logs for errors
- Make sure you ran `/api/init-db`

**Not receiving emails**
- Check that `RESEND_API_KEY` is still set
- Verify your Resend account is active
- Check spam folder

---

## Security Notes

✅ **Dashboard is password protected**
✅ **Password stored locally in browser only**
✅ **All API calls require authentication**
✅ **Environment variables never exposed to client**
✅ **SQL injection protected** (using parameterized queries)

---

## Next Steps

1. Create Vercel Postgres database
2. Visit `/api/init-db` to set up table
3. Set `ADMIN_PASSWORD` in Vercel
4. Redeploy
5. Test the contact form
6. Visit `/admin` to see your submission!

**Your portfolio is now enterprise-grade! 🚀**
