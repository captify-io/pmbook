"use client";

import React, { useEffect, useState } from "react";
import { useCaptify } from "@captify-io/core/components";
import { apiClient } from "@captify-io/core";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@captify-io/core/components/ui";

function ValueStreamsPage() {
  const { session } = useCaptify();
  const [valueStreams, setValueStreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadValueStreams();
  }, []);

  const loadValueStreams = async () => {
    try {
      const response = await apiClient.run({
        service: "execution",
        operation: "getValueStreams",
        data: {},
      });
      setValueStreams(response.data || []);
    } catch (error) {
      console.error("Failed to load value streams:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50 border-green-200";
      case "planning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "blocked":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Value Streams</h1>

      {loading ? (
        <p>Loading value streams...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valueStreams.length > 0 ? (
            valueStreams.map((stream: any) => (
              <Card key={stream.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{stream.name}</CardTitle>
                    <span
                      className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(
                        stream.status
                      )}`}
                    >
                      {stream.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {stream.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Lead Time:</span>
                      <span className="font-medium">{stream.leadTime}d</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Throughput:</span>
                      <span className="font-medium">{stream.throughput}/week</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Efficiency:</span>
                      <span className="font-medium">{stream.efficiency}%</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      Owner: {stream.owner} • Last updated: {new Date(stream.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No value streams configured</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// CRITICAL: Must have default export for dynamic imports
export default ValueStreamsPage;