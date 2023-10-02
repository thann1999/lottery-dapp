import { Contract } from 'web3';

export interface LotteryContractState {
  players: string[];
  lotteryCount: number;
  manager: string;
  endDate: number;
  isLoading: boolean;
  getContractInfo: (lotteryContract: Contract) => void;
  getNewPlayers: (lotteryContract: Contract) => void;
}
