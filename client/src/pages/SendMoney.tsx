import { useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import api from "../lib/axios";

export default function SendMoney() {
  const [amount, setAmount] = useState("");

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("name");

  async function handleTransfer() {
    try {
      await api.post("/account/transfer", {
        to: id,
        amount: Number(amount),
      });

      alert("Transfer successful");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Transfer failed");
    }
  }

  return (
    <div className="h-screen bg-slate-200 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <h1 className="text-2xl font-bold text-center mb-8">
          Send Money
        </h1>

        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-full h-12 w-12 bg-green-500 text-white flex items-center justify-center text-xl">
            {name?.[0].toUpperCase()}
          </div>

          <span className="text-xl font-semibold">
            {name}
          </span>
        </div>

        <label className="block mb-2 font-medium">
          Amount (₹)
        </label>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="w-full px-3 py-2 border rounded-lg"
        />

        <button
          onClick={handleTransfer}
          className="w-full mt-6 bg-green-500 text-white py-2 rounded-lg hover:opacity-90"
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
}