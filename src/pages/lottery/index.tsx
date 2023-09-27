import { useCallback, useEffect, useState } from 'react';

import { Typography } from 'antd';

import { lotteryContract } from '@root/configs';

export default function MintPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [manager, setManager] = useState('');

  const getContractInfo = useCallback(async () => {
    setIsLoading(true);
    const info = (await lotteryContract.methods.manager().call()) as string;
    setManager(info);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getContractInfo();
  }, [getContractInfo]);

  return (
    <>
      <Typography.Title level={4}>Contract information:</Typography.Title>

      <Typography>Address: {lotteryContract.options.address}</Typography>

      <Typography>Manager address: {manager}</Typography>
    </>
  );
}
