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
  Badge,
} from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import { apiClient } from "@captify-io/core";
import { config } from "../../../config";
import type { CLINObjective, CLIN } from "../../../types";

interface ObjectiveDialogProps {
  open: boolean;
  onClose: () => void;
  contractId: string;
  availableCLINs: CLIN[];
  objective?: CLINObjective; // If editing
  onSuccess: () => void;
}

export function ObjectiveDialog({
  open,
  onClose,
  contractId,
  availableCLINs,
  objective,
  onSuccess,
}: ObjectiveDialogProps) {
  const isEditing = !!objective;

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    clinIds: string[];
    owner: string;
    functionalArea: string;
    priority: "critical" | "high" | "medium" | "low";
    status: "planning" | "active" | "complete" | "on-hold";
  }>({
    title: objective?.title || "",
    description: objective?.description || "",
    clinIds: objective?.clinIds || [],
    owner: objective?.owner || "",
    functionalArea: objective?.functionalArea || "",
    priority: objective?.priority || "medium",
    status: objective?.status || "planning",
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      // Calculate total budget from selected CLINs
      const totalBudget = formData.clinIds.reduce((sum, clinId) => {
        const clin = availableCLINs.find((c) => c.id === clinId);
        return sum + (clin ? clin.fundedValue - clin.obligatedValue : 0);
      }, 0);

      const objectiveData: CLINObjective = {
        id: objective?.id || `objective-${Date.now()}`,
        contractId,
        clinIds: formData.clinIds,
        title: formData.title,
        description: formData.description,
        totalBudget,
        allocatedBudget: objective?.allocatedBudget || 0,
        remainingBudget: totalBudget - (objective?.allocatedBudget || 0),
        owner: formData.owner,
        functionalArea: formData.functionalArea || undefined,
        status: formData.status as "planning" | "active" | "complete" | "on-hold",
        priority: formData.priority as "critical" | "high" | "medium" | "low",
        createdAt: objective?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await apiClient.run({
        service: "platform.dynamodb",
        operation: "put",
        table: "pmbook-Objective",
        data: { Item: objectiveData },
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save objective:", error);
    } finally {
      setSaving(false);
    }
  };

  const canSubmit =
    formData.title.trim() &&
    formData.clinIds.length > 0 &&
    formData.owner.trim();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Objective" : "Create New Objective"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="title">Objective Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Modernize API Infrastructure"
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
              placeholder="What is this objective trying to achieve?"
              className="mt-1"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="owner">Owner *</Label>
              <Input
                id="owner"
                value={formData.owner}
                onChange={(e) =>
                  setFormData({ ...formData, owner: e.target.value })
                }
                placeholder="PM or Tech Lead"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="functionalArea">Functional Area</Label>
              <Select
                value={formData.functionalArea}
                onValueChange={(value) =>
                  setFormData({ ...formData, functionalArea: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  {config.functionalAreas.map((area) => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: "critical" | "high" | "medium" | "low") =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "planning" | "active" | "complete" | "on-hold") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="complete">Complete</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Associated CLINs *</Label>
            <div className="mt-2 space-y-2">
              {availableCLINs.map((clin) => {
                const isSelected = formData.clinIds.includes(clin.id);
                const available = clin.fundedValue - clin.obligatedValue;

                return (
                  <div
                    key={clin.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => {
                      const newClinIds = isSelected
                        ? formData.clinIds.filter((id) => id !== clin.id)
                        : [...formData.clinIds, clin.id];
                      setFormData({ ...formData, clinIds: newClinIds });
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold">
                            CLIN {clin.clinNumber}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {clin.type}
                          </Badge>
                        </div>
                        <p className="text-sm mt-1">{clin.title}</p>
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          <span>
                            Available: ${(available / 1000).toFixed(0)}K
                          </span>
                          <span>
                            Funded: ${(clin.fundedValue / 1000).toFixed(0)}K
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <DynamicIcon
                          name="check-circle"
                          className="h-5 w-5 text-blue-500"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
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
                {isEditing ? "Update Objective" : "Create Objective"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
