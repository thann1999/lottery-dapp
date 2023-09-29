import { useEffect, useMemo, useState } from 'react';

import { Icon } from '@iconify/react';
import { Button, Layout, Popover, Select, Space, Typography } from 'antd';
import clsx from 'clsx';
import { useMatches, useNavigate } from 'react-router-dom';

import logo from '@assets/images/logo.png';
import { ChainId, HEADER_MENU, ModalSize, CHAINS } from '@root/constants';
import { useMetaMask, useModal } from '@root/hooks';
import { formatAddress, getMintPath } from '@root/utils';
import variables from '@styles/_variables.module.scss';

import DetailWalletModalBody from '../detail-wallet-modal';
import SettingWeb from '../setting-web/SettingWeb';
import SwitchChainModalBody from '../switch-chain-modal';

const { Header } = Layout;

export const SUPPORTED_CHAINS = [
  {
    label: (
      <div className="flex items-center h-full">
        <Icon icon="cryptocurrency-color:eth" fontSize={18} />
        <Typography.Text className="ml-2">{CHAINS[ChainId.Sepolia].name}</Typography.Text>
      </div>
    ),
    value: ChainId.Sepolia,
  },
  {
    label: (
      <div className="flex items-center h-full">
        <Icon icon="cryptocurrency-color:eth" fontSize={18} />
        <Typography.Text className="ml-2">{CHAINS[ChainId.Linea].name}</Typography.Text>
      </div>
    ),
    value: ChainId.Linea,
  },
];

export default function HeaderComponent() {
  const [openSetting, setOpenSetting] = useState(false);
  const navigate = useNavigate();
  const { wallet, hasProvider, isConnecting, connectMetaMask, switchNetwork } = useMetaMask();
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
  const matches = useMatches();
  const queryMatches = matches.filter((item) => !!item.handle);
  const activeKey = (queryMatches.filter((item) => !!(item.handle as any)?.key)[0]?.handle as any)
    ?.key;

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

  const handleInstallMetaMask = () => {
    window.open('https://metamask.io', '_blank');
  };

  const handleNavigate = (href: string, isDisabled?: boolean) => {
    if (isDisabled) return;

    navigate(href);
  };

  const handleChangeChain = (value: number) => {
    switchNetwork(value);
  };

  return (
    <>
      <Header className="flex items-center justify-between xl:px-32 bg-transparent h-20">
        <Space direction="horizontal" size="small">
          <img
            src={logo}
            alt="logo"
            className="h-11 cursor-pointer"
            onClick={() => navigate(getMintPath())}
          />

          {HEADER_MENU.map((item) => (
            <Typography
              key={item.key}
              onClick={() => handleNavigate(item.href, item.isDisabled)}
              // disabled={item.isDisabled}
              className={clsx('font-medium  text-base hidden md:block text ml-10', {
                'text-primary': activeKey === item.key,
                'cursor-pointer': !item.isDisabled,
              })}
            >
              {item.label}
            </Typography>
          ))}
        </Space>

        <div className="flex items-center">
          {!hasProvider && (
            <Button size="large" onClick={handleInstallMetaMask} type="primary">
              Install MetaMask
            </Button>
          )}

          {hasProvider && (
            <Select
              size="large"
              options={SUPPORTED_CHAINS}
              onChange={handleChangeChain}
              value={isCorrectChain ? wallet.chain?.chainId : SUPPORTED_CHAINS[0].value}
              className="w-36 mx-4"
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
              className="flex items-center mx-4"
              onClick={handleViewDetailWallet}
              icon={<Icon icon="iconoir:wallet" fontSize={20} />}
            >
              {isCorrectChain ? formatAddress(wallet.accounts[0]) : 'Switch chain'}
            </Button>
          )}

          <Popover
            trigger="click"
            content={<SettingWeb handleClose={() => setOpenSetting(false)} />}
            open={openSetting}
            placement="topRight"
            onOpenChange={setOpenSetting}
          >
            <Icon icon="uil:setting" fontSize={28} className="cursor-pointer mt-0.5 ml-4" />
          </Popover>
        </div>
      </Header>

      <DetailWalletModal />
      <SwitchNetworkModal />
    </>
  );
}
