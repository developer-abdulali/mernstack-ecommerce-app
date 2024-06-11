// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { addToCart, fetchItemsByUserId } from "./cartAPI";

// const initialState = {
//   items: [],
//   cart: [],
//   status: "idle",
// };

// export const addToCartAsync = createAsyncThunk(
//   "cart/addToCart",
//   async (item) => {
//     const response = await addToCart(item);
//     return response.data; // Return the data from the API response
//   }
// );

// export const fetchItemsByUserIdAsync = createAsyncThunk(
//   "cart/fetchItemsByUserId",
//   async (userId) => {
//     const response = await fetchItemsByUserId(userId);
//     return response.data; // Return the data from the API response
//   }
// );

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addToCartAsync.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(addToCartAsync.fulfilled, (state, action) => {
//         state.status = "idle";
//         state.cart.push(action.payload); // Correctly update the 'cart' array
//       })
//       .addCase(fetchItemsByUserIdAsync.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
//         state.status = "idle";
//         state.cart = action.payload; // Correctly update the 'cart' array
//       });
//   },
// });

// export const { increment } = cartSlice.actions;
// export const selectItem = (state) => state.cart.items; // This selects the 'value', not items
// export default cartSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, fetchItemsByUserId } from "./cartAPI";

const initialState = {
  cart: [],
  status: "idle",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response.data; // Return the data from the API response
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    return response.data; // Return the data from the API response
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart.push(action.payload); // Correctly update the 'cart' array
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart = action.payload; // Correctly update the 'cart' array
      });
  },
});

export const selectCart = (state) => state.cart.cart; // Select the 'cart' array from state
export default cartSlice.reducer;
