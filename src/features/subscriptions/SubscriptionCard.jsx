import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubscription,
  setEditingItem,
  duplicateSubscription,
} from "./subscriptionSlice";
import {
  Trash2,
  AlertCircle,
  Edit2,
  Clock,
  Copy,
  CreditCard,
  Tag,
  MessageSquare,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

export default function SubscriptionCard({ sub, index }) {
  const dispatch = useDispatch();
  const isYearly = useSelector((state) => state.ui?.isYearlyView);
  const [showPassword, setShowPassword] = useState(false);

  const displayCost = isYearly ? sub.cost * 12 : sub.cost;
  const currencySymbol = CURRENCY_SYMBOLS[sub.currency] || "$";
  const displayLabel = isYearly ? "/yr" : "/mo";
  const status = sub.status || "Active";

  const handleDelete = () => {
    dispatch(deleteSubscription(sub.id));
    toast.error(`${sub.name} deleted`);
  };

  const handleEdit = () => {
    dispatch(setEditingItem(sub));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDuplicate = () => {
    dispatch(duplicateSubscription(sub.id));
    toast.info(`Duplicated ${sub.name}`);
  };

  const getDaysUntilRenewal = (dateString) => {
    if (!dateString) return null;
    const renewal = new Date(dateString);
    const today = new Date();
    const diffTime = renewal - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysLeft = getDaysUntilRenewal(sub.renewalDate);
  const isUrgent =
    daysLeft !== null && daysLeft <= 7 && daysLeft >= 0 && status === "Active";
  const isOverdue = daysLeft !== null && daysLeft < 0 && status === "Active";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{ duration: 0.25, delay: index ? index * 0.04 : 0 }}
      className={`glass-card p-5 border transition-all ${
        status !== "Active"
          ? "opacity-50 border-white/5"
          : isUrgent || isOverdue
            ? "border-red-500/40 shadow-lg shadow-red-500/10"
            : "border-white/10 hover:border-orange-500/30"
      } flex flex-col gap-3.5`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-lg font-bold text-white tracking-tight">
              {sub.name}
            </h3>
            {sub.isTrial && (
              <span className="flex items-center gap-1 text-[11px] bg-amber-500/15 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-semibold">
                <AlertCircle size={11} />
                Trial
              </span>
            )}
            {status !== "Active" && (
              <span
                className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${
                  status === "Cancelled"
                    ? "bg-neutral-800 text-neutral-300 border border-neutral-700"
                    : "bg-red-500/15 text-red-400 border border-red-500/30"
                }`}
              >
                {status}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] bg-neutral-900/90 text-neutral-300 border border-white/5 px-2.5 py-1 rounded-lg font-medium">
              {sub.category}
            </span>

            {sub.paymentMethod && (
              <span className="flex items-center gap-1 text-[11px] bg-neutral-900/90 text-neutral-400 border border-white/5 px-2.5 py-1 rounded-lg">
                <CreditCard size={11} /> {sub.paymentMethod}
              </span>
            )}

            {daysLeft !== null && status === "Active" && (
              <div
                className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg font-medium ${
                  isOverdue
                    ? "bg-red-500/15 text-red-400 border border-red-500/30"
                    : isUrgent
                      ? "bg-orange-500/15 text-orange-400 border border-orange-500/30"
                      : "bg-neutral-900/90 text-neutral-400 border border-white/5"
                }`}
              >
                <Clock size={11} />
                {isOverdue ? "Overdue" : `Renews in ${daysLeft}d`}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5">
          <div className="text-left sm:text-right">
            <p className="text-2xl font-extrabold text-[#ff7f50] tracking-tight">
              {currencySymbol}
              {displayCost.toFixed(2)}
              <span className="text-xs text-neutral-400 font-normal ml-0.5">
                {displayLabel}
              </span>
            </p>
            <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">
              {sub.currency || "USD"}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleDuplicate}
              title="Duplicate"
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-all"
            >
              <Copy size={16} />
            </button>
            <button
              onClick={handleEdit}
              title="Edit"
              className="p-2 text-neutral-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-xl transition-all"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={handleDelete}
              title="Delete"
              className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {(sub.notes || (sub.tags && sub.tags.length > 0) || sub.passwordHint) && (
        <div className="pt-3 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-3 flex-wrap">
            {sub.notes && (
              <div className="flex items-center gap-1.5 truncate max-w-xs">
                <MessageSquare
                  size={12}
                  className="text-neutral-500 flex-shrink-0"
                />
                <span className="truncate">{sub.notes}</span>
              </div>
            )}
            {sub.passwordHint && (
              <div className="flex items-center gap-1.5 bg-neutral-950/90 px-2.5 py-1 rounded-lg border border-white/10">
                <Lock size={12} className="text-[#ff7f50]" />
                <span className="text-neutral-300 font-mono text-[11px]">
                  {showPassword ? sub.passwordHint : "••••••••"}
                </span>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-neutral-400 hover:text-white ml-1"
                >
                  {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
              </div>
            )}
          </div>

          {sub.tags && sub.tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <Tag size={12} className="text-neutral-500 mr-0.5" />
              {sub.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-neutral-900/90 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-md text-[10px] font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
