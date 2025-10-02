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
  Badge,
} from "@captify-io/platform/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import { apiClient } from "@captify-io/platform/lib/api";
import { config } from "../../config";
import type { Objective, Outcome } from "../../types";

interface OutcomeWizardProps {
  open: boolean;
  onClose: () => void;
  objective: Objective;
  userRole: "pm" | "tech-lead" | "team-member";
  currentUser: string;
  onSuccess: () => void;
}

/**
 * OUTCOME CREATION WIZARD
 *
 * Two-step approval process:
 * 1. Tech Lead proposes outcome (or PM creates directly)
 * 2. PM approves before tasks can be created
 *
 * Fields:
 * - Title & description
 * - Success criteria (what "done" looks like)
 * - Target date
 * - Budget allocation (from objective)
 * - Team assignment
 */

export function OutcomeWizard({
  open,
  onClose,
  objective,
  userRole,
  currentUser,
  onSuccess,
}: OutcomeWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    successCriteria: "",
    targetDate: "",
    allocatedBudget: 0,
    ownerTeam: "",
    teamLead: currentUser,
    deliverables: [] as string[],
    newDeliverable: "",
  });

  const [saving, setSaving] = useState(false);

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const addDeliverable = () => {
    if (formData.newDeliverable.trim()) {
      setFormData({
        ...formData,
        deliverables: [...formData.deliverables, formData.newDeliverable.trim()],
        newDeliverable: "",
      });
    }
  };

  const removeDeliverable = (index: number) => {
    setFormData({
      ...formData,
      deliverables: formData.deliverables.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const outcomeData = {
        id: `outcome-${Date.now()}`,
        objectiveId: objective.id,
        contractId: objective.contractId,
        title: formData.title,
        description: formData.description,
        successCriteria: formData.successCriteria,
        targetDate: formData.targetDate,
        allocatedBudget: formData.allocatedBudget,
        burnedBudget: 0,
        ownerTeam: formData.ownerTeam,
        teamLead: formData.teamLead,
        status: userRole === "pm" ? "in-progress" : "pending-approval", // PM can approve immediately
        percentComplete: 0,
        deliverables: formData.deliverables,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await apiClient.run({
        service: "platform.dynamodb",
        operation: "put",
        table: "pmbook-Outcome",
        data: { Item: outcomeData },
      });

      // Update objective allocated budget
      await apiClient.run({
        service: "platform.dynamodb",
        operation: "update",
        table: "pmbook-Objective",
        data: {
          Key: { id: objective.id },
          UpdateExpression:
            "SET allocatedBudget = allocatedBudget + :amount, remainingBudget = remainingBudget - :amount, updatedAt = :now",
          ExpressionAttributeValues: {
            ":amount": formData.allocatedBudget,
            ":now": new Date().toISOString(),
          },
        },
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to create outcome:", error);
    } finally {
      setSaving(false);
    }
  };

  const budgetRemaining = objective.totalBudget - objective.allocatedBudget;
  const canAffordBudget = formData.allocatedBudget <= budgetRemaining;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {userRole === "pm" ? "Create" : "Propose"} New Outcome
          </DialogTitle>
          <div className="mt-2">
            <p className="text-sm text-muted-foreground">
              For objective: <span className="font-medium">{objective.title}</span>
            </p>
            {userRole === "tech-lead" && (
              <Badge variant="outline" className="mt-2">
                <DynamicIcon name="clock" className="h-3 w-3 mr-1" />
                Requires PM approval
              </Badge>
            )}
          </div>
          <div className="mt-4">
            <Progress value={(step / 2) * 100} />
            <p className="text-sm text-muted-foreground mt-2">Step {step} of 2</p>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Step 1: What are we delivering? */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Outcome Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Deploy API Gateway to Production"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Clear, measurable deliverable
                </p>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="What will be delivered and why it matters"
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="successCriteria">Success Criteria *</Label>
                <Textarea
                  id="successCriteria"
                  value={formData.successCriteria}
                  onChange={(e) =>
                    setFormData({ ...formData, successCriteria: e.target.value })
                  }
                  placeholder="How do we know this is done? e.g., 'API responds to all endpoints with <100ms latency, 99.9% uptime'"
                  className="mt-1"
                  rows={2}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Specific, measurable criteria for completion
                </p>
              </div>

              <div>
                <Label>Deliverables Checklist</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={formData.newDeliverable}
                    onChange={(e) =>
                      setFormData({ ...formData, newDeliverable: e.target.value })
                    }
                    placeholder="Add a deliverable..."
                    onKeyPress={(e) => e.key === "Enter" && addDeliverable()}
                  />
                  <Button onClick={addDeliverable} size="sm" variant="outline">
                    <DynamicIcon name="plus" className="h-4 w-4" />
                  </Button>
                </div>

                {formData.deliverables.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {formData.deliverables.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm p-2 bg-muted rounded"
                      >
                        <DynamicIcon name="check-square" className="h-4 w-4 text-muted-foreground" />
                        <span className="flex-1">{item}</span>
                        <Button
                          onClick={() => removeDeliverable(i)}
                          size="sm"
                          variant="ghost"
                        >
                          <DynamicIcon name="x" className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Team & Budget */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ownerTeam">Owner Team *</Label>
                  <Select
                    value={formData.ownerTeam}
                    onValueChange={(value) =>
                      setFormData({ ...formData, ownerTeam: value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select team" />
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

                <div>
                  <Label htmlFor="targetDate">Target Delivery Date</Label>
                  <Input
                    id="targetDate"
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) =>
                      setFormData({ ...formData, targetDate: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="budget">Budget Allocation *</Label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm">$</span>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.allocatedBudget || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        allocatedBudget: parseFloat(e.target.value) || 0,
                      })
                    }
                    className={!canAffordBudget ? "border-red-500" : ""}
                    placeholder="0"
                  />
                </div>

                <div className="mt-2 p-3 bg-muted rounded-md space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Objective Total:</span>
                    <span className="font-medium">
                      ${objective.totalBudget.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Already Allocated:</span>
                    <span className="font-medium">
                      ${objective.allocatedBudget.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-1">
                    <span className="font-medium">Remaining:</span>
                    <span className={`font-medium ${!canAffordBudget ? "text-red-600" : "text-green-600"}`}>
                      ${budgetRemaining.toLocaleString()}
                    </span>
                  </div>
                </div>

                {!canAffordBudget && (
                  <p className="text-xs text-red-600 mt-2">
                    Budget exceeds available funds by $
                    {(formData.allocatedBudget - budgetRemaining).toLocaleString()}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="teamLead">Team Lead</Label>
                <Input
                  id="teamLead"
                  value={formData.teamLead}
                  onChange={(e) =>
                    setFormData({ ...formData, teamLead: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={step === 1 ? onClose : handleBack}>
            {step === 1 ? "Cancel" : "Back"}
          </Button>

          {step < 2 ? (
            <Button
              onClick={handleNext}
              disabled={!formData.title || !formData.successCriteria}
            >
              Next
              <DynamicIcon name="arrow-right" className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={
                !formData.ownerTeam ||
                !canAffordBudget ||
                formData.allocatedBudget === 0 ||
                saving
              }
            >
              {saving ? (
                <>
                  <DynamicIcon name="loader-2" className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <DynamicIcon name="check" className="h-4 w-4 mr-2" />
                  {userRole === "pm" ? "Create Outcome" : "Submit for Approval"}
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
