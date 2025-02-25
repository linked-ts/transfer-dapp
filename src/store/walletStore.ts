import { create } from "zustand";
import { ethers } from "ethers";

interface WalletState {
  account: string | null;
  balance: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  connectWallet: () => Promise<void>;
}

declare let window: any;

export const useWalletStore = create<WalletState>((set) => ({
  account: null,
  balance: null,
  provider: null,
  signer: null,

  connectWallet: async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = await provider.getSigner();
    const account = await signer.getAddress();
    const balance = await provider.getBalance(account);

    set({
      provider,
      signer,
      account,
      balance: ethers.formatEther(balance),
    });
  },
}));
