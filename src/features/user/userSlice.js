import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserOrders } from "./userAPI";

const initialState = {
  userOrders: [],
  status: "idle",
};
export const fechLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fechLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fechLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      });
  },
});

export const { increment } = userSlice.actions;
export const selectCount = (state) => state.counter.value;
export const selectUserOrders = (state) => state.user.userOrders;
export default userSlice.reducer;
