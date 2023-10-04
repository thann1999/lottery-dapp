import { create } from 'zustand';

import { web3 } from '@root/configs';
import { LotteryContractState } from '@root/interfaces';

const useLotteryStore = create<LotteryContractState>((set) => ({
  lotteryCount: 0,
  players: [],
  manager: '',
  endDate: 0,
  balance: 0,
  isLoading: false,
  getContractInfo: async (lotteryContract) => {
    set({
      isLoading: true,
    });
    const response = await Promise.all([
      lotteryContract.methods.manager().call() as Promise<string>,
      lotteryContract.methods.lotteryCount().call() as Promise<number>,
      lotteryContract.methods.getPlayers().call() as Promise<string[]>,
      lotteryContract.methods.endDate().call() as Promise<string>,
      lotteryContract.methods.getBalance().call() as Promise<string>,
    ]);

    set({
      isLoading: false,
      manager: response[0],
      lotteryCount: Number(response[1]) || 0,
      players: response[2],
      endDate: Number(response[3]) * 1000 || 0,
      balance: Number(web3.utils.fromWei(response[4], 'ether')),
    });
  },
  getNewPlayersAndBalance: async (lotteryContract) => {
    const response = await Promise.all([
      lotteryContract.methods.getPlayers().call(),
      lotteryContract.methods.getBalance().call(),
    ]);
    set((prev) => ({
      ...prev,
      players: response[0],
      balance: Number(web3.utils.fromWei(response[1], 'ether')),
    }));
  },
}));

export default useLotteryStore;
