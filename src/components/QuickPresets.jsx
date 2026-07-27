import { useDispatch } from "react-redux";
import { addSubscription } from "../features/subscriptions/subscriptionSlice";
import { Zap } from "lucide-react";
import { toast } from "react-toastify";

const POPULAR_PRESETS = [
  {
    name: "Netflix",
    cost: 15.99,
    category: "Entertainment",
    paymentMethod: "Credit Card",
    currency: "USD",
  },
  {
    name: "Spotify",
    cost: 10.99,
    category: "Entertainment",
    paymentMethod: "Apple Pay",
    currency: "USD",
  },
  {
    name: "GitHub Copilot",
    cost: 10.0,
    category: "Software",
    paymentMethod: "Credit Card",
    currency: "USD",
  },
  {
    name: "OpenAI ChatGPT",
    cost: 20.0,
    category: "Software",
    paymentMethod: "Credit Card",
    currency: "USD",
  },
  {
    name: "Amazon Prime",
    cost: 14.99,
    category: "Utilities",
    paymentMethod: "Credit Card",
    currency: "USD",
  },
  {
    name: "Notion Pro",
    cost: 10.0,
    category: "Software",
    paymentMethod: "Apple Pay",
    currency: "USD",
  },
];

export default function QuickPresets() {
  const dispatch = useDispatch();

  const handleQuickAdd = (preset) => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const newSub = {
      id: crypto.randomUUID(),
      name: preset.name,
      cost: preset.cost,
      currency: preset.currency,
      category: preset.category,
      paymentMethod: preset.paymentMethod,
      status: "Active",
      isTrial: false,
      renewalDate: nextWeek.toISOString().split("T")[0],
      notes: "Quick-added from presets",
      tags: ["Popular"],
    };

    dispatch(addSubscription(newSub));
    toast.success(`Added ${preset.name} instantly!`);
  };

  return (
    <div className="glass-card p-6 border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

      <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2.5">
        <Zap size={18} className="text-orange-400" />
        Quick-Add Popular Services
      </h2>
      <p className="text-xs text-neutral-400 mb-4">
        Click any preset to instantly add it to your active tracker:
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {POPULAR_PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => handleQuickAdd(preset)}
            className="bg-neutral-950/80 hover:bg-neutral-900 border border-white/5 hover:border-orange-500/40 p-3 rounded-xl text-left transition-all flex flex-col justify-between group shadow-lg"
          >
            <span className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors truncate">
              {preset.name}
            </span>
            <span className="text-xs text-neutral-400 mt-1 font-medium">
              ${preset.cost.toFixed(2)} /mo
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
