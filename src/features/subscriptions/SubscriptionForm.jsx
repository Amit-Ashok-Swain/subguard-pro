import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  addSubscription, 
  updateSubscription, 
  setEditingItem 
} from "./subscriptionSlice";
import {
  PlusCircle,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Pencil,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

export default function SubscriptionForm() {
  const dispatch = useDispatch();
  
  const editingItem = useSelector((state) => state.subscriptions?.editingItem);

  const categories = useSelector((state) => state.ui?.categories) || [
    "Entertainment",
    "Software",
    "Utilities",
    "Health & Fitness",
  ];
  const currency = useSelector((state) => state.ui?.currency) || {
    code: "USD",
    symbol: "$",
  };

  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [category, setCategory] = useState(categories[0] || "Entertainment");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [status, setStatus] = useState("Active");
  const [renewalDate, setRenewalDate] = useState("");

  // Advanced fields state & toggle button
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [tags, setTags] = useState("");
  const [passwordHint, setPasswordHint] = useState("");
  const [notes, setNotes] = useState("");
  const [isTrial, setIsTrial] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name || "");
      setCost(editingItem.cost ? editingItem.cost.toString() : "");
      setCategory(editingItem.category || categories[0]);
      setPaymentMethod(editingItem.paymentMethod || "Credit Card");
      setStatus(editingItem.status || "Active");
      setRenewalDate(editingItem.renewalDate || "");
      setTags(Array.isArray(editingItem.tags) ? editingItem.tags.join(", ") : "");
      setPasswordHint(editingItem.passwordHint || "");
      setNotes(editingItem.notes || "");
      setIsTrial(!!editingItem.isTrial);
      setShowAdvanced(true); // Auto-open advanced fields during edit if needed
    }
  }, [editingItem, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !cost) {
      toast.error("Please enter service name and cost.");
      return;
    }

    const parsedCost = parseFloat(cost);
    const formattedTags = tags
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];
    const formattedDate = renewalDate || new Date().toISOString().split("T")[0];

    if (editingItem) {
      dispatch(
        updateSubscription({
          ...editingItem,
          name,
          cost: parsedCost,
          category,
          paymentMethod,
          status,
          renewalDate: formattedDate,
          tags: formattedTags,
          passwordHint,
          notes,
          isTrial,
        })
      );
      toast.success(`Updated ${name} successfully!`);
    } else {
      const newSub = {
        id: Date.now().toString(),
        name,
        cost: parsedCost,
        currency: currency.code,
        category,
        paymentMethod,
        status,
        renewalDate: formattedDate,
        tags: formattedTags,
        passwordHint,
        notes,
        isTrial,
      };
      dispatch(addSubscription(newSub));
      toast.success(`Added ${name} successfully!`);
    }

    handleResetForm();
  };

  const handleResetForm = () => {
    setName("");
    setCost("");
    setRenewalDate("");
    setTags("");
    setPasswordHint("");
    setNotes("");
    setIsTrial(false);
    setShowAdvanced(false);
    dispatch(setEditingItem(null));
  };

  return (
    <div className="glass-card p-8 border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <div>
          <h2 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2.5">
            {editingItem ? (
              <>
                <Pencil size={20} className="text-orange-400" /> Edit Subscription
              </>
            ) : (
              <>
                <PlusCircle size={20} className="text-[#ff7f50]" /> Add New Subscription
              </>
            )}
          </h2>
          <p className="text-xs text-neutral-400 font-medium mt-0.5">
            {editingItem ? `Updating details for ${editingItem.name}` : "Track recurring expenses and trial periods"}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {editingItem && (
            <button
              type="button"
              onClick={handleResetForm}
              className="text-xs flex items-center gap-1 text-neutral-300 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer"
            >
              <X size={14} /> Cancel
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs flex items-center gap-1.5 text-orange-400 bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 px-3.5 py-2 rounded-xl font-semibold transition-all shadow-sm cursor-pointer"
          >
            <SlidersHorizontal size={14} />
            {showAdvanced ? "Hide Advanced" : "Check Advanced Fields"}
            {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">
              Service Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Netflix, Spotify"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full glass-input px-4 py-3 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">
              Cost ({currency.symbol}) *
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="9.99"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full glass-input px-4 py-3 text-sm"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full glass-input px-4 py-3 text-sm cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-neutral-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full glass-input px-4 py-3 text-sm cursor-pointer"
            >
              <option value="Credit Card" className="bg-neutral-900">Credit Card</option>
              <option value="PayPal" className="bg-neutral-900">PayPal</option>
              <option value="Apple Pay" className="bg-neutral-900">Apple Pay</option>
              <option value="Bank Transfer" className="bg-neutral-900">Bank Transfer</option>
              <option value="Crypto" className="bg-neutral-900">Crypto</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full glass-input px-4 py-3 text-sm cursor-pointer"
            >
              <option value="Active" className="bg-neutral-900">Active</option>
              <option value="Paused" className="bg-neutral-900">Paused</option>
              <option value="Cancelled" className="bg-neutral-900">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">
              Renewal Date
            </label>
            <input
              type="date"
              value={renewalDate}
              onChange={(e) => setRenewalDate(e.target.value)}
              className="w-full glass-input px-4 py-3 text-sm cursor-pointer"
            />
          </div>
        </div>

        {showAdvanced && (
          <div className="mt-1 p-5 rounded-2xl bg-neutral-950/80 border border-orange-500/30 flex flex-col gap-4 animate-fadeIn shadow-inner">
            <div className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal size={14} /> Advanced Configuration
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Work, Family, AI"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full glass-input px-3.5 py-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">
                  Password Hint / Vault
                </label>
                <input
                  type="text"
                  placeholder="e.g. email or hint"
                  value={passwordHint}
                  onChange={(e) => setPasswordHint(e.target.value)}
                  className="w-full glass-input px-3.5 py-2.5 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider">
                Notes / Description
              </label>
              <textarea
                rows="2"
                placeholder="Add any additional notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full glass-input px-3.5 py-2.5 text-xs resize-none"
              />
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={isTrial}
                onChange={(e) => setIsTrial(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-neutral-900 text-orange-500 focus:ring-orange-500 cursor-pointer"
              />
              <span className="text-xs font-semibold text-neutral-300">
                This is a Free Trial
              </span>
            </label>
          </div>
        )}

        <button
          type="submit"
          className="w-full mt-2 bg-gradient-to-r from-orange-500 to-[#ff7f50] hover:from-orange-600 hover:to-orange-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-xl shadow-orange-500/20 active:scale-[0.99] text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          {editingItem ? (
            <>
              <Pencil size={18} /> Update Subscription
            </>
          ) : (
            <>
              <PlusCircle size={18} /> Add to Tracker
            </>
          )}
        </button>
      </form>
    </div>
  );
}