import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import subscriptionReducer from "../features/subscriptions/subscriptionSlice";
import uiReducer from "../features/ui/uiSlice";

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("subscriptionTrackerState", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("subscriptionTrackerState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load state", e);
    return undefined;
  }
};

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subscriptions: subscriptionReducer,
    ui: uiReducer,
  },
  preloadedState, 
});

store.subscribe(() => {
  saveToLocalStorage({
    auth: store.getState().auth,
    subscriptions: store.getState().subscriptions,
    ui: store.getState().ui,
  });
});

export default store;
