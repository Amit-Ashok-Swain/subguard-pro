import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import BillingToggle from "../features/ui/BillingToggle";
import NotificationBell from "./NotificationBell";
import { ShieldCheck, LogOut } from "lucide-react";
import { toast } from "react-toastify";

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-50 mb-4 sm:mb-6 glass-card p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-white/10 shadow-2xl backdrop-blur-xl bg-[#0b0a09]/90">
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-2.5 bg-gradient-to-tr from-orange-500/20 to-[#ff7f50]/20 rounded-xl border border-orange-500/30 shadow-lg">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff7f50]" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight">
              SubGuard Pro
            </h1>
            <p className="hidden md:block text-[10px] sm:text-xs text-neutral-400 font-medium mt-0.5">
              v1.0 Subscription Intelligence
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto ml-auto">
        <BillingToggle />
        <div className="flex items-center gap-2 sm:gap-3">
          <NotificationBell />
          <button
            onClick={() => {
              dispatch(logoutUser());
              toast.info("Logged out successfully");
            }}
            title="Logout"
            className="p-2 sm:p-2.5 bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-xl transition-all shadow-lg flex items-center justify-center cursor-pointer"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
