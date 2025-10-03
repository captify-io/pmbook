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
import { config } from "../../../config";
import type { CLINTask } from "../../../types";

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  outcomeId: string;
  task?: CLINTask;
  onSuccess: () => void;
}

export function TaskDialog({
  open,
  onClose,
  outcomeId,
  task,
  onSuccess,
}: TaskDialogProps) {
  const isEditing = !!task;

  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    functionalArea: task?.functionalArea || "",
    assignedTo: task?.assignedTo || "",
    estimatedHours: task?.estimatedHours || 0,
    priority: task?.priority || "normal" as "urgent" | "high" | "normal" | "low",
    status: task?.status || "backlog" as "backlog" | "ready" | "in-progress" | "review" | "done" | "blocked",
    dueDate: task?.dueDate || "",
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const taskData: CLINTask = {
        id: task?.id || `task-${Date.now()}`,
        outcomeId,
        title: formData.title,
        description: formData.description,
        functionalArea: formData.functionalArea,
        assignedTo: formData.assignedTo || undefined,
        estimatedHours: formData.estimatedHours || undefined,
        priority: formData.priority,
        status: formData.status,
        dueDate: formData.dueDate || undefined,
        createdAt: task?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await apiClient.run({
        service: "platform.dynamodb",
        operation: "put",
        table: "pmbook-Task",
        data: { Item: taskData },
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save task:", error);
    } finally {
      setSaving(false);
    }
  };

  const canSubmit =
    formData.title.trim() &&
    formData.functionalArea.trim();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Task" : "Create New Task"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Implement authentication API"
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
              placeholder="Detailed description of the task"
              className="mt-1"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="functionalArea">Functional Area *</Label>
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

            <div>
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Input
                id="assignedTo"
                value={formData.assignedTo}
                onChange={(e) =>
                  setFormData({ ...formData, assignedTo: e.target.value })
                }
                placeholder="Team member name"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: "urgent" | "high" | "normal" | "low") =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "backlog" | "ready" | "in-progress" | "review" | "done" | "blocked") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="backlog">Backlog</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="estimatedHours">Est. Hours</Label>
              <Input
                id="estimatedHours"
                type="number"
                value={formData.estimatedHours || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estimatedHours: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="0"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="mt-1"
            />
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
                {isEditing ? "Update Task" : "Create Task"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
