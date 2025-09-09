"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCaptify } from "@captify-io/core/components";
import { apiClient } from "@captify-io/core/lib";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Progress,
  Alert,
  AlertDescription,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@captify-io/core/ui";
import {
  FileText,
  DollarSign,
  Calendar,
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  Plus,
  Edit,
  Archive,
  MoreVertical,
  Download,
} from "lucide-react";
import { ContractForm } from "./ContractForm";

export function ContractsPage() {
  const { session } = useCaptify();
  const [contracts, setContracts] = useState<any[]>([]);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [contractDetails, setContractDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContract, setEditingContract] = useState<any>(null);
  const [filter, setFilter] = useState<"all" | "active" | "archived">("active");
  const [viewMode, setViewMode] = useState<"list" | "form">("list");

  useEffect(() => {
    loadContracts();
  }, []);

  useEffect(() => {
    if (selectedContract) {
      loadContractDetails(selectedContract.id);
    }
  }, [selectedContract]);

  const loadContracts = async () => {
    try {
      // Removed access check - all users can view contracts during development
      const response = await apiClient.run({
        service: "contract",
        operation: "getActiveContracts",
        app: "pmbook",
      });

      const data = response?.data || [];
      setContracts(data); // Use 'data' instead of 'response?.data' to ensure we always set an array
      if (data.length > 0) {
        setSelectedContract(data[0]);
      }
    } catch (error) {
      console.error("Failed to load contracts:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadContractDetails = async (contractId: string) => {
    try {
      const [burn, cdrls, milestones, profitability] = await Promise.all([
        apiClient.run({
          service: "contract",
          operation: "getContractBurn",
          data: { contractId },
          app: "pmbook",
        }),
        apiClient.run({
          service: "contract",
          operation: "getCDRLStatus",
          data: { contractId },
          app: "pmbook",
        }),
        apiClient.run({
          service: "contract",
          operation: "getMilestoneProgress",
          data: { contractId },
          app: "pmbook",
        }),
        apiClient.run({
          service: "contract",
          operation: "calculateProfitability",
          data: { contractId },
          app: "pmbook",
        }),
      ]);

      setContractDetails({ burn, cdrls, milestones, profitability });
    } catch (error) {
      console.error("Failed to load contract details:", error);
    }
  };

  const handleAddContract = () => {
    const newContract = {
      id: uuidv4(),
      type: "FFP",
      status: "pre-award",
      contractNumber: "",
      name: "",
      customer: "",
      agency: "",
      awardAmount: 0,
      awardDate: new Date().toISOString().split('T')[0],
      totalValue: 0,
      fundedValue: 0,
      burnedValue: 0,
      remainingValue: 0,
      monthlyBurnRate: 0,
      avgMonthlyBurn: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      popStart: new Date().toISOString().split('T')[0],
      popEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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
      programManager: "",
      technicalLead: "",
      contractingOfficer: "",
      contractingOfficerRep: "",
      teams: [],
      healthScore: 100,
      risks: [],
      cdrls: [],
      milestones: [],
      laborCategories: [],
      indirectRate: 0,
      proposalSubmitted: false,
    };
    setEditingContract(newContract);
    setSelectedContract(null);
    setViewMode("form");
  };

  const handleEditContract = (contract: any) => {
    setEditingContract(contract);
    setSelectedContract(null);
    setViewMode("form");
  };

  const handleArchiveContract = async (contractId: string) => {
    try {
      await apiClient.run({
        service: "contract",
        operation: "updateContract",
        data: {
          contractId,
          status: "closed",
          archivedAt: new Date().toISOString(),
        },
        app: "pmbook",
      });
      await loadContracts();
    } catch (error) {
      console.error("Failed to archive contract:", error);
    }
  };

  const handleSaveContract = async (contractData: any) => {
    try {
      if (editingContract) {
        await apiClient.run({
          service: "contract",
          operation: "updateContract",
          data: {
            ...contractData,
            contractId: editingContract.id,
          },
          app: "pmbook",
        });
      } else {
        await apiClient.run({
          service: "contract",
          operation: "createContract",
          data: contractData,
          app: "pmbook",
        });
      }
      await loadContracts();
      setViewMode("list");
      setEditingContract(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to save contract:", error);
    }
  };

  const filteredContracts = (contracts || []).filter((contract) => {
    if (filter === "all") return true;
    if (filter === "active") return contract.status !== "closed";
    if (filter === "archived") return contract.status === "closed";
    return true;
  });

  const handleCancelEdit = () => {
    setViewMode("list");
    setEditingContract(null);
    setIsFormOpen(false);
    if (contracts.length > 0) {
      setSelectedContract(contracts[0]);
    }
  };

  // Show breadcrumbs when in form mode
  const Breadcrumbs = () => (
    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
      <button
        onClick={() => {
          setViewMode("list");
          setEditingContract(null);
        }}
        className="hover:text-foreground transition-colors"
      >
        Contracts
      </button>
      <span>/</span>
      <span className="text-foreground">
        {editingContract && contracts.some(c => c.id === editingContract.id)
          ? editingContract.name || editingContract.contractNumber || "Edit Contract"
          : "New Contract"}
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">Loading...</div>
    );
  }

  // Show form view if editing/creating
  if (viewMode === "form" && editingContract) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Breadcrumbs />
        <ContractForm
          contract={editingContract}
          isOpen={true}
          onClose={handleCancelEdit}
          onSave={handleSaveContract}
        />
      </div>
    );
  }

  // Show list view
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Contract Management</h1>
          <p className="text-muted-foreground">
            Monitor contracts, deliverables, and financial performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddContract}>
            <Plus className="mr-2 h-4 w-4" />
            Add Contract
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button
          variant={filter === "active" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("active")}
        >
          Active ({(contracts || []).filter(c => c.status !== "closed").length})
        </Button>
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All ({(contracts || []).length})
        </Button>
        <Button
          variant={filter === "archived" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("archived")}
        >
          Archived ({(contracts || []).filter(c => c.status === "closed").length})
        </Button>
      </div>

      {/* Contract Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filteredContracts.map((contract) => (
          <Button
            key={contract.id}
            variant={
              selectedContract?.id === contract.id ? "default" : "outline"
            }
            onClick={() => setSelectedContract(contract)}
            className="flex-shrink-0"
          >
            <div className="text-left">
              <div className="font-medium">{contract.contractNumber}</div>
              <div className="text-xs text-muted-foreground">
                ${(contract.totalValue / 1000000).toFixed(1)}M
              </div>
            </div>
          </Button>
        ))}
      </div>

      {selectedContract && (
        <>
          {/* Contract Overview with Actions */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              {selectedContract.name || selectedContract.contractNumber}
            </h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEditContract(selectedContract)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Contract
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleArchiveContract(selectedContract.id)}>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive Contract
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${(selectedContract.totalValue / 1000000).toFixed(1)}M
                </div>
                <Progress
                  value={
                    (selectedContract.burnedValue /
                      selectedContract.totalValue) *
                    100
                  }
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {(
                    (selectedContract.burnedValue /
                      selectedContract.totalValue) *
                    100
                  ).toFixed(0)}
                  % burned
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Monthly Burn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  $
                  {(
                    contractDetails?.burn?.currentMonthBurn / 1000 || 0
                  ).toFixed(0)}
                  k
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {contractDetails?.burn?.trend || "stable"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {selectedContract.healthScore}%
                </div>
                <Badge
                  variant={
                    selectedContract.healthScore > 80
                      ? "default"
                      : "destructive"
                  }
                  className="mt-2"
                >
                  {selectedContract.healthScore > 80 ? "Healthy" : "At Risk"}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Time Remaining</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.floor(
                    (new Date(selectedContract.endDate).getTime() -
                      Date.now()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Ends {new Date(selectedContract.endDate).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contract Details Tabs */}
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="cdrls">
                <TabsList className="w-full justify-start rounded-none border-b">
                  <TabsTrigger value="cdrls">CDRLs</TabsTrigger>
                  <TabsTrigger value="milestones">Milestones</TabsTrigger>
                  <TabsTrigger value="financial">Financial</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="strategic">Strategic Goals</TabsTrigger>
                  <TabsTrigger value="workstreams">Work Streams</TabsTrigger>
                </TabsList>

                <div className="p-6">
                  <TabsContent value="cdrls" className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {contractDetails?.cdrls?.summary?.total || 0}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Total CDRLs
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {contractDetails?.cdrls?.summary?.completed || 0}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Completed
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                          {contractDetails?.cdrls?.summary?.pending || 0}
                        </div>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {contractDetails?.cdrls?.summary?.overdue || 0}
                        </div>
                        <p className="text-xs text-muted-foreground">Overdue</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Upcoming Deadlines</h4>
                      {contractDetails?.cdrls?.upcoming?.map((cdrl: any) => (
                        <div
                          key={cdrl.id}
                          className="flex items-center justify-between p-3 rounded-lg border"
                        >
                          <div>
                            <p className="font-medium">
                              {cdrl.number}: {cdrl.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {cdrl.type}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                cdrl.status === "overdue"
                                  ? "destructive"
                                  : "default"
                              }
                            >
                              {cdrl.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              Due: {new Date(cdrl.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="milestones" className="space-y-4">
                    <div className="space-y-3">
                      {contractDetails?.milestones?.milestones?.map(
                        (milestone: any) => (
                          <div
                            key={milestone.id}
                            className="p-4 rounded-lg border"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{milestone.title}</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  ${(milestone.value / 1000).toFixed(0)}k value
                                </p>
                              </div>
                              <Badge
                                variant={
                                  milestone.status === "complete"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {milestone.status}
                              </Badge>
                            </div>
                            <Progress
                              value={milestone.progress || 0}
                              className="mt-3"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              {milestone.progress || 0}% complete - Due{" "}
                              {new Date(milestone.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="financial" className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">
                            Profit Margin
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {contractDetails?.profitability?.margin?.toFixed(
                              1
                            ) || 0}
                            %
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Target: 15%
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            $
                            {(
                              contractDetails?.profitability?.revenue /
                                1000000 || 0
                            ).toFixed(1)}
                            M
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Profit</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            $
                            {(
                              contractDetails?.profitability?.profit / 1000 || 0
                            ).toFixed(0)}
                            k
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {contractDetails?.burn?.recommendations?.map(
                      (rec: any, idx: number) => (
                        <Alert key={idx}>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>{rec.message}</strong>
                            <br />
                            {rec.action}
                          </AlertDescription>
                        </Alert>
                      )
                    )}
                  </TabsContent>

                  <TabsContent value="team">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Program Manager</p>
                        <p className="text-muted-foreground">
                          {selectedContract.programManager}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Technical Lead</p>
                        <p className="text-muted-foreground">
                          {selectedContract.technicalLead || "Not assigned"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Teams</p>
                        <div className="flex gap-2 mt-1">
                          {selectedContract.teams?.map((team: string) => (
                            <Badge key={team} variant="outline">
                              {team}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="strategic" className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Strategic Goals</h4>
                      {selectedContract.strategicGoals?.length > 0 ? (
                        selectedContract.strategicGoals.map((goal: any) => (
                          <div
                            key={goal.id}
                            className="p-4 rounded-lg border space-y-2"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{goal.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {goal.description}
                                </p>
                              </div>
                              <Badge
                                variant={
                                  goal.priority === "critical"
                                    ? "destructive"
                                    : goal.priority === "high"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {goal.priority}
                              </Badge>
                            </div>
                            <Progress value={goal.progress || 0} className="mt-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{goal.status}</span>
                              <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground">No strategic goals defined</p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="workstreams" className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Work Stream Allocations</h4>
                      {selectedContract.workStreams?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedContract.workStreams.map((ws: any) => (
                            <Card key={ws.workStreamId}>
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-sm">
                                    {ws.workStreamName}
                                  </CardTitle>
                                  <Badge variant="outline">
                                    {ws.allocation}%
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                <div>
                                  <p className="text-xs font-medium">Lead</p>
                                  <p className="text-sm text-muted-foreground">
                                    {ws.lead}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium">Team Size</p>
                                  <p className="text-sm text-muted-foreground">
                                    {ws.teamMembers?.length || 0} members
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium">Status</p>
                                  <Badge
                                    variant={ws.status === "active" ? "default" : "secondary"}
                                    className="mt-1"
                                  >
                                    {ws.status}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No work stream allocations defined</p>
                      )}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}

    </div>
  );
}

export default ContractsPage;
