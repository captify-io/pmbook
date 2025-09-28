"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@captify-io/platform/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import { Contract } from "../../../types/contract";
import { apiClient } from "@captify-io/platform/lib";

function ActiveContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contractNumber: "",
    customer: "",
    popStart: "",
    popEnd: "",
  });

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    try {
      const response = await apiClient.run({
        service: "platform.dynamodb",
        operation: "scan",
        table: "pmbook-Contract",
      });

      if (response.success && response.data?.Items) {
        setContracts(response.data.Items);
      } else {
        console.error("Failed to load contracts:", response.error);
      }
    } catch (error) {
      console.error("Failed to load contracts:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const contract: Partial<Contract> = {
      id: `contract-${Date.now()}`,
      name: formData.name,
      contractNumber: formData.contractNumber,
      customer: formData.customer,
      popStart: formData.popStart,
      popEnd: formData.popEnd,
      status: "active",
      type: "FFP",
      awardAmount: 0,
      awardDate: new Date().toISOString().split("T")[0],
      totalValue: 0,
      fundedValue: 0,
      burnedValue: 0,
      remainingValue: 0,
      monthlyBurnRate: 0,
      avgMonthlyBurn: 0,
      budgetedCosts: {
        direct: 0,
        indirect: 0,
        materials: 0,
        subcontracts: 0,
        profit: 0,
        total: 0,
      },
      expendedCosts: {
        direct: 0,
        indirect: 0,
        materials: 0,
        subcontracts: 0,
        profit: 0,
        total: 0,
      },
      startDate: formData.popStart,
      endDate: formData.popEnd,
      cdrls: [],
      milestones: [],
      programManager: "",
      teams: [],
      laborCategories: [],
      indirectRate: 0,
      healthScore: 0,
      risks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await apiClient.run({
        service: "platform.dynamodb",
        operation: "put",
        table: "pmbook-Contract",
        data: {
          item: contract,
        },
      });

      if (response.success) {
        setFormData({
          name: "",
          contractNumber: "",
          customer: "",
          popStart: "",
          popEnd: "",
        });
        setIsOpen(false);
        loadContracts();
      } else {
        console.error("Failed to create contract:", response.error);
      }
    } catch (error) {
      console.error("Failed to create contract:", error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Active Contracts</h1>
          <p className="text-muted-foreground">
            Current contracts and funding pools
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <DynamicIcon name="plus" className="h-4 w-4 mr-2" />
              Add Contract
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Contract</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Contract Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contractNumber">Contract Number</Label>
                <Input
                  id="contractNumber"
                  value={formData.contractNumber}
                  onChange={(e) =>
                    handleInputChange("contractNumber", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="customer">Customer</Label>
                <Input
                  id="customer"
                  value={formData.customer}
                  onChange={(e) =>
                    handleInputChange("customer", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="popStart">Period of Performance Start</Label>
                <Input
                  id="popStart"
                  type="date"
                  value={formData.popStart}
                  onChange={(e) =>
                    handleInputChange("popStart", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="popEnd">Period of Performance End</Label>
                <Input
                  id="popEnd"
                  type="date"
                  value={formData.popEnd}
                  onChange={(e) => handleInputChange("popEnd", e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Contract</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DynamicIcon name="circle-check" className="h-5 w-5" />
            Contract Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          {contracts.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No contracts found. Create your first contract to get started.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract Name</TableHead>
                  <TableHead>Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>POP Start</TableHead>
                  <TableHead>POP End</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">
                      {contract.name}
                    </TableCell>
                    <TableCell>{contract.contractNumber}</TableCell>
                    <TableCell>{contract.customer}</TableCell>
                    <TableCell>
                      {new Date(contract.popStart).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(contract.popEnd).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          contract.status === "active"
                            ? "bg-green-100 text-green-800"
                            : contract.status === "pre-award"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {contract.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ActiveContractsPage;
