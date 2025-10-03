"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import { apiClient } from "@captify-io/core";
import type { Contract } from "../../../types";

interface ContractDialogProps {
  open: boolean;
  onClose: () => void;
  contract?: Contract;
  onSuccess: () => void;
}

export function ContractDialog({
  open,
  onClose,
  contract,
  onSuccess,
}: ContractDialogProps) {
  const isEditing = !!contract;

  const [formData, setFormData] = useState({
    contractNumber: contract?.contractNumber || "",
    name: contract?.name || "",
    customer: contract?.customer || "",
  });

  const [customers, setCustomers] = useState<string[]>([]);
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingCustomers, setLoadingCustomers] = useState(false);

  // Load existing customers
  React.useEffect(() => {
    const loadCustomers = async () => {
      setLoadingCustomers(true);
      try {
        const response = await apiClient.run({
          service: "platform.dynamodb",
          operation: "scan",
          table: "pmbook-Customer",
          data: {},
        });
        const items = (response as any).Items || [];
        setCustomers(items.map((c: any) => c.name));
      } catch (error) {
        console.error("Failed to load customers:", error);
      } finally {
        setLoadingCustomers(false);
      }
    };
    if (open) {
      loadCustomers();
    }
  }, [open]);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      // If adding new customer, create it first
      if (showNewCustomer && newCustomerName.trim()) {
        const customerData = {
          id: `customer-${Date.now()}`,
          slug: newCustomerName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          tenantId: "default",
          name: newCustomerName,
          app: "pmbook",
          order: "0",
          fields: {},
          description: "",
          ownerId: "current-user",
          createdBy: "current-user",
          updatedBy: "current-user",
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await apiClient.run({
          service: "platform.dynamodb",
          operation: "put",
          table: "pmbook-Customer",
          data: { Item: customerData },
        });
      }

      const customerName = showNewCustomer ? newCustomerName : formData.customer;

      const contractData: Contract = {
        id: contract?.id || `contract-${Date.now()}`,
        slug: contract?.slug || formData.contractNumber.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        tenantId: contract?.tenantId || "default",
        name: formData.name,
        app: contract?.app || "pmbook",
        order: contract?.order || "0",
        fields: contract?.fields || {},
        description: contract?.description || "",
        ownerId: contract?.ownerId || "current-user",
        createdBy: contract?.createdBy || "current-user",
        updatedBy: "current-user",
        contractNumber: formData.contractNumber,
        type: contract?.type || "IDIQ",
        customer: customerName,
        totalValue: contract?.totalValue || 0,
        fundedValue: contract?.fundedValue || 0,
        burnedValue: contract?.burnedValue || 0,
        remainingValue: contract?.remainingValue || 0,
        monthlyBurnRate: contract?.monthlyBurnRate || 0,
        avgMonthlyBurn: contract?.avgMonthlyBurn || 0,
        awardAmount: contract?.awardAmount || 0,
        awardDate: contract?.awardDate || "",
        startDate: contract?.startDate || "",
        endDate: contract?.endDate || "",
        popStart: contract?.popStart || "",
        popEnd: contract?.popEnd || "",
        programManager: contract?.programManager || "",
        teams: contract?.teams || [],
        laborCategories: contract?.laborCategories || [],
        indirectRate: contract?.indirectRate || 0,
        status: contract?.status || "active",
        healthScore: contract?.healthScore || 100,
        risks: contract?.risks || [],
        cdrls: contract?.cdrls || [],
        milestones: contract?.milestones || [],
        budgetedCosts: contract?.budgetedCosts || {
          direct: 0,
          indirect: 0,
          materials: 0,
          subcontracts: 0,
          profit: 0,
          total: 0,
        },
        expendedCosts: contract?.expendedCosts || {
          direct: 0,
          indirect: 0,
          materials: 0,
          subcontracts: 0,
          profit: 0,
          total: 0,
        },
        createdAt: contract?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await apiClient.run({
        service: "platform.dynamodb",
        operation: "put",
        table: "pmbook-Contract",
        data: { Item: contractData },
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save contract:", error);
    } finally {
      setSaving(false);
    }
  };

  const canSubmit =
    formData.contractNumber.trim() &&
    formData.name.trim() &&
    (showNewCustomer ? newCustomerName.trim() : formData.customer.trim());

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Contract" : "Create New Contract"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="contractNumber">Contract Number *</Label>
            <Input
              id="contractNumber"
              value={formData.contractNumber}
              onChange={(e) =>
                setFormData({ ...formData, contractNumber: e.target.value })
              }
              placeholder="e.g., GS-00F-0001A"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="name">Contract Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., IT Modernization Services"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Customer *</Label>
            {showNewCustomer ? (
              <div className="flex gap-2 mt-1">
                <Input
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowNewCustomer(false);
                    setNewCustomerName("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex gap-2 mt-1">
                <Select
                  value={formData.customer}
                  onValueChange={(value) => setFormData({ ...formData, customer: value })}
                  disabled={loadingCustomers}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder={loadingCustomers ? "Loading..." : "Select customer"} />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer} value={customer}>
                        {customer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNewCustomer(true)}
                >
                  <DynamicIcon name="plus" className="h-4 w-4 mr-1" />
                  New
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmit || saving}>
            {saving ? (
              <>
                <DynamicIcon name="loader-2" className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <DynamicIcon name="check" className="h-4 w-4 mr-2" />
                {isEditing ? "Update Contract" : "Create Contract"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
