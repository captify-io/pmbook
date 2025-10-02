import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy all NextAuth requests to the platform
 * This ensures centralized authentication without duplicating Cognito config
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ nextauth: string[] }> }
) {
  const { nextauth } = await params;
  const captifyUrl = process.env.CAPTIFY_URL!;
  const path = nextauth.join("/");
  const searchParams = request.nextUrl.searchParams.toString();
  const url = `${captifyUrl}/api/auth/${path}${
    searchParams ? `?${searchParams}` : ""
  }`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Forward cookies from the original request
        ...(request.headers.get("cookie")
          ? { Cookie: request.headers.get("cookie")! }
          : {}),
      },
      credentials: "include",
    });

    const data = await response.json();
    const headers = new Headers();

    // Forward Set-Cookie headers from platform
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        headers.append(key, value);
      }
    });

    return NextResponse.json(data, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error("Auth proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy auth request" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ nextauth: string[] }> }
) {
  const { nextauth } = await params;
  const captifyUrl = process.env.CAPTIFY_URL!;
  const path = nextauth.join("/");
  const searchParams = request.nextUrl.searchParams.toString();
  const url = `${captifyUrl}/api/auth/${path}${
    searchParams ? `?${searchParams}` : ""
  }`;

  try {
    const body = await request.text();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(request.headers.get("cookie")
          ? { Cookie: request.headers.get("cookie")! }
          : {}),
      },
      body,
      credentials: "include",
    });

    const data = await response.json();
    const headers = new Headers();

    // Forward Set-Cookie headers from platform
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        headers.append(key, value);
      }
    });

    return NextResponse.json(data, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error("Auth proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy auth request" },
      { status: 500 }
    );
  }
}
