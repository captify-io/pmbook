"use client";

import React, { useEffect, useState } from "react";
import { useCaptify } from "@captify-io/platform/hooks";
import { apiClient } from "@captify-io/platform/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@captify-io/platform/ui";

export function MyTicketsPage() {
  const { session } = useCaptify();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadMyTickets();
  }, [filter]);

  const loadMyTickets = async () => {
    try {
      const response = await apiClient.run({
        service: "execution",
        operation: "getMyTickets",
        data: { filter },
      });
      setTickets(response.data || []);
    } catch (error) {
      console.error("Failed to load tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "text-gray-600 bg-gray-50 border-gray-200";
      case "in-progress":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "review":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "done":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-600";
      case "high":
        return "text-orange-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const filteredTickets = tickets.filter((ticket: any) => {
    if (filter === "all") return true;
    return ticket.status === filter;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Tickets</h1>
        
        <div className="flex gap-2">
          {["all", "todo", "in-progress", "review", "done"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                filter === status
                  ? "bg-blue-100 border-blue-300 text-blue-700"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <div className="space-y-4">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket: any) => (
              <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{ticket.title}</h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(
                            ticket.status
                          )}`}
                        >
                          {ticket.status.replace("-", " ")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {ticket.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 ml-4">
                      <div className="text-right">
                        <p className={`text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority} priority
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Due: {new Date(ticket.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>ID: {ticket.id}</span>
                      <span>Project: {ticket.project}</span>
                      <span>Assignee: {ticket.assignee}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                        View
                      </button>
                      {ticket.status !== "done" && (
                        <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                          Update
                        </button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {filter === "all" ? "No tickets assigned to you" : `No ${filter.replace("-", " ")} tickets`}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// CRITICAL: Must have default export for dynamic imports
export default MyTicketsPage;