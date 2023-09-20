import { Button, Layout, Typography } from 'antd';

import { ModalSize } from '@root/constants';
import { useMetaMask, useModal } from '@root/hooks';
import { formatAddress } from '@root/utils';

import DetailWalletModalBody from '../detail-wallet-modal';

const { Header } = Layout;

export default function HeaderComponent() {
  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();
  const { open: openDetailWallet, ModalComponent: DetailWalletModal } = useModal({
    modalBody: DetailWalletModalBody,
    displayFooter: false,
    width: ModalSize.XS,
  });

  const handleViewDetailWallet = () => {
    openDetailWallet({
      title: 'Account',
      data: wallet,
    });
  };

  return (
    <>
      <Header className="flex items-center justify-between bg-transparent">
        <div />

        <div className="flex">
          {!hasProvider && (
            <Typography.Link href="https://metamask.io" target="_blank">
              Install MetaMask
            </Typography.Link>
          )}

          {window.ethereum.isMetaMask && wallet.accounts.length < 1 && (
            <Button size="large" disabled={isConnecting} onClick={connectMetaMask} type="primary">
              Connect wallet
            </Button>
          )}

          {hasProvider && !!wallet.accounts.length && (
            <Button size="large" type="primary" onClick={handleViewDetailWallet}>
              {formatAddress(wallet.accounts[0])}
            </Button>
          )}
        </div>
      </Header>

      <DetailWalletModal />
    </>
  );
}
