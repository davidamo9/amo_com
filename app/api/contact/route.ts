import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { neon } from '@neondatabase/serverless';

// Initialize Resend with your API key (optional - will fail gracefully if not set)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// In-memory rate limiting: IP -> { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Prune expired entries to prevent unbounded growth
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap) {
      if (now > val.resetAt) rateLimitMap.delete(key);
    }
  }

  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, website } = body;

    // Honeypot: bots fill the hidden "website" field, humans don't
    if (website) {
      return NextResponse.json({ message: 'Message saved successfully' }, { status: 200 });
    }

    // Rate limiting by IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Field length validation
    if (typeof name !== 'string' || name.length > 255) {
      return NextResponse.json({ error: 'Name is too long' }, { status: 400 });
    }
    if (typeof email !== 'string' || email.length > 255) {
      return NextResponse.json({ error: 'Email is too long' }, { status: 400 });
    }
    if (typeof message !== 'string' || message.length > 5000) {
      return NextResponse.json({ error: 'Message is too long' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const sql = neon(process.env.DATABASE_URL!);

    // Save to database
    const dbResult = await sql`
      INSERT INTO contact_submissions (name, email, message)
      VALUES (${name}, ${email}, ${message})
      RETURNING id
    `;
    const submissionId = dbResult[0].id;

    // Send email using Resend (if configured)
    let emailData = null;
    if (resend) {
      try {
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeMessage = escapeHtml(message);

        emailData = await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: ['aungmyintoo.david@gmail.com'],
          replyTo: email,
          subject: `New Contact Form Message from ${safeName}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Message:</strong></p>
            <p>${safeMessage.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Submission ID: ${submissionId}</small></p>
            <p><small>Sent from aungmyintoo.com contact form</small></p>
          `,
        });
      } catch (emailError) {
        console.warn('Email sending failed (Resend not configured):', emailError);
      }
    }

    return NextResponse.json(
      {
        message: 'Message saved successfully',
        submissionId: submissionId,
        emailId: emailData?.data?.id || 'not_configured'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}
