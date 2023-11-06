import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slice/counterSlice";
import cartSlice from "./slice/shoppingCart/cartSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    cartSlice,
  },
});
