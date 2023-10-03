import { useMemo, useState } from 'react';

import { Icon } from '@iconify/react';
import { Button, Space, Tooltip, Typography } from 'antd';
import clsx from 'clsx';
import Countdown, { CountdownRenderProps } from 'react-countdown';

import { useLotteryContract, useMetaMask } from '@hooks';
import { web3 } from '@root/configs';
import { useLotteryStore } from '@root/services/store';

import { TimerCountdown } from './components/TimerCountdown';
import './lottery.scss';

const renderer = ({ hours, minutes, seconds, days }: CountdownRenderProps) => {
  // Render a countdown
  return <TimerCountdown hours={hours} days={days} seconds={seconds} minutes={minutes} />;
};

export default function LotteryPage() {
  const { isLoading, lotteryCount, manager, players, endDate, getNewPlayers, getContractInfo } =
    useLotteryStore();
  const [isEntering, setIsEntering] = useState(false);
  const [isPicking, setIsPicking] = useState(false);
  const { wallet, isCorrectChain } = useMetaMask();
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
        value: web3.utils.toWei('0.0015', 'ether'),
      });
      await getNewPlayers(lotteryContract);
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
      });
      await getContractInfo(lotteryContract);
      setIsPicking(false);
    } catch (error) {
      setIsPicking(false);
    }
  };

  return (
    <div className="w-[50%] mt-40 mx-auto text-center lottery-page">
      <Typography className="text-6xl font-bold">The Defi Lottery</Typography>

      <Typography className="text-zinc-300 font-medium text-lg mt-8">
        Time left to join lottery #{lotteryCount + 1}
      </Typography>

      <div className="mt-2">
        {endDate ? (
          <Countdown date={new Date(endDate)} renderer={renderer} />
        ) : (
          <TimerCountdown days={0} hours={0} minutes={0} seconds={0} />
        )}
      </div>

      <Tooltip title={isCorrectChain ? '' : 'Unsupported Network'} className="mt-8">
        <Button
          type="primary"
          size="large"
          loading={isLoading || isEntering}
          disabled={isAlreadyEntered || !isCorrectChain}
          onClick={handleEnterLottery}
          className="button-icon"
        >
          {isAlreadyEntered ? (
            <Typography.Text style={{ display: 'flex', alignItems: 'center' }}>
              You already entered
              <Icon icon="ion:ticket" fontSize={16} className="text-yellow-400 ml-2" />
            </Typography.Text>
          ) : (
            'ENTER THE LOTTERY'
          )}
        </Button>
      </Tooltip>

      <Typography className="mt-8 text-2xl">
        Lottery Count:{' '}
        <span className={clsx({ 'text-red-600': players?.length > 15 })}>
          {players?.length} / 1000
        </span>
      </Typography>
      <Typography className="text-zinc-500 font-medium text-lg italic">
        * since contract creation
      </Typography>
      <Typography className="mt-8 text-2xl">Lottery Finish: {lotteryCount} Entrants</Typography>
      <Typography className="mt-2 text-lg">Enter now and reveal the winner instantly!</Typography>

      {manager.toLocaleLowerCase() === wallet.accounts[0] && isCorrectChain && (
        <Button
          type="primary"
          size="large"
          className="mt-8 w-[350px]"
          onClick={handlePickWinner}
          loading={isPicking}
          disabled={!isCorrectChain}
        >
          PICK WINNER
        </Button>
      )}
    </div>
  );
}
