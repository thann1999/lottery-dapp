/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import detectEthereumProvider from '@metamask/detect-provider';

import { web3 } from '@root/configs';
import {
  CHAINS,
  ChainId,
  LocalStorageKey,
  MetamaskRequestMethod,
  SupportChainId,
} from '@root/constants';
import { Chain, MetaMaskContextData, WalletInfo } from '@root/interfaces';
import { getChainInfo } from '@root/utils';
import { storageService } from '@services';

const disconnectedState: WalletInfo = { accounts: [], balance: '0', chain: {} as Chain };

const MetaMaskContext = createContext<MetaMaskContextData>({} as MetaMaskContextData);

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCorrectChain, setIsCorrectChain] = useState(false);
  const [wallet, setWallet] = useState(disconnectedState);

  const updateWallet = useCallback(async (providedAccounts?: any, isChangeChain?: boolean) => {
    let accounts = providedAccounts;

    // When user disconnect from metamask wallet extension
    if (accounts && !accounts.length) {
      disconnectMetaMask();
      return;
    }

    // Automatic login when user already logged in
    if (storageService.get(LocalStorageKey.IsKeepConnect) && !accounts) {
      setIsConnecting(true);
      accounts = await window.ethereum?.request({
        method: MetamaskRequestMethod.Login,
      });
    }

    // When user not login
    if (!accounts) {
      setIsConnecting(false);
      setIsCorrectChain(false);
      return;
    }

    const balance = Number(web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether'));
    const chainIdHex = await web3.eth.getChainId();
    const chainId = Number(chainIdHex);

    // When user connect wrong network
    const isCorrectChain = [SupportChainId.Linea, SupportChainId.Sepolia].includes(chainId);
    if (!isCorrectChain && !isChangeChain) {
      switchNetwork();
    }

    setIsConnecting(false);
    setIsCorrectChain(isCorrectChain);
    setWallet({
      accounts,
      balance: balance > 0 ? balance.toFixed(4) : '0',
      chain: getChainInfo(chainId),
    });
  }, []);

  const handleChangeChain = useCallback(() => updateWallet(undefined, true), [updateWallet]);
  const handleChangeWallet = useCallback((accounts: any) => updateWallet(accounts), [updateWallet]);

  /**
   * This logic checks if MetaMask is installed. If it is, some event handlers are set up
   * to update the wallet state when MetaMask changes. The function returned by useEffect
   * is used as a "cleanup": it removes the event handlers whenever the MetaMaskProvider
   * is unmounted.
   */
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        handleChangeChain();
        window.ethereum?.on('accountsChanged', handleChangeWallet);
        window.ethereum?.on('chainChanged', handleChangeChain);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleChangeWallet);
      window.ethereum?.removeListener('chainChanged', handleChangeChain);
    };
  }, [handleChangeWallet, handleChangeChain]);

  const connectMetaMask = async () => {
    setIsConnecting(true);
    try {
      const accounts = await window.ethereum?.request({
        method: MetamaskRequestMethod.Login,
      });
      handleChangeWallet(accounts);
      storageService.set(LocalStorageKey.IsKeepConnect, 1);
    } catch (err: any) {
      // Handle error
    }
    setIsConnecting(false);
  };

  const disconnectMetaMask = () => {
    setWallet(disconnectedState);
    setIsCorrectChain(false);
    storageService.remove(LocalStorageKey.IsKeepConnect);
  };

  const switchNetwork = async (chainId: number = ChainId.Sepolia) => {
    try {
      await window.ethereum?.request({
        method: MetamaskRequestMethod.SwitchChain,
        params: [{ chainId: web3.utils.numberToHex(chainId) }],
      });
    } catch (switchError: any) {
      const newChain = CHAINS[chainId];
      if (switchError.code === 4902 && newChain) {
        try {
          await window.ethereum?.request({
            method: MetamaskRequestMethod.AddChain,
            params: [
              {
                chainId,
                chainName: newChain.name,
                rpcUrls: newChain.rpc /* ... */,
              },
            ],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
    }
  };

  const contextValue = useMemo(
    () => ({
      wallet,
      hasProvider,
      isConnecting,
      isCorrectChain,
      connectMetaMask,
      disconnectMetaMask,
      switchNetwork,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wallet, hasProvider, isConnecting, isCorrectChain]
  );

  return <MetaMaskContext.Provider value={contextValue}>{children}</MetaMaskContext.Provider>;
};

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error('useMetaMask must be used within a "MetaMaskContextProvider"');
  }
  return context;
};
