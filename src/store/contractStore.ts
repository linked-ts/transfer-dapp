import { create } from "zustand";
import { ethers } from "ethers";
import { useWalletStore } from "./walletStore";

interface ContractState {
  contract: ethers.Contract | null;
  loadContract: (address: string, abi: any) => void;
  sendTokens: (to: string, amount: string) => Promise<void>;
}

export const useContractStore = create<ContractState>((set, get) => ({
  contract: null,

  loadContract: (address, abi) => {
    const { signer } = useWalletStore.getState();
    if (!signer) return alert("Wallet not connected");

    const contract = new ethers.Contract(address, abi, signer);
    set({ contract });
  },

  sendTokens: async (to, amount) => {
    const { contract } = get();
    if (!contract) return alert("Contract not loaded");

    try {
      const tx = await contract.transfer(to, ethers.parseUnits(amount, 18));
      await tx.wait();
      alert(`Tokens sent! Hash: ${tx.hash}`);
    } catch (error) {
      console.error("Token transfer failed", error);
    }
  },
}));
