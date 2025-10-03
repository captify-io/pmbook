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
} from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import { apiClient } from "@captify-io/core";
import type { TaskOrder } from "../../../types";

interface TaskOrderDialogProps {
  open: boolean;
  onClose: () => void;
  contractId: string;
  taskOrder?: TaskOrder;
  onSuccess: () => void;
}

export function TaskOrderDialog({
  open,
  onClose,
  contractId,
  taskOrder,
  onSuccess,
}: TaskOrderDialogProps) {
  const isEditing = !!taskOrder;

  const [formData, setFormData] = useState({
    taskOrderNumber: taskOrder?.taskOrderNumber || "",
    name: taskOrder?.name || "",
    description: taskOrder?.description || "",
    totalValue: taskOrder?.totalValue || 0,
    fundedValue: taskOrder?.fundedValue || 0,
    popStart: taskOrder?.popStart || "",
    popEnd: taskOrder?.popEnd || "",
    // Pool percentages
    directPool: taskOrder?.pools?.direct || 0,
    indirectPool: taskOrder?.pools?.indirect || 0,
    materialsPool: taskOrder?.pools?.materials || 0,
    subcontractsPool: taskOrder?.pools?.subcontracts || 0,
    profitPool: taskOrder?.pools?.profit || 0,
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const usedValue = taskOrder?.usedValue || 0;
      const availableValue = formData.fundedValue - usedValue;

      const taskOrderData: TaskOrder = {
        id: taskOrder?.id || `to-${Date.now()}`,
        slug: taskOrder?.slug || formData.taskOrderNumber.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        tenantId: taskOrder?.tenantId || "default",
        name: formData.name,
        app: taskOrder?.app || "pmbook",
        order: taskOrder?.order || "0",
        fields: taskOrder?.fields || {},
        description: formData.description || "",
        ownerId: taskOrder?.ownerId || "current-user",
        createdBy: taskOrder?.createdBy || "current-user",
        updatedBy: "current-user",
        contractId,
        taskOrderNumber: formData.taskOrderNumber,
        totalValue: formData.totalValue,
        fundedValue: formData.fundedValue,
        usedValue,
        availableValue,
        pools: {
          direct: formData.directPool,
          indirect: formData.indirectPool,
          materials: formData.materialsPool,
          subcontracts: formData.subcontractsPool,
          profit: formData.profitPool,
        },
        popStart: formData.popStart,
        popEnd: formData.popEnd,
        status: taskOrder?.status || "active",
        createdAt: taskOrder?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await apiClient.run({
        service: "platform.dynamodb",
        operation: "put",
        table: "pmbook-TaskOrder",
        data: { Item: taskOrderData },
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save task order:", error);
    } finally {
      setSaving(false);
    }
  };

  const canSubmit =
    formData.taskOrderNumber.trim() &&
    formData.name.trim() &&
    formData.totalValue > 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Task Order" : "Create New Task Order"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="taskOrderNumber">Task Order Number *</Label>
              <Input
                id="taskOrderNumber"
                value={formData.taskOrderNumber}
                onChange={(e) =>
                  setFormData({ ...formData, taskOrderNumber: e.target.value })
                }
                placeholder="e.g., TO-001"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Cloud Migration Services"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Brief description of task order scope"
              className="mt-1"
              rows={2}
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
              <Label htmlFor="popStart">PoP Start *</Label>
              <Input
                id="popStart"
                type="date"
                value={formData.popStart}
                onChange={(e) =>
                  setFormData({ ...formData, popStart: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="popEnd">PoP End *</Label>
              <Input
                id="popEnd"
                type="date"
                value={formData.popEnd}
                onChange={(e) =>
                  setFormData({ ...formData, popEnd: e.target.value })
                }
                className="mt-1"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <Label className="text-sm font-semibold mb-3 block">Pool Percentages</Label>
            <div className="grid grid-cols-5 gap-3">
              <div>
                <Label htmlFor="directPool" className="text-xs">Direct %</Label>
                <Input
                  id="directPool"
                  type="number"
                  value={formData.directPool || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      directPool: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  className="mt-1"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <Label htmlFor="indirectPool" className="text-xs">Indirect %</Label>
                <Input
                  id="indirectPool"
                  type="number"
                  value={formData.indirectPool || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      indirectPool: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  className="mt-1"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <Label htmlFor="materialsPool" className="text-xs">Materials %</Label>
                <Input
                  id="materialsPool"
                  type="number"
                  value={formData.materialsPool || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      materialsPool: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  className="mt-1"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <Label htmlFor="subcontractsPool" className="text-xs">Subcontracts %</Label>
                <Input
                  id="subcontractsPool"
                  type="number"
                  value={formData.subcontractsPool || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subcontractsPool: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  className="mt-1"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <Label htmlFor="profitPool" className="text-xs">Profit %</Label>
                <Input
                  id="profitPool"
                  type="number"
                  value={formData.profitPool || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      profitPool: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  className="mt-1"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Total: {(formData.directPool + formData.indirectPool + formData.materialsPool + formData.subcontractsPool + formData.profitPool).toFixed(0)}%
            </p>
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
                {isEditing ? "Update Task Order" : "Create Task Order"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
