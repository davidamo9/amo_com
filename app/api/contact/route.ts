import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { sql } from '@vercel/postgres';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to database
    const dbResult = await sql`
      INSERT INTO contact_submissions (name, email, message)
      VALUES (${name}, ${email}, ${message})
      RETURNING id
    `;

    // Send email using Resend
    const emailData = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['aungmyintoo.david@gmail.com'],
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submission ID: ${dbResult.rows[0].id}</small></p>
        <p><small>Sent from aungmyintoo.com contact form</small></p>
      `,
    });

    return NextResponse.json(
      {
        message: 'Message saved and email sent successfully',
        submissionId: dbResult.rows[0].id,
        emailId: emailData.data?.id || 'sent'
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
