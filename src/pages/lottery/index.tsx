import { useMemo, useState } from 'react';

import { Icon } from '@iconify/react';
import { Button, Space, Typography } from 'antd';

import { lotteryContract, web3 } from '@root/configs';
import { useMetaMask } from '@root/hooks';
import { useLotteryStore } from '@root/services/store';

export default function MintPage() {
  const { isLoading, lotteryCount, players } = useLotteryStore();
  const [isContractLoading, setIsContractLoading] = useState(false);
  const { wallet } = useMetaMask();

  const isAlreadyEntered = useMemo(
    () => !!players.find((address) => address === wallet.accounts[0]),
    [players, wallet.accounts]
  );

  const handleEnterLottery = async () => {
    try {
      setIsContractLoading(true);
      await lotteryContract.methods.enter().send({
        from: wallet.accounts[0],
        value: web3.utils.toWei('0.01', 'ether'),
      });
      setIsContractLoading(false);
    } catch (error) {
      setIsContractLoading(false);
    }
  };

  return (
    <div className="w-[50%] mt-40 mx-auto text-center">
      <Typography className="text-6xl font-bold">The Defi Lottery</Typography>

      <Space direction="horizontal" align="center" className="mt-8" size="large">
        <Button
          type="primary"
          size="large"
          loading={isLoading || isContractLoading}
          disabled={isAlreadyEntered}
          onClick={handleEnterLottery}
        >
          {isAlreadyEntered ? (
            <div className="flex items-center">
              <Typography>You already entered</Typography>
              <Icon icon="ion:ticket" fontSize={18} className="text-yellow-400 ml-1" />
            </div>
          ) : (
            'ENTER THE LOTTERY'
          )}
        </Button>

        <Button type="primary" size="large">
          HOW IT WORK
        </Button>
      </Space>

      <Typography className="mt-8 text-2xl">Lottery Count: {players?.length}</Typography>
      <Typography className="text-zinc-500 font-medium text-lg italic">
        * since contract creation
      </Typography>

      <Typography className="mt-8 text-2xl">Lottery Finish: {lotteryCount} Entrants</Typography>

      <Typography className="mt-2 text-lg">Enter now and reveal the winner instantly!</Typography>
    </div>
  );
}
