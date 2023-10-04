import { useMemo, useState, useEffect } from 'react';

import { Icon } from '@iconify/react';
import { Button, Space, Statistic, Tooltip, Typography } from 'antd';
import clsx from 'clsx';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import CountUp from 'react-countup';

import { useLotteryContract, useMetaMask } from '@hooks';
import { web3 } from '@root/configs';
import { CURRENT_ETH_PRICE } from '@root/constants';
import { useLotteryStore } from '@root/services/store';

import { TimerCountdown } from './components/TimerCountdown';

import './lottery.scss';

const renderer = ({ hours, minutes, seconds, days }: CountdownRenderProps) => {
  return <TimerCountdown hours={hours} days={days} seconds={seconds} minutes={minutes} />;
};

const formatter = (value: string | number) => (
  <CountUp className="text-5xl font-bold current-pool" end={+value} suffix="$" />
);

export default function LotteryPage() {
  const {
    isLoading: isLoadingContract,
    lotteryCount,
    manager,
    players,
    endDate,
    getNewPlayersAndBalance: getNewPlayers,
    getContractInfo,
    balance,
  } = useLotteryStore();
  const [isEntering, setIsEntering] = useState(false);
  const [isPicking, setIsPicking] = useState(false);
  const { wallet, isCorrectChain } = useMetaMask();
  const { lotteryContract } = useLotteryContract();
  const isManager =
    manager.toLocaleLowerCase() === wallet.accounts[0] && isCorrectChain && players.length;

  const isAlreadyEntered = useMemo(
    () => !!players.find((address) => address?.toLowerCase() === wallet.accounts[0]),
    [players, wallet.accounts]
  );

  const handleEnterLottery = async () => {
    try {
      setIsEntering(true);
      await lotteryContract.methods.enter().send({
        from: wallet.accounts[0],
        value: web3.utils.toWei('0.005', 'ether'),
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
    <div
      className={clsx('w-[50%] mt-16 mx-auto text-center lottery-page', { ' mt-32': !isManager })}
    >
      <Typography className="text-6xl font-bold">The Defi Lottery</Typography>

      <Statistic value={balance * CURRENT_ETH_PRICE} formatter={formatter} className="mt-6" />

      <Typography className="text-zinc-300 font-medium text-lg mt-6">
        Time left to join lottery #{lotteryCount + 1}
      </Typography>

      <div className="mt-2">
        {endDate ? (
          <Countdown date={new Date(endDate)} renderer={renderer} />
        ) : (
          <TimerCountdown days={0} hours={0} minutes={0} seconds={0} />
        )}
      </div>

      <div className="mt-8 button-icon">
        <Tooltip title={isCorrectChain ? '' : 'Unsupported Network'}>
          <Button
            type="primary"
            size="large"
            loading={isLoadingContract || isEntering}
            disabled={isAlreadyEntered || !isCorrectChain}
            onClick={handleEnterLottery}
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
      </div>

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
      <Typography className="mt-2 text-lg">Enter now and reveal the winner instantly 🎉</Typography>

      {isManager && (
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
