import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredientials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userinfo", JSON.stringify(action.payload));
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expiration", expirationTime);
    },

    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredientials, logout } = authSlice.actions;
export default authSlice.reducer;
