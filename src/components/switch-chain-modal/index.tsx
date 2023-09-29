import { Button, Space, Typography } from 'antd';

import switchNetworkImg from '@assets/images/switch-network.png';
import { useMetaMask } from '@root/hooks';
import { ModalBodyProps } from '@root/interfaces';

export default function SwitchChainModalBody({ closeModal }: ModalBodyProps) {
  const { disconnectMetaMask, switchNetwork } = useMetaMask();

  const handleDisconnect = () => {
    disconnectMetaMask();
    closeModal();
  };

  return (
    <div className="text-center">
      <img src={switchNetworkImg} alt="switch-network" className="h-16 mb-5" />

      <Typography.Title level={4}>Your wallet is not on the chosen network</Typography.Title>
      <Typography className="text-zinc-500">
        You have connected to a different network from Sepolia Testnet. Please click the button
        below to change it.
      </Typography>

      <Space direction="horizontal" className="mt-5">
        <Button size="large" onClick={handleDisconnect}>
          Disconnect
        </Button>
        <Button type="primary" size="large" onClick={() => switchNetwork()}>
          Switch network
        </Button>
      </Space>
    </div>
  );
}
