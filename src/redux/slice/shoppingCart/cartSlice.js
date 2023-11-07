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
    updateIncart: (state, action) => {
      const { id } = action.payload;
      state.data = state.data.map((product) => {
        if (product.id === id) {
          return { ...product, incart: "Yes" };
        }
        return product;
      });
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
        const updateIncartData = state.data.map((item) => {
          if (item.id === newData.id) {
            return { ...item, incart: "No" };
          }
          return item;
        });
        state.data = updateIncartData;
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
        const tempData = action.payload.products;
        const result = tempData.map((item) => {
          return { ...item, incart: "No" };
        });
        state.data = result;
      })
      .addCase(cartApiCall.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const {
  addcart,
  updateIncart,
  removeFromcart,
  increaseProductQty,
  decreaseProductQty,
} = cartSlice.actions;

export default cartSlice.reducer;
