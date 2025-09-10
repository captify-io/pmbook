"use client";

import React, { useState, useEffect } from "react";
import { apiClient } from "@captify-io/platform/api";
import { cn } from "@captify-io/platform/utils";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DynamicIcon,
} from "@captify-io/platform/ui";
import type { Contract } from "@/types/contract";

interface ContractFormProps {
  contract?: Partial<Contract>;
  isOpen: boolean;
  onClose: () => void;
  onSave: (contract: Partial<Contract>) => Promise<void>;
}

export function ContractForm({
  contract,
  isOpen,
  onClose,
  onSave,
}: ContractFormProps) {
  // Create default initial values for a new contract
  const getInitialFormData = (): Partial<Contract> => {
    // Always use the passed contract data when provided
    if (contract) return { ...contract };

    const today = new Date().toISOString().split("T")[0];
    const oneYearFromNow = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    return {
      type: "FFP",
      status: "pre-award",
      contractNumber: "",
      name: "",
      customer: "",
      agency: "",

      // Financial defaults
      awardAmount: 0,
      awardDate: today,
      totalValue: 0,
      fundedValue: 0,
      burnedValue: 0,
      remainingValue: 0,
      monthlyBurnRate: 0,
      avgMonthlyBurn: 0,

      // Schedule defaults
      startDate: today,
      endDate: oneYearFromNow,
      popStart: today,
      popEnd: oneYearFromNow,
      popMonths: 12,

      // Cost breakdown defaults
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

      // Team defaults
      programManager: "",
      technicalLead: "",
      contractingOfficer: "",
      contractingOfficerRep: "",
      teams: [],

      // Other defaults
      healthScore: 100,
      risks: [],
      cdrls: [],
      milestones: [],
      laborCategories: [],
      indirectRate: 0,
      proposalSubmitted: false,
    };
  };

  const [formData, setFormData] = useState<Partial<Contract>>(
    getInitialFormData()
  );
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("info");

  // Dropdown data states
  const [customers, setCustomers] = useState<string[]>([
    "Department of Defense",
    "Department of State",
    "DHS",
    "NASA",
    "EPA",
  ]);
  const [agencies, setAgencies] = useState<string[]>([
    "DISA",
    "USCIS",
    "CBP",
    "CISA",
    "SPAWAR",
  ]);
  const [users, setUsers] = useState<any[]>([]);

  // Dropdown open states
  const [customerOpen, setCustomerOpen] = useState(false);
  const [agencyOpen, setAgencyOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState("");
  const [newAgency, setNewAgency] = useState("");

  useEffect(() => {
    loadDropdownData();
  }, []);

  const loadDropdownData = async () => {
    try {
      // Load users from the database
      const usersRes = await apiClient.run({
        service: "user",
        operation: "listUsers",
      });
      setUsers(usersRes?.data || []);
    } catch (error) {
      console.log("Error loading dropdown data:", error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCostChange = (
    costType: "budgetedCosts" | "expendedCosts",
    field: string,
    value: number
  ) => {
    setFormData((prev) => {
      const costs = { ...prev[costType] };
      costs[field] = value;
      costs.total =
        costs.direct +
        costs.indirect +
        costs.materials +
        costs.subcontracts +
        costs.profit;
      return {
        ...prev,
        [costType]: costs,
      };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Prepare the form data with calculated fields
      const submitData = { ...formData };

      // Calculate average monthly burn if we have dates and expended total
      if (submitData.startDate && submitData.expendedCosts?.total) {
        const start = new Date(submitData.startDate);
        const now = new Date();
        const monthsElapsed =
          (now.getFullYear() - start.getFullYear()) * 12 +
          (now.getMonth() - start.getMonth()) +
          1;
        submitData.avgMonthlyBurn =
          submitData.expendedCosts.total / monthsElapsed;
      }

      // Calculate remaining value if not set
      if (submitData.totalValue && submitData.burnedValue !== undefined) {
        submitData.remainingValue =
          submitData.totalValue - (submitData.burnedValue || 0);
      }

      // Set burnedValue to expendedCosts.total if available
      if (submitData.expendedCosts?.total && !submitData.burnedValue) {
        submitData.burnedValue = submitData.expendedCosts.total;
      }

      await onSave(submitData);
      onClose();
    } catch (error) {
      console.error("Failed to save contract:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {contract?.id && contract?.name ? "Edit Contract" : "New Contract"}
        </h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="costs">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contractNumber">Contract Number*</Label>
              <Input
                id="contractNumber"
                value={formData.contractNumber || ""}
                onChange={(e) =>
                  handleInputChange("contractNumber", e.target.value)
                }
                placeholder="e.g., W15P7T-20-C-0001"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Contract Name*</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., IT Support Services"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Contract Type*</Label>
              <Select
                value={formData.type || "FFP"}
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FFP">FFP - Firm Fixed Price</SelectItem>
                  <SelectItem value="CPFF">
                    CPFF - Cost Plus Fixed Fee
                  </SelectItem>
                  <SelectItem value="CPIF">
                    CPIF - Cost Plus Incentive Fee
                  </SelectItem>
                  <SelectItem value="T&M">T&M - Time & Materials</SelectItem>
                  <SelectItem value="IDIQ">
                    IDIQ - Indefinite Delivery/Quantity
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status*</Label>
              <Select
                value={formData.status || "pre-award"}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pre-award">Pre-Award</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="option-pending">Option Pending</SelectItem>
                  <SelectItem value="closing">Closing</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer">Customer*</Label>
              <Popover open={customerOpen} onOpenChange={setCustomerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={customerOpen}
                    className="w-full justify-between"
                  >
                    {formData.customer || "Select customer..."}
                    <DynamicIcon
                      name="chevrons-up-down"
                      className="ml-2 h-4 w-4 shrink-0 opacity-50"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search or add customer..."
                      value={newCustomer}
                      onValueChange={setNewCustomer}
                    />
                    <CommandList>
                      <CommandEmpty>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            if (newCustomer) {
                              setCustomers([...customers, newCustomer]);
                              handleInputChange("customer", newCustomer);
                              setCustomerOpen(false);
                              setNewCustomer("");
                            }
                          }}
                        >
                          <DynamicIcon name="plus" className="mr-2 h-4 w-4" />
                          Add "{newCustomer}"
                        </Button>
                      </CommandEmpty>
                      <CommandGroup>
                        {customers.map((customer) => (
                          <CommandItem
                            key={customer}
                            onSelect={() => {
                              handleInputChange("customer", customer);
                              setCustomerOpen(false);
                            }}
                          >
                            <DynamicIcon
                              name="check"
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.customer === customer
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {customer}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="agency">Agency</Label>
              <Popover open={agencyOpen} onOpenChange={setAgencyOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={agencyOpen}
                    className="w-full justify-between"
                  >
                    {formData.agency || "Select agency..."}
                    <DynamicIcon
                      name="chevrons-up-down"
                      className="ml-2 h-4 w-4 shrink-0 opacity-50"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search or add agency..."
                      value={newAgency}
                      onValueChange={setNewAgency}
                    />
                    <CommandList>
                      <CommandEmpty>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            if (newAgency) {
                              setAgencies([...agencies, newAgency]);
                              handleInputChange("agency", newAgency);
                              setAgencyOpen(false);
                              setNewAgency("");
                            }
                          }}
                        >
                          <DynamicIcon name="plus" className="mr-2 h-4 w-4" />
                          Add "{newAgency}"
                        </Button>
                      </CommandEmpty>
                      <CommandGroup>
                        {agencies.map((agency) => (
                          <CommandItem
                            key={agency}
                            onSelect={() => {
                              handleInputChange("agency", agency);
                              setAgencyOpen(false);
                            }}
                          >
                            <DynamicIcon
                              name="check"
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.agency === agency
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {agency}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date*</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate || ""}
                onChange={(e) => {
                  handleInputChange("startDate", e.target.value);
                  handleInputChange("popStart", e.target.value);
                  // Calculate end date based on POP months if set
                  const popMonths = formData.popMonths || 12;
                  const startDate = new Date(e.target.value);
                  const endDate = new Date(startDate);
                  endDate.setMonth(endDate.getMonth() + Number(popMonths));
                  handleInputChange(
                    "endDate",
                    endDate.toISOString().split("T")[0]
                  );
                  handleInputChange(
                    "popEnd",
                    endDate.toISOString().split("T")[0]
                  );
                }}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="popMonths">POP (months)*</Label>
              <Input
                id="popMonths"
                type="number"
                value={formData.popMonths || 12}
                onChange={(e) => {
                  const months = parseInt(e.target.value) || 12;
                  handleInputChange("popMonths", months);
                  // Calculate end date based on start date
                  if (formData.startDate) {
                    const startDate = new Date(formData.startDate);
                    const endDate = new Date(startDate);
                    endDate.setMonth(endDate.getMonth() + months);
                    handleInputChange(
                      "endDate",
                      endDate.toISOString().split("T")[0]
                    );
                    handleInputChange(
                      "popEnd",
                      endDate.toISOString().split("T")[0]
                    );
                  }
                }}
                placeholder="12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="awardAmount">Award Amount*</Label>
              <Input
                id="awardAmount"
                type="number"
                value={formData.awardAmount || ""}
                onChange={(e) => {
                  const amount = parseFloat(e.target.value) || 0;
                  handleInputChange("awardAmount", amount);
                  // Also set totalValue and fundedValue if not already set
                  if (!formData.totalValue || formData.totalValue === 0) {
                    handleInputChange("totalValue", amount);
                  }
                  if (!formData.fundedValue || formData.fundedValue === 0) {
                    handleInputChange("fundedValue", amount);
                  }
                }}
                placeholder="0.00"
                required
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalValue">Total Contract Value</Label>
              <Input
                id="totalValue"
                type="number"
                value={formData.totalValue || ""}
                onChange={(e) =>
                  handleInputChange("totalValue", parseFloat(e.target.value))
                }
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fundedValue">Funded Value</Label>
              <Input
                id="fundedValue"
                type="number"
                value={formData.fundedValue || ""}
                onChange={(e) =>
                  handleInputChange("fundedValue", parseFloat(e.target.value))
                }
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avgMonthlyBurn">Average Monthly Burn</Label>
              <Input
                id="avgMonthlyBurn"
                type="number"
                value={formData.avgMonthlyBurn || ""}
                onChange={(e) =>
                  handleInputChange(
                    "avgMonthlyBurn",
                    parseFloat(e.target.value)
                  )
                }
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="indirectRate">Indirect Rate (%)</Label>
              <Input
                id="indirectRate"
                type="number"
                value={formData.indirectRate || ""}
                onChange={(e) =>
                  handleInputChange("indirectRate", parseFloat(e.target.value))
                }
                placeholder="0"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Budgeted Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Direct Costs</Label>
                  <Input
                    type="number"
                    value={formData.budgetedCosts?.direct || 0}
                    onChange={(e) =>
                      handleCostChange(
                        "budgetedCosts",
                        "direct",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Indirect Costs</Label>
                  <Input
                    type="number"
                    value={formData.budgetedCosts?.indirect || 0}
                    onChange={(e) =>
                      handleCostChange(
                        "budgetedCosts",
                        "indirect",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Materials</Label>
                  <Input
                    type="number"
                    value={formData.budgetedCosts?.materials || 0}
                    onChange={(e) =>
                      handleCostChange(
                        "budgetedCosts",
                        "materials",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subcontracts</Label>
                  <Input
                    type="number"
                    value={formData.budgetedCosts?.subcontracts || 0}
                    onChange={(e) =>
                      handleCostChange(
                        "budgetedCosts",
                        "subcontracts",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Profit/Fee</Label>
                  <Input
                    type="number"
                    value={formData.budgetedCosts?.profit || 0}
                    onChange={(e) =>
                      handleCostChange(
                        "budgetedCosts",
                        "profit",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Total Budgeted</Label>
                  <Input
                    type="number"
                    value={formData.budgetedCosts?.total || 0}
                    disabled
                    className="font-bold"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expended Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Direct Costs</Label>
                  <Input
                    type="number"
                    value={formData.expendedCosts?.direct || 0}
                    onChange={(e) =>
                      handleCostChange(
                        "expendedCosts",
                        "direct",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Indirect Costs</Label>
                  <Input
                    type="number"
                    value={formData.expendedCosts?.indirect || 0}
                    onChange={(e) =>
                      handleCostChange(
                        "expendedCosts",
                        "indirect",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Materials</Label>
                  <Input
                    type="number"
                    value={formData.expendedCosts?.materials || 0}
                    onChange={(e) =>
                      handleCostChange(
                        "expendedCosts",
                        "materials",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subcontracts</Label>
                  <Input
                    type="number"
                    value={formData.expendedCosts?.subcontracts || 0}
                    onChange={(e) =>
                      handleCostChange(
                        "expendedCosts",
                        "subcontracts",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Profit/Fee</Label>
                  <Input
                    type="number"
                    value={formData.expendedCosts?.profit || 0}
                    onChange={(e) =>
                      handleCostChange(
                        "expendedCosts",
                        "profit",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Total Expended</Label>
                  <Input
                    type="number"
                    value={formData.expendedCosts?.total || 0}
                    disabled
                    className="font-bold"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="programManager">Program Manager*</Label>
              <Select
                value={formData.programManager || ""}
                onValueChange={(value) =>
                  handleInputChange("programManager", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Program Manager" />
                </SelectTrigger>
                <SelectContent>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <SelectItem
                        key={user.id || user.email}
                        value={user.email}
                      >
                        {user.name || user.email}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="john.doe@example.com">
                      John Doe
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="technicalLead">Technical Lead</Label>
              <Select
                value={formData.technicalLead || ""}
                onValueChange={(value) =>
                  handleInputChange("technicalLead", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Technical Lead" />
                </SelectTrigger>
                <SelectContent>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <SelectItem
                        key={user.id || user.email}
                        value={user.email}
                      >
                        {user.name || user.email}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="jane.smith@example.com">
                      Jane Smith
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractingOfficer">Contracting Officer</Label>
              <Select
                value={formData.contractingOfficer || ""}
                onValueChange={(value) =>
                  handleInputChange("contractingOfficer", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Contracting Officer" />
                </SelectTrigger>
                <SelectContent>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <SelectItem
                        key={user.id || user.email}
                        value={user.email}
                      >
                        {user.name || user.email}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="co@agency.gov">CO Name</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractingOfficerRep">
                Contracting Officer Representative (COR)
              </Label>
              <Select
                value={formData.contractingOfficerRep || ""}
                onValueChange={(value) =>
                  handleInputChange("contractingOfficerRep", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select COR" />
                </SelectTrigger>
                <SelectContent>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <SelectItem
                        key={user.id || user.email}
                        value={user.email}
                      >
                        {user.name || user.email}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="cor@agency.gov">COR Name</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contract Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <DynamicIcon
                  name="upload"
                  className="mx-auto h-12 w-12 text-gray-400"
                />
                <p className="mt-2 text-sm text-gray-600 font-semibold">
                  Document Upload Coming Soon
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Documents will be stored in S3 and accessible to the AI agent
                </p>
                <p className="mt-3 text-xs text-gray-400">
                  Supported formats: PDF, Word, Excel, PowerPoint
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Contract"}
        </Button>
      </div>
    </div>
  );
}
