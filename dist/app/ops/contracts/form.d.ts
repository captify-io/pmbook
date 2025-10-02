import React from "react";
import type { Contract } from "@/types/contract";
interface ContractFormProps {
    contract?: Partial<Contract>;
    isOpen: boolean;
    onClose: () => void;
    onSave: (contract: Partial<Contract>) => Promise<void>;
}
export declare function ContractForm({ contract, isOpen, onClose, onSave, }: ContractFormProps): React.JSX.Element;
export {};
