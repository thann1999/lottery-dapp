import { useLayoutEffect, useState } from 'react';

import { LOTTERY_CONTRACT } from '@root/configs';
import { ChainId } from '@root/constants';

import { useMetaMask } from './useMetaMask';

export default function useContract() {
  const [lotteryContract, setLotteryContract] = useState(LOTTERY_CONTRACT[ChainId.Sepolia]);
  const { wallet, isCorrectChain } = useMetaMask();

  useLayoutEffect(() => {
    if (isCorrectChain) {
      setLotteryContract(LOTTERY_CONTRACT[wallet.chain?.chainId]);
    }
  }, [wallet.chain?.chainId, isCorrectChain]);

  return {
    lotteryContract,
  };
}
