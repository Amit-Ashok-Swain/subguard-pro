import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("subguard_auth") === "true",
  user: JSON.parse(localStorage.getItem("subguard_user")) || {
    name: "Alex Morgan",
    email: "alex.morgan@subguard.io",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("subguard_auth", "true");
      localStorage.setItem("subguard_user", JSON.stringify(action.payload));
    },
    registerUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("subguard_auth", "true");
      localStorage.setItem("subguard_user", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("subguard_auth");
      localStorage.removeItem("subguard_user");
    },
  },
});

export const { loginUser, registerUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
