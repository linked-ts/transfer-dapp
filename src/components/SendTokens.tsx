"use client";

import { useState } from "react";
import { useContractStore } from "@/store/contractStore";

const SendTokens = () => {
  const { sendTokens } = useContractStore();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h2 className="text-lg font-semibold mb-2">Send Tokens</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={() => sendTokens(to, amount)}
        className="bg-green-500 text-white p-2 rounded w-full"
      >
        Send
      </button>
    </div>
  );
};

export default SendTokens;
