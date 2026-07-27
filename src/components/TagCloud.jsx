import { useDispatch, useSelector } from "react-redux";
import { setCategoryFilter } from "../features/ui/uiSlice";
import { Tag } from "lucide-react";

export default function TagCloud() {
  const dispatch = useDispatch();
  const subscriptions = useSelector((state) => state.subscriptions.items) || [];

  const allTags = [...new Set(subscriptions.flatMap((sub) => sub.tags || []))];

  if (allTags.length === 0) return null;

  return (
    <div className="glass-card p-4 border-white/10 shadow-xl mb-6 flex items-center gap-3 overflow-x-auto">
      <span className="text-xs text-neutral-400 flex items-center gap-1.5 font-semibold whitespace-nowrap uppercase tracking-wider">
        <Tag size={13} className="text-[#ff7f50]" /> Tags:
      </span>
      <div className="flex items-center gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => dispatch(setCategoryFilter("All"))}
            className="text-xs bg-neutral-950/80 hover:bg-orange-500/15 text-orange-400 border border-white/5 hover:border-orange-500/30 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap font-medium shadow-sm"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}
