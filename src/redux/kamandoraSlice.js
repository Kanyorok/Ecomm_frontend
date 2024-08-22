import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userInfo: [],
  products: [],
  paymentData: [],
  checkedBrands: [],
  checkedCategories: [],
};

export const kamandoraSlice = createSlice({
  name: "kamandora",
  initialState,
  reducers: {
    addUserInfo: (state, action) => {
      state.userInfo.push(action.payload);
      toast.success("Info Added");
    },
    removeUserInfo: (state) => {
      state.userInfo = [];
      toast.success("Order Sent to Database!");
    },
    addPaymentInfo: (state, action) => {
      state.paymentData.push(action.payload);
      toast.success("Info Added");
    },
    removePaymentInfo: (state) => {
      state.paymentData = [];
      toast.success("Order Sent to Database!");
    },

    toggleBrand: (state, action) => {
      const brand = action.payload;
      const isBrandChecked = state.checkedBrands.some(
        (b) => b._id === brand._id
      );

      if (isBrandChecked) {
        state.checkedBrands = state.checkedBrands.filter(
          (b) => b._id !== brand._id
        );
      } else {
        state.checkedBrands.push(brand);
      }
    },

    toggleCategory: (state, action) => {
      const category = action.payload;
      
      const isCategoryChecked = state.checkedCategories.some(
        (b) => b._id === category._id
      );

      if (isCategoryChecked) {
        state.checkedCategories = state.checkedCategories.filter(
          (b) => b._id !== category._id
        );
      } else {
        state.checkedCategories.push(category);
      }
    },

    chooseOptions: (state, action) => {
      const section = action.payload;
      console.log(section)
      const isSectionClicked = state.products.some(
        (b) => b._id === section._id
      );

      if (isSectionClicked) {
        state.products = state.products.filter(
          (b) => b._id !== section._id
        );
      } else {
        state.products.push(section);
      }
    },
  },
});

export const {
  toggleBrand,
  toggleCategory,
  addUserInfo,
  removeUserInfo,
  addPaymentInfo,
  removePaymentInfo,
  chooseOptions
} = kamandoraSlice.actions;
export default kamandoraSlice.reducer;