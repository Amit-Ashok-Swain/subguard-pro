import { useSelector } from "react-redux";
import { DollarSign, Zap, Calendar, TrendingUp } from "lucide-react";

export default function DashboardMetrics() {
  const subscriptions =
    useSelector((state) => state.subscriptions?.items) || [];
  const isYearly = useSelector((state) => state.ui?.isYearlyView);
  const currency = useSelector((state) => state.ui?.currency) || {
    symbol: "$",
    multiplier: 1,
  };

  const activeSubs = subscriptions.filter(
    (sub) => !sub.status || sub.status === "Active",
  );

  const getMonthlyCost = (sub) => {
    const cost = sub.cost || 0;
    switch (sub.billingCycle) {
      case "Annually":
        return cost / 12;
      case "Semi-Annually":
        return cost / 6;
      case "Quarterly":
        return cost / 3;
      case "Monthly":
      default:
        return cost;
    }
  };

  const totalMonthlyCost = activeSubs.reduce(
    (total, sub) => total + getMonthlyCost(sub),
    0,
  );

  const timeMultiplier = isYearly ? 12 : 1;
  const displayTotal = totalMonthlyCost * timeMultiplier * currency.multiplier;

  const activeTrials = activeSubs.filter((sub) => sub.isTrial).length;
  const activePlans = activeSubs.length;

  const highestSub = activeSubs.reduce((prev, current) => {
    if (!prev) return current;
    return getMonthlyCost(prev) > getMonthlyCost(current) ? prev : current;
  }, null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="glass-card p-6 border-white/10 relative overflow-hidden group hover:border-orange-500/30 transition-all">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-all" />
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-orange-500/15 rounded-xl border border-orange-500/30 text-orange-400">
            <DollarSign size={20} />
          </div>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Total Spend
          </p>
        </div>
        <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {currency.symbol}
          {displayTotal.toFixed(2)}
        </p>
        <p className="text-xs text-neutral-500 mt-1 font-medium">
          {isYearly ? "per year" : "per month"}
        </p>
      </div>

      <div className="glass-card p-6 border-white/10 relative overflow-hidden group hover:border-orange-500/30 transition-all">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-all" />
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-amber-500/15 rounded-xl border border-amber-500/30 text-amber-400">
            <Zap size={20} />
          </div>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Active Plans
          </p>
        </div>
        <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {activePlans}
        </p>
        <p className="text-xs text-neutral-500 mt-1 font-medium">
          total tracked services
        </p>
      </div>

      <div className="glass-card p-6 border-white/10 relative overflow-hidden group hover:border-orange-500/30 transition-all">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-all" />
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-peach-500/15 rounded-xl border border-[#ff7f50]/30 text-[#ff7f50]">
            <Calendar size={20} />
          </div>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Free Trials
          </p>
        </div>
        <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {activeTrials}
        </p>
        <p className="text-xs text-neutral-500 mt-1 font-medium">
          expiring soon
        </p>
      </div>

      <div className="glass-card p-6 border-white/10 relative overflow-hidden group hover:border-orange-500/30 transition-all">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-all" />
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-orange-500/15 rounded-xl border border-orange-500/30 text-orange-400">
            <TrendingUp size={20} />
          </div>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Highest Expense
          </p>
        </div>
        <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {highestSub
            ? `${currency.symbol}${(getMonthlyCost(highestSub) * timeMultiplier * currency.multiplier).toFixed(2)}`
            : `${currency.symbol}0.00`}
        </p>
        <p className="text-xs text-neutral-500 mt-1 font-medium truncate">
          {highestSub ? highestSub.name : "No data"}
        </p>
      </div>
    </div>
  );
}
