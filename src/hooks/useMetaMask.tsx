/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  useContext,
  useCallback,
  useMemo,
} from 'react';

import detectEthereumProvider from '@metamask/detect-provider';

import { MetaMaskContextData, WalletInfo } from '@root/interfaces';
import { formatBalance } from '@root/utils';

const disconnectedState: WalletInfo = { accounts: [], balance: '', chainId: '' };

const MetaMaskContext = createContext<MetaMaskContextData>({} as MetaMaskContextData);

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);

  const [isConnecting, setIsConnecting] = useState(false);

  const [wallet, setWallet] = useState(disconnectedState);

  // useCallback ensures that you don't uselessly recreate the _updateWallet function on every render
  const updateWallet = useCallback(async (providedAccounts?: any) => {
    const accounts =
      providedAccounts || (await window.ethereum.request({ method: 'eth_accounts' }));

    if (accounts.length === 0) {
      // If there are no accounts, then the user is disconnected
      setWallet(disconnectedState);
      return;
    }

    const balance = formatBalance(
      (await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      })) as string
    );
    const chainId = (await window.ethereum.request({
      method: 'eth_chainId',
    })) as string;

    setWallet({ accounts, balance, chainId });
  }, []);

  const handleChangeChain = useCallback(() => updateWallet(), [updateWallet]);
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
        window.ethereum.on('accountsChanged', handleChangeWallet);
        window.ethereum.on('chainChanged', handleChangeChain);
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
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      handleChangeWallet(accounts);
    } catch (err: any) {
      // Handle error
    }
    setIsConnecting(false);
  };

  const contextValue = useMemo(
    () => ({
      wallet,
      hasProvider,
      isConnecting,
      connectMetaMask,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wallet, hasProvider, isConnecting]
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
