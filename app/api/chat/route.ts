import { NextRequest, NextResponse } from 'next/server';

/**
 * Chat API Proxy - Forwards requests to Railway backend
 * This solves CORS issues by making server-to-server calls
 * Railway backend trusts aungmyintoo.com via FRONTEND_URL env var
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const railwayUrl = process.env.RAILWAY_API_URL;

    if (!railwayUrl) {
      console.error('RAILWAY_API_URL environment variable is not set');
      return NextResponse.json(
        { error: 'Backend configuration error' },
        { status: 500 }
      );
    }

    // Generate or retrieve session ID for conversation continuity
    const sessionId = body.sessionId || `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Get client IP for rate limiting on Railway backend
    const clientIp = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    console.log(`[Chat API] Forwarding request to Railway for session: ${sessionId.substring(0, 15)}...`);

    // Forward request to Railway backend
    const response = await fetch(`${railwayUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-ID': sessionId,
        'X-Forwarded-For': clientIp,
      },
      body: JSON.stringify({
        message: body.message,
        messages: body.messages,
        sessionId: sessionId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Chat API] Railway backend error: ${response.status} - ${errorText}`);
      return NextResponse.json(
        { error: 'Failed to get response from AI backend', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Include session ID in response for client to store
    return NextResponse.json({
      ...data,
      sessionId: sessionId,
    });

  } catch (error) {
    console.error('[Chat API] Error:', error);
    return NextResponse.json(
      {
        error: 'An error occurred while processing your request',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
