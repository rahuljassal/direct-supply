import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  toolHeader: {
    show_demand_forecast: false,
    search_text: "",
    category: { name: "All", id: "all" },
  },
  selectedProducts: [],
  updatedProducts: [],
  selectedProduct: {},
  isAllSelectedFlag: false,
};

const selectionsSlice = createSlice({
  name: "selections",
  initialState,
  reducers: {
    updateToolHeaderSelection: (state, action) => {
      const { payload } = action;
      const { key, data } = payload;
      if (key === "all") {
        state.toolHeader = { ...state.toolHeader, ...data };
      } else {
        state.toolHeader = { ...state.toolHeader, [key]: data };
      }
    },
    selectProduct: (state, action) => {
      const { payload } = action;
      state.selectedProduct = payload;
    },
    selectProducts: (state, action) => {
      const { payload } = action;
      if (state.selectedProducts.includes(payload)) {
        state.selectedProducts = state.selectedProducts.filter(
          (product) => product !== payload
        );
      } else {
        state.selectedProducts = [...state.selectedProducts, payload];
      }
    },
    selectAllProducts: (state, action) => {
      const { payload } = action;
      if (state.isAllSelectedFlag) {
        state.isAllSelectedFlag = false;
        state.selectedProducts = [];
      } else {
        state.isAllSelectedFlag = true;
        state.selectedProducts = payload;
      }
    },
    updateProducts: (state, action) => {
      const { payload } = action;
      if (state.updatedProducts.find((prod) => prod.id === payload.id)) {
        state.updatedProducts = state.updatedProducts.map((product) =>
          product.id === payload.id ? payload : product
        );
      } else {
        state.updatedProducts = [...state.updatedProducts, payload];
      }
    },
    clearProducts: (state, action) => {
      state.updatedProducts = [];
    },
  },
});
// Reducers
export default selectionsSlice.reducer;
// Actions
export const {
  updateToolHeaderSelection,
  selectAllProducts,
  selectProducts,
  selectProduct,
  updateProducts,
  clearProducts,
} = selectionsSlice.actions;
// Selectors
export const getSelections = (state) => state.selections;
export const getToolHeaderSelection = (state) => state.selections.toolHeader;
export const getSelectedProducts = (state) => state.selections.selectedProducts;
export const getIsAllSelectedFlag = (state) =>
  state.selections.isAllSelectedFlag;
export const getUpdatedProducts = (state) => state.selections.updatedProducts;
export const getSelectedProduct = (state) => state.selections.selectedProduct;
