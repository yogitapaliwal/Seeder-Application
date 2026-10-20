import { createContext } from 'react';
import { MyContract } from '@/api/contracts/contracts.types';

export const CashKickContext = createContext<{
  selectedContracts: MyContract[];
  setSelectedContracts: (contracts: MyContract[]) => void;
}>({
  selectedContracts: [],
  setSelectedContracts: () => {},
});
