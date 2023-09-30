export interface LotteryContractState {
  players: string[];
  lotteryCount: number;
  manager: string;
  isLoading: boolean;
  getContractInfo: (lotteryContract: any) => void;
  getNewPlayers: (lotteryContract: any) => void;
}
