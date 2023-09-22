import { useEffect, useMemo } from 'react';

import { Icon } from '@iconify/react';
import { Button, Layout, Select, Typography } from 'antd';

import { ModalSize, SUPPORTED_CHAINS } from '@root/constants';
import { useMetaMask, useModal } from '@root/hooks';
import { formatAddress } from '@root/utils';

import DetailWalletModalBody from '../detail-wallet-modal';
import SwitchChainModalBody from '../switch-chain-modal';

const { Header } = Layout;

export default function HeaderComponent() {
  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();
  const { open: openDetailWallet, ModalComponent: DetailWalletModal } = useModal({
    modalBody: DetailWalletModalBody,
    displayFooter: false,
    width: ModalSize.XS,
  });
  const {
    open: openSwitchNetwork,
    ModalComponent: SwitchNetworkModal,
    close: closeSwitchNetwork,
  } = useModal({
    modalBody: SwitchChainModalBody,
    displayFooter: false,
    width: ModalSize.SM,
  });

  const isCorrectChain = useMemo(
    () => !!SUPPORTED_CHAINS.find((item) => item.value === wallet.chain?.chainId),
    [wallet.chain]
  );

  useEffect(() => {
    if (!wallet.accounts?.length) {
      return;
    }

    if (isCorrectChain) {
      closeSwitchNetwork();
    } else {
      openSwitchNetwork({
        title: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCorrectChain, wallet.accounts]);

  const handleViewDetailWallet = () => {
    if (isCorrectChain) {
      openDetailWallet({
        title: 'Account Overview',
      });
      return;
    }

    openSwitchNetwork({
      title: '',
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

          {hasProvider && (
            <Select
              size="large"
              defaultValue="lucy"
              allowClear
              options={[{ value: 'lucy', label: 'Lucy' }]}
              className="mr-4"
            />
          )}

          {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
            <Button size="large" loading={isConnecting} onClick={connectMetaMask} type="primary">
              Connect wallet
            </Button>
          )}

          {hasProvider && !!wallet.accounts.length && (
            <Button
              size="large"
              type="primary"
              className="flex items-center"
              onClick={handleViewDetailWallet}
              icon={<Icon icon="iconoir:wallet" fontSize={20} />}
            >
              {isCorrectChain ? formatAddress(wallet.accounts[0]) : 'Switch chain'}
            </Button>
          )}
        </div>
      </Header>

      <DetailWalletModal />
      <SwitchNetworkModal />
    </>
  );
}
