"use client";

import { useState } from "react";
import { useWalletStore } from "@/store/walletStore";
import { ethers } from "ethers";

const SendETH = () => {
  const { signer } = useWalletStore();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const sendETH = async () => {
    if (!signer) {
      alert("Connect Wallet first!");
      return;
    }

    try {
      const tx = await signer.sendTransaction({
        to,
        value: ethers.parseEther(amount),
      });

      await tx.wait();
      alert(`Transaction successful! Hash: ${tx.hash}`);
    } catch (error) {
      console.error("Transaction failed", error);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h2 className="text-lg font-semibold mb-2">Send ETH</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={sendETH}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Send
      </button>
    </div>
  );
};

export default SendETH;
