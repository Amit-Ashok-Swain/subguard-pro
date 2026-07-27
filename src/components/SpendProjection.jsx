import { useSelector } from "react-redux";
import { TrendingUp, Calendar, ShieldAlert } from "lucide-react";

export default function SpendProjection() {
  const subscriptions = useSelector((state) => state.subscriptions.items) || [];
  const currency = useSelector((state) => state.ui?.currency) || {
    symbol: "$",
    multiplier: 1,
  };

  const activeSubs = subscriptions.filter(
    (s) => !s.status || s.status === "Active",
  );
  const monthlyTotal = activeSubs.reduce(
    (sum, sub) => sum + (sub.cost || 0),
    0,
  );

  const oneYearTotal = monthlyTotal * 12 * currency.multiplier;
  const threeYearTotal = monthlyTotal * 36 * currency.multiplier;

  if (activeSubs.length === 0) return null;

  return (
    <div className="glass-card p-6 border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

      <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2.5">
        <TrendingUp size={18} className="text-[#ff7f50]" />
        Commitment Forecast
      </h2>

      <p className="text-xs text-neutral-400 mb-4">
        Projected cumulative spending if current active subscriptions remain
        unchanged:
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-neutral-950/80 p-3.5 rounded-xl border border-white/5">
          <p className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5 mb-1">
            <Calendar size={13} className="text-[#ff7f50]" /> 1-Year Forecast
          </p>
          <p className="text-base sm:text-lg font-extrabold text-white tracking-tight">
            {currency.symbol}
            {oneYearTotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="bg-neutral-950/80 p-3.5 rounded-xl border border-white/5">
          <p className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5 mb-1">
            <ShieldAlert size={13} className="text-amber-400" /> 3-Year
            Commitment
          </p>
          <p className="text-base sm:text-lg font-extrabold text-amber-400 tracking-tight">
            {currency.symbol}
            {threeYearTotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
