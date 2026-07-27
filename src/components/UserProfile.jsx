import { useSelector } from "react-redux";
import { User, Mail, Calendar, Shield } from "lucide-react";

export default function UserProfile() {
  const subscriptions = useSelector((state) => state.subscriptions.items) || [];
  const authUser = useSelector((state) => state.auth?.user);

  const userName = authUser?.name || "Alex Morgan";
  const userEmail = authUser?.email || "alex.morgan@subguard.io";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="glass-card p-6 border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

      <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2.5">
        <User size={18} className="text-[#ff7f50]" />
        Account Profile
      </h2>

      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-[#ff7f50] flex items-center justify-center text-white font-extrabold text-base shadow-lg shadow-orange-500/20">
          {initials || "SG"}
        </div>

        <div className="overflow-hidden">
          <h3 className="text-white font-bold text-sm flex items-center gap-1.5 truncate">
            {userName}
            <Shield
              size={13}
              className="text-orange-400 flex-shrink-0"
              title="Pro Member"
            />
          </h3>
          <p className="text-xs text-neutral-400 flex items-center gap-1.5 mt-0.5 truncate">
            <Mail size={11} className="flex-shrink-0 text-neutral-500" />{" "}
            {userEmail}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-neutral-950/80 p-3 rounded-xl border border-white/5">
          <p className="text-neutral-400 font-medium">Member Since</p>
          <p className="text-white font-semibold mt-1 flex items-center gap-1">
            <Calendar size={12} className="text-[#ff7f50]" /> June 2026
          </p>
        </div>

        <div className="bg-neutral-950/80 p-3 rounded-xl border border-white/5">
          <p className="text-neutral-400 font-medium">Account Type</p>
          <p className="text-orange-400 font-bold mt-1">Pro Tier</p>
        </div>
      </div>
    </div>
  );
}
