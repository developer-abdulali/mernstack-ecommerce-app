// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   categories: [],
//   products: [],
//   checked: [],
//   radio: [],
//   brandCheckboxes: {},
//   checkedBrands: [],
// };

// const shopSlice = createSlice({
//   name: "shop",
//   initialState,
//   reducers: {
//     setCategories: (state, action) => {
//       state.categories = action.payload;
//     },
//     setProducts: (state, action) => {
//       state.products = action.payload;
//     },
//     setChecked: (state, action) => {
//       state.checked = action.payload;
//     },
//     setRadio: (state, action) => {
//       state.radio = action.payload;
//     },
//     setSelectedBrand: (state, action) => {
//       state.selectedBrand = action.payload;
//     },
//   },
// });

// export const {
//   setCategories,
//   setProducts,
//   setChecked,
//   setRadio,
//   setSelectedBrand,
// } = shopSlice.actions;

// export default shopSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  products: [],
  checked: [],
  radio: [],
  brandCheckboxes: {},
  checkedBrands: [],
  price: 0,
  discount: 0,
  discountedPrice: 0,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
    setRadio: (state, action) => {
      state.radio = action.payload;
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    calculateDiscountedPrice: (state) => {
      state.discountedPrice =
        state.price - (state.price * state.discount) / 100;
    },
  },
});

export const {
  setCategories,
  setProducts,
  setChecked,
  setRadio,
  setSelectedBrand,
  setPrice,
  setDiscount,
  calculateDiscountedPrice,
} = shopSlice.actions;

export default shopSlice.reducer;
