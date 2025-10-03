import { Core } from "@captify-io/core/types";

/**
 * Task Order (under IDIQ contracts)
 */
export interface TaskOrder extends Core {
  contractId: string;
  taskOrderNumber: string;
  name: string;
  description: string;

  // Financial
  totalValue: number;
  fundedValue: number;
  usedValue: number; // Amount used/obligated
  availableValue: number; // Remaining available funds

  // Pool Percentages (generated as work is done)
  pools: {
    direct: number; // % for direct labor
    indirect: number; // % for indirect costs
    materials: number; // % for materials/ODC
    subcontracts: number; // % for subcontracts
    profit: number; // % for profit/fee
  };

  // Schedule / Period of Performance
  popStart: string;
  popEnd: string;

  // Status
  status: "active" | "closed" | "pending";

  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}
