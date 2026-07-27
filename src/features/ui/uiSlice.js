import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isYearlyView: false,
  searchQuery: "",
  categoryFilter: "All",
  sortBy: "Recently Added",
  currency: { symbol: "$", multiplier: 1, code: "USD" },
  categories: ["Entertainment", "Software", "Utilities", "Health & Fitness"],
  monthlyBudget: 150,
  theme: "dark",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleBillingCycle: (state) => {
      state.isYearlyView = !state.isYearlyView;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    addCustomCategory: (state, action) => {
      const newCategory = action.payload.trim();
      if (newCategory && !state.categories.includes(newCategory)) {
        state.categories.push(newCategory);
      }
    },
    setMonthlyBudget: (state, action) => {
      state.monthlyBudget = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const {
  toggleBillingCycle,
  setSearchQuery,
  setCategoryFilter,
  setSortBy,
  setCurrency,
  addCustomCategory,
  setMonthlyBudget,
  toggleTheme,
} = uiSlice.actions;

export default uiSlice.reducer;
