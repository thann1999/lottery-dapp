export interface LotteryContractState {
  players: string[];
  lotteryCount: number;
  manager: string;
  isLoading: boolean;
  getContractInfo: () => void;
}
