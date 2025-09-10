import { Suspense } from "react";

interface CaptifyPageProps {
  params: Promise<{ captify: string[] }>;
}

export default async function CaptifyPage({ params }: CaptifyPageProps) {
  const { captify } = await params;
  const packageName = captify[0];

  // If this is the PMBook package, show the PMBook content
  if (packageName === "pmbook") {
    return (
      <Suspense fallback={<div>Loading PMBook...</div>}>
        <PMBookApp />
      </Suspense>
    );
  }

  // For other packages, show a default message
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Package: {packageName}</h1>
      <p className="text-muted-foreground">
        This package is not configured yet.
      </p>
    </div>
  );
}

// PMBook application component
function PMBookApp() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">PMBook Dashboard</h1>
        <p className="text-muted-foreground">
          Strategic alignment and business operations platform for government contracting
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Operations</h3>
          <p className="text-sm text-muted-foreground">
            Contract management, performance monitoring, and team insights
          </p>
        </div>
        
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Services</h3>
          <p className="text-sm text-muted-foreground">
            Internal service marketplace and ticket management
          </p>
        </div>
        
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Work Management</h3>
          <p className="text-sm text-muted-foreground">
            Task tracking, productivity metrics, and work streams
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Execution</h3>
          <p className="text-sm text-muted-foreground">
            My tickets, value streams, and delivery tracking
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Strategic</h3>
          <p className="text-sm text-muted-foreground">
            Strategic goals, roadmaps, and business alignment
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Intelligence</h3>
          <p className="text-sm text-muted-foreground">
            AI-driven insights and performance analytics
          </p>
        </div>
      </div>
    </div>
  );
}