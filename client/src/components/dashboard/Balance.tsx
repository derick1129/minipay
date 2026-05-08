interface BalanceProps {
  value: number;
}

export default function Balance({
  value,
}: BalanceProps) {
  return (
    <div className="flex gap-2 text-lg font-semibold mt-8 px-6">
      <span>Your Balance</span>
      <span>₹ {value}</span>
    </div>
  );
}