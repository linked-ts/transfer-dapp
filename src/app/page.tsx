"use client";

import { useWalletStore } from "@/store/walletStore";
import SendETH from "@/components/SendETH";
import SendTokens from "@/components/SendTokens";

export default function Home() {
  const { account, connectWallet } = useWalletStore();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <button
        onClick={connectWallet}
        className="bg-blue-600 text-white p-2 rounded mb-4"
      >
        {account ? `Connected: ${account}` : "Connect Wallet"}
      </button>
      {account && (
        <div className="w-full max-w-md">
          <SendETH />
          <SendTokens />
        </div>
      )}
    </main>
  );
}
