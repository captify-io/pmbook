import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Add identity pool ID if available
    const requestBody = {
      ...body,
      ...(process.env.COGNITO_IDENTITY_POOL_ID && {
        identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID
      })
    };

    const response = await fetch('http://localhost:3000/api/captify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || '',
        'x-app': 'pmbook'
      },
      body: JSON.stringify(requestBody)
    });

    const result = await response.text();

    try {
      const jsonResult = JSON.parse(result);
      return NextResponse.json(jsonResult, { status: response.status });
    } catch {
      return new NextResponse(result, { status: response.status });
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}