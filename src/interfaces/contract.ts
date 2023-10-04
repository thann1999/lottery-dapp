import { Contract } from 'web3';

export interface LotteryContractState {
  players: string[];
  lotteryCount: number;
  manager: string;
  balance: number;
  endDate: number;
  isLoading: boolean;
  getContractInfo: (lotteryContract: Contract) => void;
  getNewPlayersAndBalance: (lotteryContract: Contract) => void;
}
