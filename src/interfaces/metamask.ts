export interface WalletInfo {
  accounts: any[];
  balance: string;
  chainId: string;
}

export interface MetaMaskContextData {
  wallet: WalletInfo;
  hasProvider: boolean | null;
  isConnecting: boolean;
  connectMetaMask: () => void;
}
