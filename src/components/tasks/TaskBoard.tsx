"use client";

import React, { useState } from "react";
import { Card, CardContent, Badge, Button, Input } from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import { apiClient } from "@captify-io/core";
import type { CLINTask, Outcome } from "../../types";

interface TaskBoardProps {
  outcome: Outcome;
  tasks: CLINTask[];
  onRefresh: () => void;
}

const COLUMNS = [
  { id: "backlog", label: "Backlog", icon: "inbox" },
  { id: "ready", label: "Ready", icon: "circle-dot" },
  { id: "in-progress", label: "In Progress", icon: "play-circle" },
  { id: "review", label: "Review", icon: "eye" },
  { id: "done", label: "Done", icon: "check-circle" },
];

/**
 * TASK BOARD - Kanban view
 *
 * Simple drag-and-drop task board:
 * - Columns for each status
 * - Quick add task
 * - Update status by moving cards
 * - Color-coded by priority
 */

export function TaskBoard({ outcome, tasks, onRefresh }: TaskBoardProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const tasksByStatus = COLUMNS.reduce((acc, col) => {
    acc[col.id] = tasks.filter((t) => t.status === col.id);
    return acc;
  }, {} as Record<string, CLINTask[]>);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
      await apiClient.run({
        service: "platform.dynamodb",
        operation: "put",
        table: "pmbook-Task",
        data: {
          Item: {
            id: `task-${Date.now()}`,
            outcomeId: outcome.id,
            title: newTaskTitle,
            status: "backlog",
            priority: "normal",
            functionalArea: outcome.ownerTeam,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        },
      });

      setNewTaskTitle("");
      setIsAddingTask(false);
      onRefresh();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      await apiClient.run({
        service: "platform.dynamodb",
        operation: "update",
        table: "pmbook-Task",
        data: {
          Key: { id: taskId },
          UpdateExpression: "SET #status = :status, updatedAt = :now",
          ExpressionAttributeNames: { "#status": "status" },
          ExpressionAttributeValues: {
            ":status": newStatus,
            ":now": new Date().toISOString(),
          },
        },
      });

      onRefresh();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{outcome.title}</h3>
          <p className="text-sm text-muted-foreground">{outcome.ownerTeam} Team</p>
        </div>
        <Button
          onClick={() => setIsAddingTask(true)}
          size="sm"
        >
          <DynamicIcon name="plus" className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Quick Add Task */}
      {isAddingTask && (
        <Card className="border-primary">
          <CardContent className="pt-4">
            <div className="flex gap-2">
              <Input
                placeholder="Task title..."
                value={newTaskTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => e.key === "Enter" && handleAddTask()}
                autoFocus
              />
              <Button onClick={handleAddTask} size="sm">
                Add
              </Button>
              <Button
                onClick={() => {
                  setIsAddingTask(false);
                  setNewTaskTitle("");
                }}
                size="sm"
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Kanban Board */}
      <div className="grid grid-cols-5 gap-4">
        {COLUMNS.map((column) => (
          <div key={column.id} className="space-y-3">
            {/* Column Header */}
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md">
              <DynamicIcon name={column.icon as any} className="h-4 w-4" />
              <span className="font-medium text-sm">{column.label}</span>
              <Badge variant="outline" className="ml-auto">
                {tasksByStatus[column.id]?.length || 0}
              </Badge>
            </div>

            {/* Tasks */}
            <div className="space-y-2 min-h-[200px]">
              {tasksByStatus[column.id]?.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={(newStatus) => updateTaskStatus(task.id, newStatus)}
                />
              ))}

              {tasksByStatus[column.id]?.length === 0 && (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  No tasks
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Task Card Component
function TaskCard({
  task,
  onStatusChange,
}: {
  task: CLINTask;
  onStatusChange: (status: string) => void;
}) {
  const [showActions, setShowActions] = useState(false);

  const getPriorityColor = () => {
    switch (task.priority) {
      case "urgent":
        return "border-red-500";
      case "high":
        return "border-orange-500";
      case "normal":
        return "border-blue-500";
      case "low":
        return "border-gray-500";
      default:
        return "";
    }
  };

  return (
    <Card
      className={`cursor-pointer hover:shadow-md transition-all ${getPriorityColor()} border-l-4`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <CardContent className="p-3">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium line-clamp-2">{task.title}</p>
            {task.priority !== "normal" && (
              <Badge
                variant={task.priority === "urgent" ? "destructive" : "outline"}
                className="text-xs shrink-0"
              >
                {task.priority}
              </Badge>
            )}
          </div>

          {task.assignedTo && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <DynamicIcon name="user" className="h-3 w-3" />
              <span>{task.assignedTo}</span>
            </div>
          )}

          {task.estimatedHours && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <DynamicIcon name="clock" className="h-3 w-3" />
              <span>{task.estimatedHours}h</span>
            </div>
          )}

          {/* Quick Actions */}
          {showActions && (
            <div className="flex gap-1 pt-2 border-t">
              {task.status !== "backlog" && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs"
                  onClick={() => {
                    const currentIndex = COLUMNS.findIndex(
                      (c) => c.id === task.status
                    );
                    if (currentIndex > 0) {
                      onStatusChange(COLUMNS[currentIndex - 1].id);
                    }
                  }}
                >
                  <DynamicIcon name="arrow-left" className="h-3 w-3" />
                </Button>
              )}

              {task.status !== "done" && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs"
                  onClick={() => {
                    const currentIndex = COLUMNS.findIndex(
                      (c) => c.id === task.status
                    );
                    if (currentIndex < COLUMNS.length - 1) {
                      onStatusChange(COLUMNS[currentIndex + 1].id);
                    }
                  }}
                >
                  <DynamicIcon name="arrow-right" className="h-3 w-3" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
