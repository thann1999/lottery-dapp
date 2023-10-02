import { useLayoutEffect, useState } from 'react';

import { LOTTERY_CONTRACT } from '@root/configs';
import { ChainId } from '@root/constants';

import { useMetaMask } from './useMetaMask';

export default function useContract() {
  const [lotteryContract, setLotteryContract] = useState(LOTTERY_CONTRACT[ChainId.Sepolia]);
  const { wallet } = useMetaMask();

  useLayoutEffect(() => {
    if (wallet.chain?.chainId) {
      setLotteryContract(
        LOTTERY_CONTRACT[wallet.chain.chainId] || LOTTERY_CONTRACT[ChainId.Sepolia]
      );
    }
  }, [wallet.chain?.chainId]);

  return {
    lotteryContract,
  };
}
