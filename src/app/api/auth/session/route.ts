import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const platformUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    // Proxy the session request to the platform with cookies
    const response = await fetch(`${platformUrl}/api/auth/session`, {
      headers: {
        'cookie': request.headers.get('cookie') || '',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    // Only return session if we got a 200 with valid session data
    if (response.ok) {
      const session = await response.json();
      // Check if session has user data
      if (session?.user) {
        return NextResponse.json(session);
      }
      // No user in session - unauthorized
      console.warn('Session returned 200 but no user data - unauthorized');
      return NextResponse.json({ error: '401' });
    }

    // Platform returned non-200 status
    console.warn(`Platform returned ${response.status}`);
    return NextResponse.json({ error: response.status.toString() });
  } catch (error) {
    // Platform offline or network error
    console.error('Platform server unreachable:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: '500' });
  }
}