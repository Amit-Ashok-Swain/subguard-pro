import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  importSubscriptions,
  clearAllSubscriptions,
} from "../subscriptions/subscriptionSlice";
import { setCurrency } from "../ui/uiSlice";
import {
  Download,
  Upload,
  Trash2,
  Settings,
  Globe,
  FileSpreadsheet,
} from "lucide-react";
import { toast } from "react-toastify";

const CURRENCIES = [
  { symbol: "$", multiplier: 1, code: "USD", name: "US Dollar" },
  { symbol: "€", multiplier: 0.92, code: "EUR", name: "Euro" },
  { symbol: "£", multiplier: 0.79, code: "GBP", name: "British Pound" },
  { symbol: "₹", multiplier: 83.12, code: "INR", name: "Indian Rupee" },
];

export default function DataControls() {
  const dispatch = useDispatch();
  const subscriptions =
    useSelector((state) => state.subscriptions?.items) || [];
  const currentCurrency = useSelector((state) => state.ui?.currency) || {
    code: "USD",
  };
  const fileInputRef = useRef(null);

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(subscriptions, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "subguard_backup.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("JSON Backup downloaded!");
  };

  const handleExportCSV = () => {
    if (subscriptions.length === 0) {
      toast.error("No data to export!");
      return;
    }

    const headers = [
      "Name",
      "Cost",
      "Currency",
      "Category",
      "Payment Method",
      "Status",
      "Renewal Date",
      "Is Trial",
      "Notes",
    ];
    const rows = subscriptions.map((sub) => [
      `"${sub.name || ""}"`,
      sub.cost || 0,
      `"${sub.currency || "USD"}"`,
      `"${sub.category || ""}"`,
      `"${sub.paymentMethod || ""}"`,
      `"${sub.status || "Active"}"`,
      `"${sub.renewalDate || ""}"`,
      sub.isTrial ? "Yes" : "No",
      `"${(sub.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "subguard_expenses.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV spreadsheet exported!");
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (Array.isArray(importedData)) {
          dispatch(importSubscriptions(importedData));
          toast.success("Backup restored successfully!");
        } else {
          toast.error("Invalid backup format.");
        }
      } catch (error) {
        toast.error("Error reading file.");
      }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to delete all SubGuard data?")) {
      dispatch(clearAllSubscriptions());
      toast.error("All data cleared.");
    }
  };

  return (
    <div className="glass-card p-6 border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

      <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2.5">
        <Settings size={18} className="text-neutral-400" />
        Settings & Data
      </h2>

      <div className="mb-5">
        <label className="block text-xs font-semibold text-neutral-400 mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
          <Globe size={14} className="text-[#ff7f50]" /> Display Currency
        </label>
        <select
          value={currentCurrency.code}
          onChange={(e) => {
            const selected = CURRENCIES.find((c) => c.code === e.target.value);
            dispatch(setCurrency(selected));
            toast.info(`Currency switched to ${selected.code}`);
          }}
          className="w-full glass-input px-4 py-2.5 text-sm cursor-pointer"
        >
          {CURRENCIES.map((curr) => (
            <option
              key={curr.code}
              value={curr.code}
              className="bg-neutral-900"
            >
              {curr.code} ({curr.symbol}) - {curr.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2.5 pt-4 border-t border-white/5">
        <button
          onClick={handleExportJSON}
          className="flex items-center justify-center gap-2 w-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white py-2.5 px-4 rounded-xl transition-all text-xs font-semibold border border-white/5 shadow-sm"
        >
          <Download size={15} /> Export JSON Backup
        </button>

        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-2 w-full bg-orange-500/15 hover:bg-orange-500/25 text-orange-400 border border-orange-500/30 py-2.5 px-4 rounded-xl transition-all text-xs font-semibold shadow-sm"
        >
          <FileSpreadsheet size={15} /> Export CSV Spreadsheet
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-2 w-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white py-2.5 px-4 rounded-xl transition-all text-xs font-semibold border border-white/5 shadow-sm"
        >
          <Upload size={15} /> Import Backup
        </button>
        <input
          type="file"
          accept=".json"
          ref={fileInputRef}
          onChange={handleImport}
          className="hidden"
        />

        <button
          onClick={handleClear}
          className="flex items-center justify-center gap-2 w-full border border-red-500/30 text-red-400 bg-red-500/10 hover:bg-red-500/20 py-2.5 px-4 rounded-xl transition-all text-xs font-semibold mt-1 shadow-sm"
        >
          <Trash2 size={15} /> Factory Reset App
        </button>
      </div>
    </div>
  );
}
