"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Badge,
  Separator,
} from "@captify-io/core/components/ui";
import { DynamicIcon } from "lucide-react/dynamic";
import { Contract, Customer } from "../../types/contract";
import { apiClient } from "@captify-io/core/lib";

function ActiveContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null
  );
  const [currentMode, setCurrentMode] = useState<
    "list" | "create" | "view" | "edit"
  >("list");
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contractNumber: "",
    customer: "",
    popStart: "",
    popMonths: "",
    awardAmount: "",
    status: "active" as Contract["status"],
    type: "FFP" as Contract["type"],
  });
  const [newCustomer, setNewCustomer] = useState({ name: "", agency: "" });

  // Parse URL search params for mode and contract ID
  const parseUrlParams = () => {
    if (typeof window === "undefined")
      return { mode: "list" as const, contractId: null };

    const urlParams = new URLSearchParams(window.location.search);
    const mode =
      (urlParams.get("mode") as "create" | "view" | "edit") || "list";
    const contractId = urlParams.get("id");
    return { mode, contractId };
  };

  // Handle URL changes
  useEffect(() => {
    const { mode, contractId } = parseUrlParams();

    if (mode === "create") {
      setCurrentMode("create");
      setSelectedContract(null);
      setFormData({
        name: "",
        contractNumber: "",
        customer: "",
        popStart: "",
        popMonths: "",
        awardAmount: "",
        status: "active",
        type: "FFP",
      });
    } else if (contractId && contracts.length > 0) {
      const contract = contracts.find((c) => c.id === contractId);
      if (contract) {
        setSelectedContract(contract);
        setCurrentMode(mode === "edit" ? "edit" : "view");
        if (mode === "edit") {
          setFormData({
            name: contract.name,
            contractNumber: contract.contractNumber,
            customer: contract.customer,
            popStart: contract.popStart,
            popMonths: (contract.popMonths || 0).toString(),
            awardAmount: contract.awardAmount.toString(),
            status: contract.status,
            type: contract.type,
          });
        }
      }
    } else {
      setCurrentMode("list");
      setSelectedContract(null);
    }
  }, [contracts]);

  // Listen for popstate (back/forward) changes
  useEffect(() => {
    const handlePopState = () => {
      const { mode, contractId } = parseUrlParams();

      if (mode === "create") {
        setCurrentMode("create");
        setSelectedContract(null);
      } else if (contractId && contracts.length > 0) {
        const contract = contracts.find((c) => c.id === contractId);
        if (contract) {
          setSelectedContract(contract);
          setCurrentMode(mode === "edit" ? "edit" : "view");
        }
      } else {
        setCurrentMode("list");
        setSelectedContract(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [contracts]);

  useEffect(() => {
    loadContracts();
    loadCustomers();
  }, []);

  const loadContracts = async () => {
    try {
      const response = await fetch("/api/captify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: "platform.dynamodb",
          operation: "scan",
          table: "pmbook-Contract",
        }),
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data?.Items) {
          setContracts(result.data.Items);
        }
      }
    } catch (error) {
      console.error("Failed to load contracts:", error);
    }
  };

  const loadCustomers = async () => {
    try {
      const response = await fetch("/api/captify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: "platform.dynamodb",
          operation: "scan",
          table: "pmbook-Customer",
        }),
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data?.Items) {
          setCustomers(result.data.Items.filter((c: Customer) => c.active));
        }
      }
    } catch (error) {
      console.error("Failed to load customers:", error);
    }
  };

  const calculatePopEnd = (startDate: string, months: number): string => {
    const start = new Date(startDate);
    const end = new Date(
      start.getFullYear(),
      start.getMonth() + months,
      start.getDate()
    );
    return end.toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const popMonths = parseInt(formData.popMonths);
    const popEnd = calculatePopEnd(formData.popStart, popMonths);
    const awardAmount = parseFloat(formData.awardAmount) || 0;

    if (currentMode === "create") {
      const contractId = `contract-${Date.now()}`;

      const contract: Partial<Contract> = {
        id: contractId,
        name: formData.name,
        contractNumber: formData.contractNumber,
        customer: formData.customer,
        popStart: formData.popStart,
        popEnd: popEnd,
        popMonths: popMonths,
        status: formData.status,
        type: formData.type,
        awardAmount: awardAmount,
        awardDate: new Date().toISOString().split("T")[0],
        totalValue: awardAmount,
        fundedValue: awardAmount,
        burnedValue: 0,
        remainingValue: awardAmount,
        monthlyBurnRate: 0,
        avgMonthlyBurn: 0,
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
        startDate: formData.popStart,
        endDate: popEnd,
        cdrls: [],
        milestones: [],
        programManager: "",
        teams: [],
        laborCategories: [],
        indirectRate: 0,
        healthScore: 100,
        risks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      try {
        const response = await fetch("/api/captify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service: "platform.dynamodb",
            operation: "put",
            table: "pmbook-Contract",
            data: { item: contract },
          }),
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            await loadContracts();
            // Navigate to the new contract detail view
            updateUrl({ mode: "view", id: contractId });
            setCurrentMode("view");
            const newContract = result.data.Attributes || contract;
            setSelectedContract(newContract);
          }
        }
      } catch (error) {
        console.error("Failed to create contract:", error);
      }
    } else if (currentMode === "edit" && selectedContract) {
      // Update existing contract
      const updatedContract: Partial<Contract> = {
        ...selectedContract,
        name: formData.name,
        contractNumber: formData.contractNumber,
        customer: formData.customer,
        popStart: formData.popStart,
        popEnd: popEnd,
        popMonths: popMonths,
        status: formData.status,
        type: formData.type,
        awardAmount: awardAmount,
        totalValue: awardAmount,
        fundedValue: awardAmount,
        remainingValue: awardAmount - selectedContract.burnedValue,
        startDate: formData.popStart,
        endDate: popEnd,
        updatedAt: new Date().toISOString(),
      };

      try {
        const response = await fetch("/api/captify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service: "platform.dynamodb",
            operation: "put",
            table: "pmbook-Contract",
            data: { item: updatedContract },
          }),
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            await loadContracts();
            // Navigate back to view mode
            updateUrl({ mode: "view", id: selectedContract.id });
            setCurrentMode("view");
          }
        }
      } catch (error) {
        console.error("Failed to update contract:", error);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddCustomer = async () => {
    if (!newCustomer.name.trim()) return;

    const customer: Partial<Customer> = {
      id: `customer-${Date.now()}`,
      name: newCustomer.name,
      agency: newCustomer.agency,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/captify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: "platform.dynamodb",
          operation: "put",
          table: "pmbook-Customer",
          data: { item: customer },
        }),
        credentials: "include",
      });

      if (response.ok) {
        await loadCustomers();
        setFormData((prev) => ({ ...prev, customer: customer.name! }));
        setNewCustomer({ name: "", agency: "" });
        setIsCustomerDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to add customer:", error);
    }
  };

  const updateUrl = (params: { mode?: string; id?: string }) => {
    const url = new URL(window.location.href);

    // Clear existing params
    url.searchParams.delete("mode");
    url.searchParams.delete("id");

    // Set new params
    if (params.mode && params.mode !== "list") {
      url.searchParams.set("mode", params.mode);
    }
    if (params.id) {
      url.searchParams.set("id", params.id);
    }

    window.history.pushState({}, "", url.toString());
  };

  const handleContractClick = (contract: Contract) => {
    updateUrl({ mode: "view", id: contract.id });
    setSelectedContract(contract);
    setCurrentMode("view");
  };

  const handleBackToList = () => {
    updateUrl({ mode: "list" });
    setCurrentMode("list");
    setSelectedContract(null);
  };

  const handleCreateNew = () => {
    updateUrl({ mode: "create" });
    setCurrentMode("create");
    setSelectedContract(null);
    setFormData({
      name: "",
      contractNumber: "",
      customer: "",
      popStart: "",
      popMonths: "",
      awardAmount: "",
      status: "active",
      type: "FFP",
    });
  };

  const handleEditContract = () => {
    if (selectedContract) {
      updateUrl({ mode: "edit", id: selectedContract.id });
      setCurrentMode("edit");
      setFormData({
        name: selectedContract.name,
        contractNumber: selectedContract.contractNumber,
        customer: selectedContract.customer,
        popStart: selectedContract.popStart,
        popMonths: (selectedContract.popMonths || 0).toString(),
        awardAmount: selectedContract.awardAmount.toString(),
        status: selectedContract.status,
        type: selectedContract.type,
      });
    }
  };

  const handleCancelEdit = () => {
    if (selectedContract) {
      updateUrl({ mode: "view", id: selectedContract.id });
      setCurrentMode("view");
    } else {
      updateUrl({ mode: "list" });
      setCurrentMode("list");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pre-award":
        return "bg-yellow-100 text-yellow-800";
      case "closing":
        return "bg-orange-100 text-orange-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Show contract creation form
  if (currentMode === "create") {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackToList}
            className="flex items-center gap-2"
          >
            <DynamicIcon name="arrow-left" className="h-4 w-4" />
            Back to Contracts
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Create New Contract</h1>
            <p className="text-muted-foreground">
              Enter contract details below
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contract Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Contract Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter contract name"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contractNumber">Contract Number</Label>
                  <Input
                    id="contractNumber"
                    placeholder="FA8750-22-C-0001"
                    value={formData.contractNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                      handleInputChange("contractNumber", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <div className="flex space-x-2">
                    <Select
                      value={formData.customer}
                      onValueChange={(value: string) =>
                        handleInputChange("customer", value)
                      }
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.name}>
                            {customer.name}{" "}
                            {customer.agency && `(${customer.agency})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Dialog
                      open={isCustomerDialogOpen}
                      onOpenChange={setIsCustomerDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button type="button" variant="outline" size="icon">
                          <DynamicIcon name="plus" className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Add Customer</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="customerName">Customer Name</Label>
                            <Input
                              id="customerName"
                              placeholder="Customer name"
                              value={newCustomer.name}
                              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                                setNewCustomer((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="agency">Agency</Label>
                            <Input
                              id="agency"
                              placeholder="USAF, US Army, etc."
                              value={newCustomer.agency}
                              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                                setNewCustomer((prev) => ({
                                  ...prev,
                                  agency: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsCustomerDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button type="button" onClick={handleAddCustomer}>
                              Add
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: string) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pre-award">Pre-Award</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="option-pending">
                        Option Pending
                      </SelectItem>
                      <SelectItem value="closing">Closing</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Contract Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: string) => handleInputChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FFP">
                        FFP (Firm Fixed Price)
                      </SelectItem>
                      <SelectItem value="CPFF">
                        CPFF (Cost Plus Fixed Fee)
                      </SelectItem>
                      <SelectItem value="CPIF">
                        CPIF (Cost Plus Incentive Fee)
                      </SelectItem>
                      <SelectItem value="T&M">
                        T&M (Time & Materials)
                      </SelectItem>
                      <SelectItem value="IDIQ">
                        IDIQ (Indefinite Delivery/Indefinite Quantity)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financial Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="awardAmount">Award Amount</Label>
                  <Input
                    id="awardAmount"
                    type="number"
                    placeholder="1000000"
                    min="0"
                    step="0.01"
                    value={formData.awardAmount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                      handleInputChange("awardAmount", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Funded Value</Label>
                  <p className="text-sm text-muted-foreground">
                    {formData.awardAmount
                      ? formatCurrency(parseFloat(formData.awardAmount))
                      : "$0"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Remaining Value</Label>
                  <p className="text-sm text-muted-foreground">
                    {formData.awardAmount
                      ? formatCurrency(parseFloat(formData.awardAmount))
                      : "$0"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Health Score</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                    <span className="text-sm">100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Schedule Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="popStart">Start Date</Label>
                  <Input
                    id="popStart"
                    type="date"
                    value={formData.popStart}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                      handleInputChange("popStart", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="popMonths">POP (Months)</Label>
                  <Input
                    id="popMonths"
                    type="number"
                    placeholder="12"
                    min="1"
                    max="120"
                    value={formData.popMonths}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                      handleInputChange("popMonths", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <p className="text-sm text-muted-foreground">
                    {formData.popStart && formData.popMonths
                      ? formatDate(
                          calculatePopEnd(
                            formData.popStart,
                            parseInt(formData.popMonths)
                          )
                        )
                      : "Select start date and duration"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Award Date</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleBackToList}>
              Cancel
            </Button>
            <Button type="submit">Create Contract</Button>
          </div>
        </form>
      </div>
    );
  }

  // Show contract detail/edit view if selected
  if ((currentMode === "view" || currentMode === "edit") && selectedContract) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackToList}
            className="flex items-center gap-2"
          >
            <DynamicIcon name="arrow-left" className="h-4 w-4" />
            Back to Contracts
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{selectedContract.name}</h1>
            <p className="text-muted-foreground">
              {selectedContract.contractNumber}
            </p>
          </div>
          {currentMode === "view" && (
            <Button
              onClick={handleEditContract}
              className="flex items-center gap-2"
            >
              <DynamicIcon name="edit" className="h-4 w-4" />
              Edit
            </Button>
          )}
          {currentMode === "edit" && (
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
              <Button form="edit-contract-form" type="submit">
                Save Changes
              </Button>
            </div>
          )}
        </div>

        {currentMode === "edit" && (
          <form
            id="edit-contract-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contract Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Contract Name</Label>
                    <Input
                      id="edit-name"
                      value={formData.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                        handleInputChange("name", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-contractNumber">Contract Number</Label>
                    <Input
                      id="edit-contractNumber"
                      value={formData.contractNumber}
                      onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                        handleInputChange("contractNumber", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-customer">Customer</Label>
                    <Select
                      value={formData.customer}
                      onValueChange={(value: string) =>
                        handleInputChange("customer", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.name}>
                            {customer.name}{" "}
                            {customer.agency && `(${customer.agency})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: string) =>
                        handleInputChange("status", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pre-award">Pre-Award</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="option-pending">
                          Option Pending
                        </SelectItem>
                        <SelectItem value="closing">Closing</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-type">Contract Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: string) =>
                        handleInputChange("type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FFP">
                          FFP (Firm Fixed Price)
                        </SelectItem>
                        <SelectItem value="CPFF">
                          CPFF (Cost Plus Fixed Fee)
                        </SelectItem>
                        <SelectItem value="CPIF">
                          CPIF (Cost Plus Incentive Fee)
                        </SelectItem>
                        <SelectItem value="T&M">
                          T&M (Time & Materials)
                        </SelectItem>
                        <SelectItem value="IDIQ">
                          IDIQ (Indefinite Delivery/Indefinite Quantity)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Financial Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-awardAmount">Award Amount</Label>
                    <Input
                      id="edit-awardAmount"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.awardAmount}
                      onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                        handleInputChange("awardAmount", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Funded Value
                    </Label>
                    <p className="text-sm">
                      {formatCurrency(selectedContract.fundedValue)}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Remaining Value
                    </Label>
                    <p className="text-sm">
                      {formatCurrency(selectedContract.remainingValue)}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Health Score
                    </Label>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${selectedContract.healthScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">
                        {selectedContract.healthScore}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Schedule Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-popStart">Start Date</Label>
                    <Input
                      id="edit-popStart"
                      type="date"
                      value={formData.popStart}
                      onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                        handleInputChange("popStart", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-popMonths">POP (Months)</Label>
                    <Input
                      id="edit-popMonths"
                      type="number"
                      min="1"
                      max="120"
                      value={formData.popMonths}
                      onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                        handleInputChange("popMonths", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      End Date
                    </Label>
                    <p className="text-sm">
                      {formData.popStart && formData.popMonths
                        ? formatDate(
                            calculatePopEnd(
                              formData.popStart,
                              parseInt(formData.popMonths)
                            )
                          )
                        : formatDate(selectedContract.endDate)}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Award Date
                    </Label>
                    <p className="text-sm">
                      {formatDate(selectedContract.awardDate)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        )}

        {currentMode === "view" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contract Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Customer
                  </Label>
                  <p className="text-sm">{selectedContract.customer}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Status
                  </Label>
                  <Badge className={getStatusColor(selectedContract.status)}>
                    {selectedContract.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Contract Type
                  </Label>
                  <p className="text-sm">{selectedContract.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Period of Performance
                  </Label>
                  <p className="text-sm">
                    {formatDate(selectedContract.popStart)} -{" "}
                    {formatDate(selectedContract.popEnd)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedContract.popMonths} months
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financial Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Award Amount
                  </Label>
                  <p className="text-lg font-semibold">
                    {formatCurrency(selectedContract.awardAmount)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Funded Value
                  </Label>
                  <p className="text-sm">
                    {formatCurrency(selectedContract.fundedValue)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Remaining Value
                  </Label>
                  <p className="text-sm">
                    {formatCurrency(selectedContract.remainingValue)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Health Score
                  </Label>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${selectedContract.healthScore}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">
                      {selectedContract.healthScore}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Award Date
                  </Label>
                  <p className="text-sm">
                    {formatDate(selectedContract.awardDate)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Start Date
                  </Label>
                  <p className="text-sm">
                    {formatDate(selectedContract.startDate)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    End Date
                  </Label>
                  <p className="text-sm">
                    {formatDate(selectedContract.endDate)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Created
                  </Label>
                  <p className="text-sm">
                    {selectedContract.createdAt ? formatDate(selectedContract.createdAt) : 'N/A'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Deliverables & Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedContract.cdrls.length === 0 &&
              selectedContract.milestones.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No deliverables or milestones defined yet.
                </p>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">
                      CDRLs ({selectedContract.cdrls.length})
                    </h4>
                    {/* Add CDRL list here later */}
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      Milestones ({selectedContract.milestones.length})
                    </h4>
                    {/* Add milestone list here later */}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Team & Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Program Manager
                </Label>
                <p className="text-sm">
                  {selectedContract.programManager || "Not assigned"}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Teams
                </Label>
                <p className="text-sm">
                  {selectedContract.teams.length === 0
                    ? "No teams assigned"
                    : selectedContract.teams.join(", ")}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Risks
                </Label>
                <p className="text-sm">
                  {selectedContract.risks.length === 0
                    ? "No risks identified"
                    : `${selectedContract.risks.length} risk(s) identified`}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Active Contracts
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your contract portfolio and track performance metrics
          </p>
        </div>

        <Button onClick={handleCreateNew}>
          <DynamicIcon name="plus" className="h-4 w-4 mr-2" />
          Create Contract
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DynamicIcon name="file-text" className="h-5 w-5" />
            Contract Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          {contracts.length === 0 ? (
            <div className="text-center py-12">
              <DynamicIcon
                name="file-plus"
                className="h-12 w-12 text-muted-foreground mx-auto mb-4"
              />
              <h3 className="text-lg font-medium mb-2">No contracts found</h3>
              <p className="text-muted-foreground mb-4">
                Create your first contract to get started with project
                management.
              </p>
              <Button onClick={handleCreateNew}>
                <DynamicIcon name="plus" className="h-4 w-4 mr-2" />
                Create First Contract
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract Name</TableHead>
                  <TableHead>Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Award Amount</TableHead>
                  <TableHead>POP</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract) => (
                  <TableRow
                    key={contract.id}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell className="font-medium">
                      <button
                        onClick={() => handleContractClick(contract)}
                        className="text-left hover:underline"
                      >
                        {contract.name}
                      </button>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {contract.contractNumber}
                    </TableCell>
                    <TableCell>{contract.customer}</TableCell>
                    <TableCell>
                      {formatCurrency(contract.awardAmount)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {formatDate(contract.popStart)} -{" "}
                        {formatDate(contract.popEnd)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {contract.popMonths} months
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(contract.status)}>
                        {contract.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleContractClick(contract)}
                      >
                        <DynamicIcon name="eye" className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ActiveContractsPage;
