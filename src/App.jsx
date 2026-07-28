import { useSelector } from "react-redux";
import AuthScreen from "./features/auth/AuthScreen";
import SubscriptionList from "./features/subscriptions/SubscriptionList";
import SubscriptionForm from "./features/subscriptions/SubscriptionForm";
import DashboardMetrics from "./components/DashboardMetrics";
import ExpenseChart from "./components/ExpenseChart";
import FilterBar from "./features/ui/FilterBar";
import DataControls from "./features/settings/DataControls";
import BudgetWidget from "./components/BudgetWidget";
import AnalyticsInsights from "./components/AnalyticsInsights";
import UserProfile from "./components/UserProfile";
import TrialBanner from "./components/TrialBanner";
import CategoryBreakdown from "./components/CategoryBreakdown";
import QuickPresets from "./components/QuickPresets";
import SpendProjection from "./components/SpendProjection";
import TagCloud from "./components/TagCloud";
import PaymentMethodBreakdown from "./components/PaymentMethodBreakdown";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  if (!isAuthenticated) return <AuthScreen />;

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0a09] text-neutral-100 p-2 sm:p-4 md:p-6 lg:p-8 font-sans selection:bg-orange-500 selection:text-white relative">
      <div className="absolute top-0 left-0 md:left-1/4 w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 md:right-10 w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-full md:max-w-[1400px] 2xl:max-w-[1800px] mx-auto relative z-10 flex-1 flex flex-col">
        <Navbar />
        <TrialBanner />
        <DashboardMetrics />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6 2xl:gap-10 mt-4 sm:mt-6 items-start w-full">
          <div className="xl:col-span-7 flex flex-col gap-4 sm:gap-5 w-full min-w-0">
            <SubscriptionForm />
            <TagCloud />
            <FilterBar />
            <SubscriptionList />
          </div>

          <div className="xl:col-span-5 flex flex-col gap-4 sm:gap-5 w-full min-w-0">
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

      <Footer />
      <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
    </div>
  );
}