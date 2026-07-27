import { useDispatch, useSelector } from "react-redux";
import { toggleBillingCycle } from "./uiSlice";

export default function BillingToggle() {
  const dispatch = useDispatch();
  const isYearly = useSelector((state) => state.ui?.isYearlyView);

  return (
    <div className="flex items-center justify-center bg-neutral-950/80 p-1 rounded-xl border border-white/10 w-fit shadow-lg">
      <button
        onClick={() => {
          if (isYearly) dispatch(toggleBillingCycle());
        }}
        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          !isYearly
            ? "bg-gradient-to-r from-orange-500 to-[#ff7f50] text-white shadow-md shadow-orange-500/20"
            : "text-neutral-400 hover:text-white"
        }`}
      >
        Monthly
      </button>

      <button
        onClick={() => {
          if (!isYearly) dispatch(toggleBillingCycle());
        }}
        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          isYearly
            ? "bg-gradient-to-r from-orange-500 to-[#ff7f50] text-white shadow-md shadow-orange-500/20"
            : "text-neutral-400 hover:text-white"
        }`}
      >
        Yearly
      </button>
    </div>
  );
}
