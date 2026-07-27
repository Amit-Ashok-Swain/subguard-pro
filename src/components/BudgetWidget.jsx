import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMonthlyBudget } from "../features/ui/uiSlice";
import { Target, Edit3, Check, AlertCircle } from "lucide-react";

export default function BudgetWidget() {
  const dispatch = useDispatch();
  const subscriptions = useSelector((state) => state.subscriptions.items) || [];
  const monthlyBudget = useSelector((state) => state.ui?.monthlyBudget) || 150;
  const currency = useSelector((state) => state.ui?.currency) || {
    symbol: "$",
    multiplier: 1,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [budgetValue, setBudgetValue] = useState(monthlyBudget);

  const activeSubs = subscriptions.filter(
    (s) => !s.status || s.status === "Active",
  );
  const totalMonthlySpend = activeSubs.reduce(
    (sum, sub) => sum + (sub.cost || 0),
    0,
  );
  const convertedSpend = totalMonthlySpend * currency.multiplier;
  const convertedBudget = monthlyBudget * currency.multiplier;

  const percentage =
    monthlyBudget > 0
      ? Math.min(Math.round((totalMonthlySpend / monthlyBudget) * 100), 100)
      : 0;

  const isOverBudget = totalMonthlySpend > monthlyBudget;
  const isWarning = percentage >= 80 && !isOverBudget;

  const handleSave = (e) => {
    e.preventDefault();
    const val = parseFloat(budgetValue);
    if (!isNaN(val) && val > 0) {
      dispatch(setMonthlyBudget(val));
    }
    setIsEditing(false);
  };

  return (
    <div className="glass-card p-6 border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2.5">
          <Target size={18} className="text-[#ff7f50]" />
          Monthly Budget Goal
        </h2>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-neutral-400 hover:text-white p-1.5 rounded-xl hover:bg-neutral-800 transition-all border border-transparent hover:border-white/10"
          >
            <Edit3 size={15} />
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="text-orange-400 hover:text-orange-300 p-1.5 rounded-xl hover:bg-neutral-800 transition-all border border-transparent hover:border-white/10"
          >
            <Check size={15} />
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="flex justify-between items-end mb-3">
          <div>
            <p className="text-2xl font-extrabold text-white tracking-tight">
              {currency.symbol}
              {convertedSpend.toFixed(2)}
              <span className="text-xs font-medium text-neutral-400 ml-1">
                / {currency.symbol}
                {convertedBudget.toFixed(0)}
              </span>
            </p>
          </div>
          <span
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
              isOverBudget
                ? "bg-red-500/15 text-red-400 border-red-500/30"
                : isWarning
                  ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                  : "bg-orange-500/15 text-orange-400 border-orange-500/30"
            }`}
          >
            {percentage}% Spent
          </span>
        </div>
      ) : (
        <form onSubmit={handleSave} className="flex gap-2 mb-3">
          <input
            type="number"
            autoFocus
            value={budgetValue}
            onChange={(e) => setBudgetValue(e.target.value)}
            className="w-full glass-input px-3.5 py-1.5 text-sm"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-[#ff7f50] text-white px-4 py-1.5 rounded-xl font-bold text-xs shadow-md shadow-orange-500/20"
          >
            Save
          </button>
        </form>
      )}

      <div className="w-full bg-neutral-950/90 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/5">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isOverBudget
              ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
              : isWarning
                ? "bg-amber-500"
                : "bg-gradient-to-r from-orange-500 to-[#ff7f50]"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {isOverBudget && (
        <p className="text-xs text-red-400 mt-2.5 flex items-center gap-1.5 font-medium">
          <AlertCircle size={13} /> You have exceeded your monthly budget goal!
        </p>
      )}
    </div>
  );
}
