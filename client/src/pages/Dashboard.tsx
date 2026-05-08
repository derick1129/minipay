import { useEffect, useState } from "react";
import api from "../lib/axios";
import Appbar from "../components/dashboard/Appbar";
import Balance from "../components/dashboard/Balance";
import Users from "../components/dashboard/Users";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const response = await api.get("/account/balance");

        setBalance(response.data.balance);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBalance();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Appbar name="Derick" />
      <Balance value={balance} />
      <Users />
    </div>
  );
}
