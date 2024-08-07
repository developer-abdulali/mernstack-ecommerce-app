// import { createSlice } from "@reduxjs/toolkit";
// import { updateCart } from "../../../Utils/cartUtils";

// const initialState = localStorage.getItem("cart")
//   ? JSON.parse(localStorage.getItem("cart"))
//   : // : { cartItems: [], shippingAddress: {}, paymentMethod: null, receipt: null };
//     {
//       cartItems: [],
//       shippingAddress: {
//         address: "",
//         city: "",
//         postalCode: "",
//         phoneNumber: "",
//       },
//       paymentMethod: null,
//       receipt: null,
//     };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const { user, rating, numReviews, reviews, ...item } = action.payload;
//       const existItem = state.cartItems.find((x) => x._id === item._id);

//       if (existItem) {
//         state.cartItems = state.cartItems.map((x) =>
//           x._id === existItem._id ? item : x
//         );
//       } else {
//         state.cartItems = [...state.cartItems, item];
//       }
//       return updateCart(state, item);
//     },

//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
//       return updateCart(state);
//     },

//     // saveShippingAddress: (state, action) => {
//     //   state.shippingAddress = action.payload;
//     //   localStorage.setItem("cart", JSON.stringify(state));
//     // },
//     saveShippingAddress: (state, action) => {
//       state.shippingAddress = {
//         ...action.payload,
//         phoneNumber: action.payload.phoneNumber,
//       };
//       localStorage.setItem("cart", JSON.stringify(state));
//       console.log("Updated state:", JSON.stringify(state, null, 2));
//     },

//     savePaymentMethod: (state, action) => {
//       state.paymentMethod = action.payload;
//       localStorage.setItem("cart", JSON.stringify(state));
//     },

//     saveReceipt: (state, action) => {
//       state.receipt = action.payload;
//       localStorage.setItem("cart", JSON.stringify(state));
//     },

//     clearCartItems: (state, action) => {
//       state.cartItems = [];
//       localStorage.setItem("cart", JSON.stringify(state));
//     },

//     resetCart: (state) => (state = initialState),
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   savePaymentMethod,
//   saveShippingAddress,
//   clearCartItems,
//   resetCart,
//   saveReceipt,
// } = cartSlice.actions;

// export default cartSlice.reducer;

/// 2nd code

import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../Utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress: {
        address: "",
        city: "",
        postalCode: "",
        phoneNumber: "",
      },
      paymentMethod: null,
      receipt: null,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { user, rating, numReviews, reviews, ...item } = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state, item);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = {
        ...action.payload,
      };
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // saveShippingAddress: (state, action) => {
    //   console.log("saveShippingAddress payload:", action.payload);
    //   state.shippingAddress = {
    //     ...action.payload,
    //     phoneNumber: action.payload.phoneNumber,
    //   };
    //   localStorage.setItem("cart", JSON.stringify(state));
    //   console.log("Updated state:", JSON.stringify(state, null, 2));
    // },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    saveReceipt: (state, action) => {
      state.receipt = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },

    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
  clearCartItems,
  resetCart,
  saveReceipt,
} = cartSlice.actions;

export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import { updateCart } from "../../../Utils/cartUtils";

// const initialState = localStorage.getItem("cart")
//   ? JSON.parse(localStorage.getItem("cart"))
//   : {
//       cartItems: [],
//       shippingAddress: {
//         email: "",
//         firstName: "",
//         lastName: "",
//         phoneNumber: "",
//       },
//       paymentMethod: null,
//       receipt: null,
//     };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const { user, rating, numReviews, reviews, ...item } = action.payload;
//       const existItem = state.cartItems.find((x) => x._id === item._id);

//       if (existItem) {
//         state.cartItems = state.cartItems.map((x) =>
//           x._id === existItem._id ? item : x
//         );
//       } else {
//         state.cartItems = [...state.cartItems, item];
//       }
//       return updateCart(state, item);
//     },

//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
//       return updateCart(state);
//     },

//     saveShippingAddress: (state, action) => {
//       state.shippingAddress = { ...state.shippingAddress, ...action.payload };
//       localStorage.setItem("cart", JSON.stringify(state));
//       // console.log("Updated state:", JSON.stringify(state, null, 2));
//     },

//     savePaymentMethod: (state, action) => {
//       state.paymentMethod = action.payload;
//       localStorage.setItem("cart", JSON.stringify(state));
//     },

//     saveReceipt: (state, action) => {
//       state.receipt = action.payload;
//       localStorage.setItem("cart", JSON.stringify(state));
//     },

//     clearCartItems: (state, action) => {
//       state.cartItems = [];
//       localStorage.setItem("cart", JSON.stringify(state));
//     },

//     resetCart: (state) => (state = initialState),
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   savePaymentMethod,
//   saveShippingAddress,
//   clearCartItems,
//   resetCart,
//   saveReceipt,
// } = cartSlice.actions;

// export default cartSlice.reducer;
