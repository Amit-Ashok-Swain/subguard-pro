import { useSelector } from "react-redux";
import { Sparkles, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function TrialBanner() {
  const subscriptions =
    useSelector((state) => state.subscriptions?.items) || [];
  const trials = subscriptions.filter(
    (s) => s.isTrial && (!s.status || s.status === "Active"),
  );

  if (trials.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      // REMOVED "overflow-hidden" so absolute elements or dropdowns don't clip against it
      className="mb-8 bg-gradient-to-r from-orange-500/10 via-[#ff7f50]/10 to-orange-500/10 border border-orange-500/30 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-2xl backdrop-blur-md relative"
    >
      {/* Changed background blur blob to use overflow-visible safe styling */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-3.5">
        <div className="p-3 bg-orange-500/15 text-[#ff7f50] rounded-2xl border border-orange-500/30 shadow-lg shadow-orange-500/10 flex-shrink-0">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="text-white font-bold text-sm tracking-tight flex items-center gap-2">
            Active Free Trials ({trials.length})
          </h3>
          <p className="text-neutral-400 text-xs mt-0.5 font-medium">
            <strong className="text-white font-semibold">
              {trials.map((t) => t.name).join(", ")}
            </strong>{" "}
            {trials.length === 1 ? "is" : "are"} currently on a free trial.
            Review before billing begins!
          </p>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 text-xs text-orange-400 bg-orange-500/15 px-3.5 py-1.5 rounded-xl border border-orange-500/30 font-semibold whitespace-nowrap shadow-sm">
        <AlertTriangle size={14} /> Action Required
      </div>
    </motion.div>
  );
}