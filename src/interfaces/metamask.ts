import { Chain } from './chains';

export interface WalletInfo {
  accounts: string[];
  balance: string;
  chain: Chain;
}

export interface MetaMaskContextData {
  wallet: WalletInfo;
  hasProvider: boolean | null;
  isConnecting: boolean;
  isCorrectChain: boolean;
  connectMetaMask: () => void;
  disconnectMetaMask: () => void;
  switchNetwork: (chainId?: number) => void;
}
