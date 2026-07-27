import { useSelector } from "react-redux";
import { BarChart3, TrendingDown, Layers } from "lucide-react";

export default function AnalyticsInsights() {
  const subscriptions = useSelector((state) => state.subscriptions.items) || [];
  const currency = useSelector((state) => state.ui?.currency) || {
    symbol: "$",
    multiplier: 1,
  };

  if (subscriptions.length === 0) {
    return (
      <div className="glass-card p-6 border-white/10 shadow-2xl text-center text-neutral-400 text-sm">
        <BarChart3
          size={32}
          className="mx-auto mb-2 opacity-30 text-[#ff7f50]"
        />
        Add subscriptions to view advanced financial insights.
      </div>
    );
  }

  const totalCost = subscriptions.reduce(
    (sum, sub) => sum + (sub.cost || 0),
    0,
  );
  const averageCost = totalCost / subscriptions.length;
  const convertedAvg = averageCost * currency.multiplier;

  const cheapestSub = subscriptions.reduce(
    (prev, current) => (prev && prev.cost < current.cost ? prev : current),
    subscriptions[0],
  );
  const convertedCheapest = cheapestSub
    ? cheapestSub.cost * currency.multiplier
    : 0;

  const categoryCounts = subscriptions.reduce((acc, sub) => {
    const cat = sub.category || "General";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  let mostFrequentCategory = "None";
  let maxCount = 0;
  Object.entries(categoryCounts).forEach(([cat, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostFrequentCategory = cat;
    }
  });

  return (
    <div className="glass-card p-6 border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

      <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2.5">
        <BarChart3 size={18} className="text-[#ff7f50]" />
        Advanced Insights
      </h2>

      <div className="grid grid-cols-1 gap-3">
        <div className="bg-neutral-950/80 p-3.5 rounded-xl border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/15 text-orange-400 rounded-xl border border-orange-500/30">
              <BarChart3 size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Average Subscription
              </p>
              <p className="text-sm font-semibold text-white">
                Per active plan
              </p>
            </div>
          </div>
          <span className="text-[#ff7f50] font-bold tracking-tight">
            {currency.symbol}
            {convertedAvg.toFixed(2)}
          </span>
        </div>

        <div className="bg-neutral-950/80 p-3.5 rounded-xl border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/15 text-blue-400 rounded-xl border border-blue-500/30">
              <TrendingDown size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Cheapest Service
              </p>
              <p className="text-sm font-semibold text-white truncate max-w-[120px]">
                {cheapestSub ? cheapestSub.name : "N/A"}
              </p>
            </div>
          </div>
          <span className="text-blue-400 font-bold tracking-tight">
            {currency.symbol}
            {convertedCheapest.toFixed(2)}
          </span>
        </div>

        <div className="bg-neutral-950/80 p-3.5 rounded-xl border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/15 text-purple-400 rounded-xl border border-purple-500/30">
              <Layers size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Top Category
              </p>
              <p className="text-sm font-semibold text-white">
                {mostFrequentCategory}
              </p>
            </div>
          </div>
          <span className="text-purple-400 text-xs bg-purple-500/15 border border-purple-500/30 px-2.5 py-1 rounded-full font-semibold">
            {maxCount} plans
          </span>
        </div>
      </div>
    </div>
  );
}
