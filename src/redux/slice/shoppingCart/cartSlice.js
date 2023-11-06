import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { shoppingcart_URL } from "../../../constants";
import { message } from "antd";

export const cartApiCall = createAsyncThunk("cart/cartApiCall", async () => {
  const response = await axios.get(shoppingcart_URL);
  return response.data;
});

const initialState = {
  data: [],
  cartData: [],
  status: "idle",
  error: null,
};
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addcart: (state, action) => {
      const newData = action.payload;
      const check = state.cartData.find((item) => item.id === newData.id);
      if (!check) {
        state.cartData.push(newData);
      } else {
        message.warning(`product already there in cart`);
      }
    },
    increaseProductQty: (state, action) => {
      const newData = action.payload;
      const check = state.cartData.find((item) => item.id === newData.id);
      if (check) {
        const IncQty = state.cartData.map((item) => {
          if (item.id === newData.id) {
            return { ...item, quantity: (item.quantity += 1) };
          } else {
            return item;
          }
        });
        state.cartData = IncQty;
      }
    },
    decreaseProductQty: (state, action) => {
      const newData = action.payload;
      const check = state.cartData.find((item) => item.id === newData.id);
      if (check) {
        const decQty = state.cartData.map((item) => {
          if (item.id === newData.id) {
            return { ...item, quantity: (item.quantity -= 1) };
          } else {
            return item;
          }
        });
        state.cartData = decQty;
      }
    },
    removeFromcart: (state, action) => {
      const newData = action.payload;
      const check = state.cartData.find((item) => item.id === newData.id);
      if (check) {
        const filterData = state.cartData.filter(
          (item) => item.id !== newData.id
        );
        state.cartData = filterData;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cartApiCall.pending, (state) => {
        state.status = "pending";
      })
      .addCase(cartApiCall.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(cartApiCall.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const {
  addcart,
  removeFromcart,
  increaseProductQty,
  decreaseProductQty,
} = cartSlice.actions;

export default cartSlice.reducer;
