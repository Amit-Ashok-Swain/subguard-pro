import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "./authSlice";
import { ShieldCheck, Lock, Mail, User } from "lucide-react";
import { toast } from "react-toastify";

export default function AuthScreen() {
  const dispatch = useDispatch();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isLoginMode && !name)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (isLoginMode) {
      dispatch(loginUser({ name: name || email.split("@")[0], email }));
      toast.success("Welcome back!");
    } else {
      dispatch(registerUser({ name, email }));
      toast.success("Account created successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0a09] flex items-center justify-center p-4 sm:p-6 font-sans selection:bg-orange-500 selection:text-white relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full glass-card p-8 border-white/10 shadow-2xl relative z-10">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-tr from-orange-500/20 to-[#ff7f50]/20 rounded-2xl border border-orange-500/30 shadow-lg shadow-orange-500/10">
            <ShieldCheck size={30} className="text-[#ff7f50]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              SubGuard Pro
            </h1>
            <p className="text-xs text-neutral-400 font-medium">
              Secure Subscription Intelligence
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 bg-neutral-950/80 p-1 rounded-xl mb-6 border border-white/10">
          <button
            type="button"
            onClick={() => setIsLoginMode(true)}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${isLoginMode ? "bg-gradient-to-r from-orange-500 to-[#ff7f50] text-white shadow-md shadow-orange-500/20" : "text-neutral-400 hover:text-white"}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLoginMode(false)}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${!isLoginMode ? "bg-gradient-to-r from-orange-500 to-[#ff7f50] text-white shadow-md shadow-orange-500/20" : "text-neutral-400 hover:text-white"}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLoginMode && (
            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-neutral-500"
                  size={16}
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="w-full glass-input pl-10 pr-4 py-2.5 text-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-neutral-500"
                size={16}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@subguard.io"
                className="w-full glass-input pl-10 pr-4 py-2.5 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-neutral-500"
                size={16}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full glass-input pl-10 pr-4 py-2.5 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-3 bg-gradient-to-r from-orange-500 to-[#ff7f50] hover:from-orange-600 hover:to-orange-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-[0.99] text-sm"
          >
            {isLoginMode ? "Access Dashboard" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
