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
  Progress,
} from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import type { CLIN, Objective } from "../../types";

/**
 * OBJECTIVE CREATION WIZARD
 *
 * 3-step process:
 * 1. Basic Info (title, description, owner)
 * 2. Budget Allocation (select CLINs, allocate amounts)
 * 3. Review & Create
 *
 * Smart features:
 * - Auto-suggests budget split across CLINs
 * - Validates total doesn't exceed available
 * - Shows real-time budget impact
 */

interface ObjectiveWizardProps {
  open: boolean;
  onClose: () => void;
  contractId: string;
  clins: CLIN[];
  onSuccess: () => void;
}

export function ObjectiveWizard({
  open,
  onClose,
  contractId,
  clins,
  onSuccess,
}: ObjectiveWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    owner: "",
    functionalArea: "",
    priority: "medium" as "critical" | "high" | "medium" | "low",
    allocations: {} as Record<string, number>,
  });

  // Calculate available budget per CLIN
  const availableBudget = clins.reduce((acc, clin) => {
    acc[clin.id] = clin.fundedValue - clin.obligatedValue;
    return acc;
  }, {} as Record<string, number>);

  const totalAllocated = Object.values(formData.allocations).reduce(
    (sum, val) => sum + val,
    0
  );

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    // Create objective and allocations
    console.log("Creating objective:", formData);
    // TODO: API call
    onSuccess();
    onClose();
  };

  const updateAllocation = (clinId: string, amount: number) => {
    setFormData({
      ...formData,
      allocations: {
        ...formData.allocations,
        [clinId]: amount,
      },
    });
  };

  // Auto-suggest budget split (equal distribution or weighted by CLIN size)
  const suggestBudget = (totalNeeded: number) => {
    const activeCLINs = clins.filter(
      (c) => c.status === "active" && availableBudget[c.id] > 0
    );
    const split = totalNeeded / activeCLINs.length;

    const suggested = activeCLINs.reduce((acc, clin) => {
      acc[clin.id] = Math.min(split, availableBudget[clin.id]);
      return acc;
    }, {} as Record<string, number>);

    setFormData({ ...formData, allocations: suggested });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Objective</DialogTitle>
          <div className="mt-4">
            <Progress value={(step / 3) * 100} />
            <p className="text-sm text-muted-foreground mt-2">
              Step {step} of 3
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Objective Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Modernize Data Platform"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Brief, clear goal from SOW
                </p>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="What are we trying to achieve and why?"
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
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
                    onValueChange={(value: string) =>
                      setFormData({ ...formData, functionalArea: value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                      <SelectItem value="DataOps">DataOps</SelectItem>
                      <SelectItem value="CloudOps">CloudOps</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Platform">Platform</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: any) =>
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
            </div>
          )}

          {/* Step 2: Budget Allocation */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Allocate Budget from CLINs</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => suggestBudget(500000)}
                >
                  <DynamicIcon name="wand-2" className="h-4 w-4 mr-2" />
                  Auto-Suggest
                </Button>
              </div>

              <div className="space-y-3">
                {clins
                  .filter((c) => c.status === "active")
                  .map((clin) => (
                    <div
                      key={clin.id}
                      className="border rounded-lg p-4 space-y-2"
                    >
                      <div className="flex justify-between">
                        <div>
                          <span className="font-mono font-semibold">
                            {clin.clinNumber}
                          </span>
                          <span className="text-sm text-muted-foreground ml-2">
                            {clin.title}
                          </span>
                        </div>
                        <div className="text-right text-sm">
                          <div className="text-muted-foreground">
                            Available: ${availableBudget[clin.id]?.toLocaleString() || 0}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Allocate:</Label>
                        <Input
                          type="number"
                          value={formData.allocations[clin.id] || 0}
                          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                            updateAllocation(
                              clin.id,
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-40"
                        />
                        <Progress
                          value={
                            ((formData.allocations[clin.id] || 0) /
                              availableBudget[clin.id]) *
                            100
                          }
                          className="flex-1"
                        />
                      </div>

                      {formData.allocations[clin.id] >
                        availableBudget[clin.id] && (
                        <p className="text-xs text-red-600">
                          Exceeds available budget!
                        </p>
                      )}
                    </div>
                  ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Allocated:</span>
                  <span>${totalAllocated.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Review & Confirm</h3>

              <div className="space-y-3">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">{formData.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.description}
                  </p>
                  <div className="flex gap-4 mt-3 text-sm">
                    <span>Owner: {formData.owner}</span>
                    <span>Area: {formData.functionalArea}</span>
                    <span>Priority: {formData.priority}</span>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Budget Allocation</h4>
                  {Object.entries(formData.allocations)
                    .filter(([_, amount]) => amount > 0)
                    .map(([clinId, amount]) => {
                      const clin = clins.find((c) => c.id === clinId);
                      return (
                        <div
                          key={clinId}
                          className="flex justify-between text-sm py-1"
                        >
                          <span>
                            {clin?.clinNumber} - {clin?.title}
                          </span>
                          <span className="font-medium">
                            ${amount.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${totalAllocated.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={step === 1 ? onClose : handleBack}>
            {step === 1 ? "Cancel" : "Back"}
          </Button>

          {step < 3 ? (
            <Button
              onClick={handleNext}
              disabled={
                step === 1
                  ? !formData.title || !formData.owner
                  : totalAllocated === 0
              }
            >
              Next
              <DynamicIcon name="arrow-right" className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              <DynamicIcon name="check" className="h-4 w-4 mr-2" />
              Create Objective
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
