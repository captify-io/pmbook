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
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import { apiClient } from "@captify-io/core";
import type { CLIN } from "../../../types";

interface CLINDialogProps {
  open: boolean;
  onClose: () => void;
  contractId: string;
  taskOrderId?: string;
  clin?: CLIN;
  onSuccess: () => void;
}

export function CLINDialog({
  open,
  onClose,
  contractId,
  taskOrderId,
  clin,
  onSuccess,
}: CLINDialogProps) {
  const isEditing = !!clin;

  const [formData, setFormData] = useState({
    clinNumber: clin?.clinNumber || "",
    title: clin?.title || "",
    description: clin?.description || "",
    type: clin?.type || "FFP" as "FFP" | "T&M" | "CPFF" | "CPIF" | "FPIF",
    totalValue: clin?.totalValue || 0,
    fundedValue: clin?.fundedValue || 0,
    periodStart: clin?.periodStart || "",
    periodEnd: clin?.periodEnd || "",
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const clinData: CLIN = {
        id: clin?.id || `clin-${Date.now()}`,
        contractId,
        taskOrderId: taskOrderId,
        clinNumber: formData.clinNumber,
        title: formData.title,
        description: formData.description,
        type: formData.type,
        totalValue: formData.totalValue,
        fundedValue: formData.fundedValue,
        obligatedValue: clin?.obligatedValue || 0,
        burnedValue: clin?.burnedValue || 0,
        periodStart: formData.periodStart,
        periodEnd: formData.periodEnd,
        status: clin?.status || "active",
        createdAt: clin?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "current-user",
      };

      await apiClient.run({
        service: "platform.dynamodb",
        operation: "put",
        table: "pmbook-CLIN",
        data: { Item: clinData },
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save CLIN:", error);
    } finally {
      setSaving(false);
    }
  };

  const canSubmit =
    formData.clinNumber.trim() &&
    formData.title.trim() &&
    formData.totalValue > 0 &&
    formData.fundedValue > 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit CLIN" : "Create New CLIN"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clinNumber">CLIN Number *</Label>
              <Input
                id="clinNumber"
                value={formData.clinNumber}
                onChange={(e) =>
                  setFormData({ ...formData, clinNumber: e.target.value })
                }
                placeholder="e.g., 0001"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "FFP" | "T&M" | "CPFF" | "CPIF" | "FPIF") =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FFP">Firm Fixed Price</SelectItem>
                  <SelectItem value="T&M">Time & Materials</SelectItem>
                  <SelectItem value="CPFF">Cost Plus Fixed Fee</SelectItem>
                  <SelectItem value="CPIF">Cost Plus Incentive Fee</SelectItem>
                  <SelectItem value="FPIF">Fixed Price Incentive Fee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="title">CLIN Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Base Year Services"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Brief description of CLIN scope"
              className="mt-1"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalValue">Total Value *</Label>
              <Input
                id="totalValue"
                type="number"
                value={formData.totalValue || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalValue: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="0"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="fundedValue">Funded Value *</Label>
              <Input
                id="fundedValue"
                type="number"
                value={formData.fundedValue || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fundedValue: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="0"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="periodStart">Period Start</Label>
              <Input
                id="periodStart"
                type="date"
                value={formData.periodStart}
                onChange={(e) =>
                  setFormData({ ...formData, periodStart: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="periodEnd">Period End</Label>
              <Input
                id="periodEnd"
                type="date"
                value={formData.periodEnd}
                onChange={(e) =>
                  setFormData({ ...formData, periodEnd: e.target.value })
                }
                className="mt-1"
              />
            </div>
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
                {isEditing ? "Update CLIN" : "Create CLIN"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
