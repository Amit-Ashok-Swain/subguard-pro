import { useSelector, useDispatch } from "react-redux";
import AuthScreen from "./features/auth/AuthScreen";
import { logoutUser } from "./features/auth/authSlice";
import SubscriptionList from "./features/subscriptions/SubscriptionList";
import SubscriptionForm from "./features/subscriptions/SubscriptionForm";
import DashboardMetrics from "./components/DashboardMetrics";
import ExpenseChart from "./components/ExpenseChart";
import BillingToggle from "./features/ui/BillingToggle";
import FilterBar from "./features/ui/FilterBar";
import DataControls from "./features/settings/DataControls";
import NotificationBell from "./components/NotificationBell";
import BudgetWidget from "./components/BudgetWidget";
import AnalyticsInsights from "./components/AnalyticsInsights";
import UserProfile from "./components/UserProfile";
import TrialBanner from "./components/TrialBanner";
import CategoryBreakdown from "./components/CategoryBreakdown";
import QuickPresets from "./components/QuickPresets";
import SpendProjection from "./components/SpendProjection";
import TagCloud from "./components/TagCloud";
import PaymentMethodBreakdown from "./components/PaymentMethodBreakdown";
import { ShieldCheck, LogOut } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.info("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-[#0b0a09] text-neutral-100 p-4 sm:p-6 font-sans selection:bg-orange-500 selection:text-white relative overflow-x-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        <header className="mb-6 glass-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-white/10 shadow-2xl">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-gradient-to-tr from-orange-500/20 to-[#ff7f50]/20 rounded-xl border border-orange-500/30 shadow-lg shadow-orange-500/10">
              <ShieldCheck size={26} className="text-[#ff7f50]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                SubGuard Pro
              </h1>
              <p className="text-xs text-neutral-400 font-medium">
                v1.0 Subscription Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <BillingToggle />
            <NotificationBell />
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2.5 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-xl transition-all border border-white/10 shadow-lg cursor-pointer"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        <TrialBanner />

        <DashboardMetrics />

        {/* Balanced Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start w-full">
          {/* Left Column (Primary Workflow: Form & Active Subscriptions) */}
          <div className="lg:col-span-7 flex flex-col gap-5 w-full min-w-0">
            <SubscriptionForm />
            <TagCloud />
            <FilterBar />
            <SubscriptionList />
          </div>

          {/* Right Column (Analytics, Insights & Settings Sidebar) */}
          <div className="lg:col-span-5 flex flex-col gap-5 w-full min-w-0">
            <UserProfile />
            <QuickPresets />
            <BudgetWidget />
            <SpendProjection />
            <CategoryBreakdown />
            <PaymentMethodBreakdown />
            <AnalyticsInsights />
            <ExpenseChart />
            <DataControls />
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
    </div>
  );
}
