import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Bell, Clock, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const subscriptions =
    useSelector((state) => state.subscriptions?.items) || [];
  const currency = useSelector((state) => state.ui?.currency) || {
    symbol: "$",
    multiplier: 1,
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getAlerts = () => {
    const today = new Date();
    const alerts = [];

    subscriptions.forEach((sub) => {
      if (!sub.renewalDate) return;
      const renewal = new Date(sub.renewalDate);
      const diffTime = renewal - today;
      const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (daysLeft < 0) {
        alerts.push({ ...sub, daysLeft, type: "overdue" });
      } else if (daysLeft <= 7) {
        alerts.push({ ...sub, daysLeft, type: "urgent" });
      }
    });

    return alerts.sort((a, b) => a.daysLeft - b.daysLeft);
  };

  const activeAlerts = getAlerts();
  const unreadCount = activeAlerts.length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-xl transition-all border border-white/10 shadow-lg"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-[#ff7f50] text-[10px] font-extrabold text-white border-2 border-neutral-950 shadow-md">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-3 w-80 glass-card border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-white/5 bg-neutral-950/80 backdrop-blur-md flex items-center justify-between">
              <h3 className="font-bold text-sm text-white tracking-tight">
                Notifications
              </h3>
              <span className="text-xs bg-orange-500/15 text-orange-400 border border-orange-500/30 px-2.5 py-0.5 rounded-full font-semibold">
                {unreadCount} New
              </span>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {unreadCount === 0 ? (
                <div className="p-8 text-center text-neutral-500 text-xs font-medium">
                  <Bell
                    size={32}
                    className="mx-auto mb-2 opacity-20 text-[#ff7f50]"
                  />
                  You're all caught up! No upcoming renewals.
                </div>
              ) : (
                <div className="flex flex-col">
                  {activeAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-4 border-b border-white/5 hover:bg-neutral-900/50 transition-colors flex gap-3.5 items-start"
                    >
                      <div
                        className={`mt-0.5 flex-shrink-0 p-2 rounded-xl border ${alert.type === "overdue" ? "bg-red-500/15 text-red-400 border-red-500/30" : "bg-orange-500/15 text-orange-400 border-orange-500/30"}`}
                      >
                        {alert.type === "overdue" ? (
                          <AlertTriangle size={16} />
                        ) : (
                          <Clock size={16} />
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-xs text-neutral-300">
                          <strong className="text-white font-bold">
                            {alert.name}
                          </strong>
                          {alert.type === "overdue"
                            ? " payment is overdue!"
                            : " renews soon."}
                        </p>
                        <p className="text-[11px] text-neutral-400 mt-1 flex justify-between items-center w-full">
                          <span className="font-medium">
                            {alert.type === "overdue"
                              ? `Past due by ${Math.abs(alert.daysLeft)} days`
                              : `Due in ${alert.daysLeft} days`}
                          </span>
                          <span className="font-bold text-white tracking-tight">
                            {currency.symbol}
                            {(alert.cost * currency.multiplier).toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
