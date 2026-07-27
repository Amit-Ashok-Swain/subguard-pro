import { useSelector } from "react-redux";
import { CreditCard } from "lucide-react";

export default function PaymentMethodBreakdown() {
  const subscriptions = useSelector((state) => state.subscriptions.items) || [];
  const currency = useSelector((state) => state.ui?.currency) || {
    symbol: "$",
    multiplier: 1,
  };

  const activeSubs = subscriptions.filter(
    (s) => !s.status || s.status === "Active",
  );
  const totalSpend = activeSubs.reduce((sum, s) => sum + (s.cost || 0), 0);

  const methods = [
    "Credit Card",
    "PayPal",
    "Apple Pay",
    "Bank Transfer",
    "Crypto",
  ];

  const stats = methods
    .map((m) => {
      const methodSubs = activeSubs.filter(
        (s) => (s.paymentMethod || "Credit Card") === m,
      );
      const methodTotal = methodSubs.reduce((sum, s) => sum + (s.cost || 0), 0);
      const percentage =
        totalSpend > 0 ? Math.round((methodTotal / totalSpend) * 100) : 0;
      return {
        name: m,
        total: methodTotal,
        percentage,
        count: methodSubs.length,
      };
    })
    .filter((s) => s.total > 0);

  if (stats.length === 0) return null;

  return (
    <div className="glass-card p-6 border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

      <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2.5">
        <CreditCard size={18} className="text-[#ff7f50]" />
        Payment Methods
      </h2>
      <div className="flex flex-col gap-3">
        {stats.map((st) => (
          <div
            key={st.name}
            className="flex items-center justify-between text-sm bg-neutral-950/80 p-3.5 rounded-xl border border-white/5"
          >
            <span className="text-neutral-300 font-medium">
              {st.name}{" "}
              <span className="text-xs text-neutral-500">({st.count})</span>
            </span>
            <span className="text-[#ff7f50] font-bold tracking-tight">
              {currency.symbol}
              {(st.total * currency.multiplier).toFixed(2)}{" "}
              <span className="text-xs text-neutral-400 font-normal">
                ({st.percentage}%)
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
