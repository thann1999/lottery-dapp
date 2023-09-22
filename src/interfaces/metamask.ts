import { Chain } from './chains';

export interface WalletInfo {
  accounts: any[];
  balance: string;
  chain: Chain;
}

export interface MetaMaskContextData {
  wallet: WalletInfo;
  hasProvider: boolean | null;
  isConnecting: boolean;
  connectMetaMask: () => void;
  disconnectMetaMask: () => void;
  switchNetwork: () => void;
}
