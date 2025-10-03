"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, Button } from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import { apiClient } from "@captify-io/core";
import { StreamsFlow } from "../components/streams/StreamsFlow";
import type { Contract } from "../types";

/**
 * STREAMS PAGE - Visual Contract Execution Management
 *
 * Visual flow: Contract → CLIN → Objective → Outcome → Tasks
 * - Drag and drop interface for building execution streams
 * - Click nodes to edit details
 * - Visual budget allocation tracking
 * - Easy handoff from PM (contracts/objectives) to Tech teams (outcomes/tasks)
 */

export default function OpsStreamsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedContract, setSelectedContract] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.run({
        service: "platform.dynamodb",
        operation: "scan",
        table: "pmbook-Contract",
      });

      const contractData = (response as any).Items?.filter((c: Contract) =>
        c.status === "active" || c.status === "option-pending"
      ) || [];

      setContracts(contractData);

      // Auto-select first contract if available
      if (contractData.length > 0 && !selectedContract) {
        setSelectedContract(contractData[0].id);
      }
    } catch (error) {
      console.error("Failed to load contracts:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectedContractData = contracts.find(c => c.id === selectedContract);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center">
          <DynamicIcon name="loader-2" className="h-8 w-8 animate-spin mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <StreamsFlow
        contract={selectedContractData}
        contracts={contracts}
        onUpdate={loadContracts}
        onSelectContract={setSelectedContract}
      />
    </div>
  );
}
