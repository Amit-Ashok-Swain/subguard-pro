import { createSlice } from "@reduxjs/toolkit";

const getNextWeek = () => {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  return date.toISOString().split("T")[0];
};

const getNextMonth = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date.toISOString().split("T")[0];
};

const initialState = {
  items: [
    {
      id: "1",
      name: "Netflix",
      cost: 15.99,
      category: "Entertainment",
      isTrial: false,
      renewalDate: getNextWeek(),
      paymentMethod: "Credit Card",
      currency: "USD",
      status: "Active",
      notes: "Shared family account across 4 screens",
      tags: ["Family", "Streaming"],
    },
    {
      id: "2",
      name: "ChatGPT Plus",
      cost: 20.0,
      category: "Software",
      isTrial: true,
      renewalDate: getNextMonth(),
      paymentMethod: "PayPal",
      currency: "USD",
      status: "Active",
      notes: "Used for development and coding assistance",
      tags: ["Work", "AI"],
    },
  ],
  editingItem: null,
};

export const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    addSubscription: (state, action) => {
      state.items.push(action.payload);
    },
    deleteSubscription: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setEditingItem: (state, action) => {
      state.editingItem = action.payload;
    },
    updateSubscription: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      state.editingItem = null;
    },
    // NEW: Duplicate an existing subscription
    duplicateSubscription: (state, action) => {
      const itemToCopy = state.items.find((item) => item.id === action.payload);
      if (itemToCopy) {
        const duplicated = {
          ...itemToCopy,
          id: crypto.randomUUID(),
          name: `${itemToCopy.name} (Copy)`,
        };
        state.items.push(duplicated);
      }
    },
    importSubscriptions: (state, action) => {
      state.items = action.payload;
    },
    clearAllSubscriptions: (state) => {
      state.items = [];
    },
  },
});

export const {
  addSubscription,
  deleteSubscription,
  setEditingItem,
  updateSubscription,
  duplicateSubscription, // <-- Export it
  importSubscriptions,
  clearAllSubscriptions,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
