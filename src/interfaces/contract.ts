import { Contract } from 'web3';

export interface LotteryContractState {
  players: string[];
  lotteryCount: number;
  manager: string;
  isLoading: boolean;
  getContractInfo: (lotteryContract: Contract<any>) => void;
}
