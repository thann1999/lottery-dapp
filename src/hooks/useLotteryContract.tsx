import { useLayoutEffect, useState } from 'react';

import { LOTTERY_CONTRACT } from '@root/configs';
import { ChainId } from '@root/constants';

import { useMetaMask } from './useMetaMask';

export default function useContract() {
  const [lotteryContract, setLotteryContract] = useState(LOTTERY_CONTRACT[ChainId.Linea]);
  const { wallet } = useMetaMask();

  useLayoutEffect(() => {
    if (wallet.chain.chainId) {
      setLotteryContract(LOTTERY_CONTRACT[wallet.chain.chainId] || LOTTERY_CONTRACT[ChainId.Linea]);
    }
  }, [wallet.chain.chainId]);

  return {
    lotteryContract,
  };
}
