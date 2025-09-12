"use client";

import { createContext, useContext } from "react";

interface HashContextType {
  currentHash: string;
  setCurrentHash: (hash: string) => void;
}

export const HashContext = createContext<HashContextType | undefined>(undefined);

export const useHashContext = () => {
  const context = useContext(HashContext);
  if (!context) {
    throw new Error('useHashContext must be used within a HashProvider');
  }
  return context;
};