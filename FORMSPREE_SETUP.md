# Formspree Setup Instructions

Your contact form is ready to integrate with Formspree! Follow these simple steps:

## Step 1: Get Your Formspree Form ID

1. Go to [https://formspree.io/](https://formspree.io/)
2. Log in to your account
3. Click "New Form" or use an existing form
4. Give it a name (e.g., "Portfolio Contact Form")
5. Copy your form ID (it looks like: `xyzabc123`)
   - The full endpoint URL is: `https://formspree.io/f/xyzabc123`

## Step 2: Update the Code

1. Open the file: `components/sections/contact.tsx`
2. Find line 25 (around there):
   ```typescript
   const formspreeEndpoint = "https://formspree.io/f/YOUR_FORM_ID";
   ```
3. Replace `YOUR_FORM_ID` with your actual Formspree form ID:
   ```typescript
   const formspreeEndpoint = "https://formspree.io/f/xyzabc123";
   ```

## Step 3: Deploy

1. Commit the change:
   ```bash
   git add components/sections/contact.tsx
   git commit -m "Add Formspree form ID"
   git push
   ```

2. Vercel will automatically deploy your changes

## Step 4: Test

1. Visit your live site: https://aungmyintoo.com
2. Scroll to the "Get In Touch" section
3. Fill out and submit the form
4. Check your Formspree dashboard for submissions
5. Emails will be sent to: aungmyintoo.david@gmail.com

## Features Included

✅ Loading state while submitting
✅ Success message after sending
✅ Error handling with user feedback
✅ Form resets after successful submission
✅ Disabled button during submission
✅ All data sent to your Formspree account

## Troubleshooting

- **"Failed to Send" error**: Double-check your form ID is correct
- **No emails received**: Check your Formspree dashboard settings and verify your email
- **CORS errors**: Formspree handles CORS automatically, but make sure you're using the correct endpoint

That's it! Your contact form will be fully functional once you add your Formspree form ID.
