import { Breadcrumb, Button, Layout, Menu, Typography, theme } from 'antd';

import { useMetaMask } from '@root/hooks';
import { formatAddress } from '@root/utils';

const { Header, Content, Footer } = Layout;

export default function HeaderComponent() {
  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();

  return (
    <Header className="flex items-center justify-between">
      <div />

      <div className="flex">
        {!hasProvider && (
          <Typography.Link href="https://metamask.io" target="_blank">
            Install MetaMask
          </Typography.Link>
        )}

        {window.ethereum.isMetaMask && wallet.accounts.length < 1 && (
          <Button disabled={isConnecting} onClick={connectMetaMask} type="primary">
            Connect wallet
          </Button>
        )}

        {hasProvider && !!wallet.accounts.length && (
          <Typography.Link href={`https://etherscan.io/address/${wallet}`} target="_blank">
            {formatAddress(wallet.accounts[0])}
          </Typography.Link>
        )}
      </div>
    </Header>
  );
}
