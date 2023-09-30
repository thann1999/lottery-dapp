import { create } from 'zustand';

import { LotteryContractState } from '@root/interfaces';

const useLotteryStore = create<LotteryContractState>((set) => ({
  lotteryCount: 0,
  players: [],
  manager: '',
  isLoading: false,
  getContractInfo: async (lotteryContract) => {
    set({
      isLoading: true,
    });
    const info = await Promise.all([
      lotteryContract.methods.manager().call() as Promise<string>,
      // lotteryContract.methods.lotteryCount().call() as Promise<number>,
      lotteryContract.methods.getPlayers().call() as Promise<string[]>,
    ]);

    set({
      isLoading: false,
      manager: info[0],
      // lotteryCount: Number(info[1]) || 0,
      players: info[1],
    });
  },
  getNewPlayers: async (lotteryContract) => {
    const newPlayers = await lotteryContract.methods.getPlayers().call();
    set((prev) => ({
      ...prev,
      players: newPlayers,
    }));
  },
}));

export default useLotteryStore;
