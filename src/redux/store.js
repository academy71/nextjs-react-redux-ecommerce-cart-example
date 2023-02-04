import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import cartReducer from "./cart/cartSlice";
import productsSlice from "./products/productsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    products: productsSlice,
  },
});
