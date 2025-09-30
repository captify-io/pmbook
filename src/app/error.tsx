"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="text-muted-foreground mb-6">
          The application encountered an error. This usually happens when the platform server is offline.
        </p>
        <div className="space-y-2">
          <button
            onClick={reset}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try again
          </button>
          <button
            onClick={() => window.location.href = "http://localhost:3000/signin"}
            className="w-full px-4 py-2 border border-input rounded-md hover:bg-accent"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
