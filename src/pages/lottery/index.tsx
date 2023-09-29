import { useMemo, useState } from 'react';

import { Icon } from '@iconify/react';
import { Button, Space, Typography } from 'antd';
import clsx from 'clsx';

import { useLotteryContract, useMetaMask } from '@hooks';
import { web3 } from '@root/configs';
import { useLotteryStore } from '@root/services/store';

export default function MintPage() {
  const { isLoading, lotteryCount, manager, players } = useLotteryStore();
  const [isEntering, setIsEntering] = useState(false);
  const [isPicking, setIsPicking] = useState(false);
  const { wallet } = useMetaMask();
  const { lotteryContract } = useLotteryContract();

  const isAlreadyEntered = useMemo(
    () => !!players.find((address) => address?.toLowerCase() === wallet.accounts[0]),
    [players, wallet.accounts]
  );

  const handleEnterLottery = async () => {
    try {
      setIsEntering(true);
      await lotteryContract.methods.enter().send({
        from: wallet.accounts[0],
        value: web3.utils.toWei('0.002', 'ether'),
      });
      setIsEntering(false);
    } catch (error) {
      setIsEntering(false);
    }
  };

  const handlePickWinner = async () => {
    try {
      setIsPicking(true);
      await lotteryContract.methods.pickWinner().send({
        from: wallet.accounts[0],
        gas: '3000000',
      });
      setIsPicking(false);
    } catch (error) {
      setIsPicking(false);
    }
  };

  return (
    <div className="w-[50%] mt-40 mx-auto text-center">
      <Typography className="text-6xl font-bold">The Defi Lottery</Typography>

      <Typography className="text-zinc-300 font-medium text-lg mt-8">
        Time left to join lottery #{lotteryCount + 1}
      </Typography>

      <Space direction="horizontal" align="center" className="mt-8" size="large">
        <Button
          type="primary"
          size="large"
          loading={isLoading || isEntering}
          disabled={isAlreadyEntered}
          onClick={handleEnterLottery}
        >
          {isAlreadyEntered ? (
            <Typography.Text className="flex items-center">
              You already entered
              <Icon icon="ion:ticket" fontSize={18} className="text-yellow-400 ml-2" />
            </Typography.Text>
          ) : (
            'ENTER THE LOTTERY'
          )}
        </Button>
        <Button type="primary" size="large">
          HOW IT WORK
        </Button>
      </Space>

      <Typography className="mt-8 text-2xl">
        Lottery Count:{' '}
        <span className={clsx({ 'text-red-600': players?.length > 15 })}>
          {players?.length} / 20
        </span>
      </Typography>
      <Typography className="text-zinc-500 font-medium text-lg italic">
        * since contract creation
      </Typography>
      <Typography className="mt-8 text-2xl">Lottery Finish: {lotteryCount} Entrants</Typography>
      <Typography className="mt-2 text-lg">Enter now and reveal the winner instantly!</Typography>

      {manager.toLocaleLowerCase() === wallet.accounts[0] && (
        <Button
          type="primary"
          size="large"
          className="mt-8 w-[350px]"
          onClick={handlePickWinner}
          loading={isPicking}
        >
          PICK WINNER
        </Button>
      )}
    </div>
  );
}
