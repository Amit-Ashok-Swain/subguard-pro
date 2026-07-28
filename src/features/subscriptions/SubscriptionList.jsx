import { useSelector } from "react-redux";
import SubscriptionCard from "./SubscriptionCard";
import { CreditCard } from "lucide-react";

export default function SubscriptionList() {
  const subscriptions =
    useSelector((state) => state.subscriptions?.items) || [];
  const ui = useSelector((state) => state.ui) || {};
  const searchQuery = ui.searchQuery || "";
  const categoryFilter = ui.categoryFilter || "All";
  const sortBy = ui.sortBy || "Recently Added";

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

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch = sub.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || sub.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    switch (sortBy) {
      case "Price: High to Low":
        return getMonthlyCost(b) - getMonthlyCost(a);
      case "Price: Low to High":
        return getMonthlyCost(a) - getMonthlyCost(b);
      case "Name: A to Z":
        return a.name.localeCompare(b.name);
      case "Recently Added":
      default:
        return 0;
    }
  });

  if (subscriptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 glass-card border-dashed border-white/10 text-center">
        <div className="p-4 bg-orange-500/15 rounded-2xl border border-orange-500/30 text-[#ff7f50] mb-4 shadow-lg shadow-orange-500/10">
          <CreditCard size={32} />
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight mb-1">
          No active subscriptions
        </h3>
        <p className="text-xs text-neutral-400 font-medium">
          Add your first subscription above to start tracking.
        </p>
      </div>
    );
  }

  if (sortedSubscriptions.length === 0) {
    return (
      <div className="glass-card p-8 text-center text-neutral-400 text-sm border-white/10 shadow-xl">
        No subscriptions match your search or filter criteria.
      </div>
    );
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          Active Subscriptions
        </h2>
        <span className="text-xs bg-neutral-900/90 text-orange-400 border border-orange-500/20 px-2.5 py-1 rounded-lg font-semibold shadow-sm">
          {sortedSubscriptions.length} results
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {sortedSubscriptions.map((sub, index) => (
          <SubscriptionCard key={sub.id} sub={sub} index={index} />
        ))}
      </div>
    </div>
  );
}