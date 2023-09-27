import { useCallback, useEffect, useState } from 'react';

import { Button, Col, Input, Row, Skeleton, Space, Typography } from 'antd';

import { lotteryContract } from '@root/configs';
import { ContractInfo } from '@root/interfaces';

export default function MintPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [drawCount, setDrawCount] = useState<number>(0);

  const getContractInfo = useCallback(async () => {
    setIsLoading(true);
    const players = await lotteryContract.methods.getPlayers().call();

    setDrawCount(players?.length || 0);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getContractInfo();
  }, [getContractInfo]);

  return (
    <div className="w-[50%] mt-40 mx-auto text-center">
      <Typography className="text-6xl font-bold">The Defi Lottery</Typography>

      <Space direction="horizontal" align="center" className="mt-8" size="large">
        <Button type="primary" size="large">
          ENTER THE DRAW
        </Button>

        <Button type="primary" size="large">
          HOW IT WORK
        </Button>
      </Space>

      <Typography className="mt-8 text-2xl">Draw Count: {drawCount}</Typography>
      <Typography className="text-zinc-500 font-medium text-lg italic">
        * since contract creation
      </Typography>

      <Typography className="mt-8 text-2xl">Draw Finish: {drawCount} Entrants</Typography>

      <Typography className="mt-2 text-lg">Enter now and reveal the winner instantly!</Typography>

      <Button type="primary" size="large" className="w-[350px] mt-10">
        Enter Draw
      </Button>
    </div>
  );
}
