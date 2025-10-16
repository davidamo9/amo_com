import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    // Simple authentication check
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch all submissions, ordered by most recent first
    const result = await sql`
      SELECT id, name, email, message, created_at, read
      FROM contact_submissions
      ORDER BY created_at DESC
    `;

    return NextResponse.json({
      submissions: result,
      total: result.length
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

// Mark a submission as read
export async function PATCH(request: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await request.json();

    await sql`
      UPDATE contact_submissions
      SET read = true
      WHERE id = ${id}
    `;

    return NextResponse.json(
      { message: 'Submission marked as read' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}
