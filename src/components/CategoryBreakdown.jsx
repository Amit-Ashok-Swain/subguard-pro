import { useSelector } from "react-redux";
import { Layers } from "lucide-react";

const CATEGORY_COLORS = {
  Entertainment: "bg-purple-500",
  Software: "bg-blue-500",
  Utilities: "bg-amber-500",
  "Health & Fitness": "bg-emerald-500",
};

export default function CategoryBreakdown() {
  const subscriptions = useSelector((state) => state.subscriptions.items) || [];
  const currency = useSelector((state) => state.ui?.currency) || {
    symbol: "$",
    multiplier: 1,
  };
  const categories = useSelector((state) => state.ui?.categories) || [
    "Entertainment",
    "Software",
    "Utilities",
    "Health & Fitness",
  ];

  const activeSubs = subscriptions.filter(
    (s) => !s.status || s.status === "Active",
  );
  const totalSpend = activeSubs.reduce((sum, sub) => sum + (sub.cost || 0), 0);

  const categoryStats = categories
    .map((cat) => {
      const catSubs = activeSubs.filter((sub) => sub.category === cat);
      const catTotal = catSubs.reduce((sum, sub) => sum + (sub.cost || 0), 0);
      const percentage =
        totalSpend > 0 ? Math.round((catTotal / totalSpend) * 100) : 0;
      return { name: cat, total: catTotal, percentage, count: catSubs.length };
    })
    .filter((stat) => stat.total > 0)
    .sort((a, b) => b.total - a.total);

  if (activeSubs.length === 0 || categoryStats.length === 0) {
    return null;
  }

  return (
    <div className="glass-card p-6 border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

      <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2.5">
        <Layers size={18} className="text-[#ff7f50]" />
        Category Breakdown
      </h2>

      <div className="flex flex-col gap-4">
        {categoryStats.map((stat, idx) => {
          const convertedTotal = stat.total * currency.multiplier;
          const barColorClass = CATEGORY_COLORS[stat.name] || "bg-orange-500";

          return (
            <div key={stat.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-200 font-medium flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${barColorClass}`}
                  />
                  {stat.name}{" "}
                  <span className="text-xs text-neutral-500 font-normal">
                    ({stat.count})
                  </span>
                </span>
                <span className="text-white font-bold tracking-tight">
                  {currency.symbol}
                  {convertedTotal.toFixed(2)}{" "}
                  <span className="text-xs font-normal text-neutral-400">
                    ({stat.percentage}%)
                  </span>
                </span>
              </div>

              <div className="w-full bg-neutral-950/90 h-2 rounded-full overflow-hidden border border-white/5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barColorClass}`}
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
