import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@captify-io/platform/lib/auth';
import { services } from '../../../services';
import { config } from '../../../config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { service } = body;

    // Check if this is a local pmbook service
    if (service && service.startsWith('pmbook.')) {
      const serviceName = service.replace('pmbook.', '');
      const localService = services.use(serviceName);

      if (!localService) {
        return NextResponse.json(
          { error: `Service not found: ${service}` },
          { status: 404 }
        );
      }

      // Get session for authentication using platform's auth
      const session = await auth();

      if (!session?.user) {
        return NextResponse.json(
          { error: 'Not authenticated' },
          { status: 401 }
        );
      }

      // Execute the local service
      const result = await localService.execute(body, null, session);
      return NextResponse.json(result);
    }

    // For all other services (platform.*), proxy to the platform server
    const externalApp = request.headers.get('x-app');

    // Only include identityPoolId if the request is from this app
    const requestBody = {
      ...body,
      ...(externalApp === config.appName && process.env.COGNITO_IDENTITY_POOL_ID && {
        identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID
      })
    };

    const captifyApiUrl = process.env.CAPTIFY_API_URL || 'https://platform.captify.io/api/captify';

    const response = await fetch(captifyApiUrl, {
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