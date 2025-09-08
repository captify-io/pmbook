"use client";

import React, { useState } from "react";
import { useCaptify } from "@captify/core/hooks";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Progress,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@captify/core/ui";
import {
  Target,
  GitBranch,
  Users,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Layers,
  Activity,
} from "lucide-react";

export function RoadmapsPage() {
  const { session } = useCaptify();
  const [selectedView, setSelectedView] = useState("timeline");

  // Mock data for demonstration
  const roadmapData = {
    objectives: [
      {
        id: "1",
        title: "Modernize Data Infrastructure",
        quarter: "Q1 2024",
        progress: 65,
        status: "in-progress",
        keyResults: [
          { metric: "Data Pipeline Efficiency", current: 75, target: 95 },
          { metric: "Processing Time Reduction", current: 40, target: 60 },
        ],
      },
      {
        id: "2",
        title: "Enhance Customer Analytics",
        quarter: "Q2 2024",
        progress: 30,
        status: "planned",
        keyResults: [
          { metric: "Dashboard Adoption", current: 20, target: 80 },
          { metric: "Report Automation", current: 25, target: 90 },
        ],
      },
    ],
    initiatives: [
      {
        id: "1",
        title: "Cloud Migration Phase 2",
        status: "active",
        progress: 45,
        workStreams: ["DevOps", "DataOps", "Security"],
        startDate: "2024-01-15",
        endDate: "2024-06-30",
        healthScore: 85,
      },
      {
        id: "2",
        title: "AI/ML Platform Implementation",
        status: "active",
        progress: 20,
        workStreams: ["AIops", "Engineering", "DataOps"],
        startDate: "2024-02-01",
        endDate: "2024-09-30",
        healthScore: 75,
      },
    ],
    workStreams: [
      {
        id: "dataops",
        name: "DataOps",
        lead: "Sarah Chen",
        capacity: 160,
        utilization: 85,
        activeInitiatives: 3,
      },
      {
        id: "devops",
        name: "DevOps",
        lead: "Mike Johnson",
        capacity: 120,
        utilization: 90,
        activeInitiatives: 2,
      },
      {
        id: "aiops",
        name: "AIops",
        lead: "Dr. Emily Watson",
        capacity: 80,
        utilization: 70,
        activeInitiatives: 2,
      },
      {
        id: "engineering",
        name: "Engineering",
        lead: "Tom Rodriguez",
        capacity: 200,
        utilization: 80,
        activeInitiatives: 4,
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Strategic Roadmaps</h1>
        <p className="text-muted-foreground">
          Align contract goals with work stream execution
        </p>
      </div>

      <Tabs value={selectedView} onValueChange={setSelectedView}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="objectives">Objectives</TabsTrigger>
          <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
          <TabsTrigger value="workstreams">Work Streams</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Strategic Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Quarter Headers */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center font-medium">Q1 2024</div>
                  <div className="text-center font-medium">Q2 2024</div>
                  <div className="text-center font-medium">Q3 2024</div>
                  <div className="text-center font-medium">Q4 2024</div>
                </div>

                {/* Initiative Timeline Bars */}
                {roadmapData.initiatives.map((initiative) => (
                  <div key={initiative.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{initiative.title}</p>
                        <div className="flex gap-2 mt-1">
                          {initiative.workStreams.map((ws) => (
                            <Badge key={ws} variant="outline" className="text-xs">
                              {ws}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge
                        variant={
                          initiative.healthScore > 80 ? "default" : "destructive"
                        }
                      >
                        {initiative.progress}%
                      </Badge>
                    </div>
                    <Progress value={initiative.progress} className="h-6" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="objectives" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roadmapData.objectives.map((objective) => (
              <Card key={objective.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {objective.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {objective.quarter}
                      </p>
                    </div>
                    <Badge
                      variant={
                        objective.status === "in-progress"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {objective.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Progress</span>
                      <span>{objective.progress}%</span>
                    </div>
                    <Progress value={objective.progress} />
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium">Key Results</p>
                    {objective.keyResults.map((kr, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{kr.metric}</span>
                          <span>
                            {kr.current}/{kr.target}
                          </span>
                        </div>
                        <Progress
                          value={(kr.current / kr.target) * 100}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="initiatives" className="space-y-4">
          <div className="space-y-4">
            {roadmapData.initiatives.map((initiative) => (
              <Card key={initiative.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {initiative.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {initiative.startDate} - {initiative.endDate}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        variant={
                          initiative.healthScore > 80
                            ? "default"
                            : initiative.healthScore > 60
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        Health: {initiative.healthScore}
                      </Badge>
                      <Badge variant="outline">{initiative.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{initiative.progress}%</span>
                    </div>
                    <Progress value={initiative.progress} />
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">
                      Assigned Work Streams
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {initiative.workStreams.map((ws) => (
                        <div
                          key={ws}
                          className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted"
                        >
                          <Users className="h-3 w-3" />
                          <span className="text-sm">{ws}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="text-center">
                      <GitBranch className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Epics</p>
                      <p className="text-sm font-medium">8</p>
                    </div>
                    <div className="text-center">
                      <Activity className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Features</p>
                      <p className="text-sm font-medium">24</p>
                    </div>
                    <div className="text-center">
                      <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Days Left</p>
                      <p className="text-sm font-medium">
                        {Math.floor(
                          (new Date(initiative.endDate).getTime() - Date.now()) /
                            (1000 * 60 * 60 * 24)
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workstreams" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roadmapData.workStreams.map((ws) => (
              <Card key={ws.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{ws.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">Lead: {ws.lead}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Capacity</span>
                      <span>{ws.capacity} hrs/wk</span>
                    </div>
                    <Progress value={ws.utilization} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {ws.utilization}% utilized
                    </p>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Active Initiatives
                      </span>
                      <Badge variant="secondary">{ws.activeInitiatives}</Badge>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    View Service Catalog
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Work Stream Alignment Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Work Stream</th>
                      <th className="text-center p-2">Contract 1</th>
                      <th className="text-center p-2">Contract 2</th>
                      <th className="text-center p-2">Contract 3</th>
                      <th className="text-center p-2">Total %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roadmapData.workStreams.map((ws) => (
                      <tr key={ws.id} className="border-b">
                        <td className="p-2 font-medium">{ws.name}</td>
                        <td className="text-center p-2">30%</td>
                        <td className="text-center p-2">45%</td>
                        <td className="text-center p-2">25%</td>
                        <td className="text-center p-2">
                          <Badge variant="outline">100%</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default RoadmapsPage;