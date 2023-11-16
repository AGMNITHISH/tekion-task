import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slice/counterSlice";
import cartSlice from "./slice/shoppingCart/cartSlice";
import reactTableSlice from "./slice/reactTable/reactTableSlice";
import LoginSlice from "./slice/login/LoginSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    cartSlice,
    reactTableSlice,
    LoginSlice,
  },
});
