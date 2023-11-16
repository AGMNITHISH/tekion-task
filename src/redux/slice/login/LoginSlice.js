import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { login_RootURL } from "../../../constants";
const initialState = {
  token: "",
  tokenStatus: "idle",
  newUserStatus: "idle",
  newUserResp: [],
  meStatus: "idle",
  me: [],
};
export const userLogin = createAsyncThunk(
  "userLogin",
  async ({ email, password }) => {
    const response = await axios.post(`${login_RootURL}/login`, {
      email,
      password,
    });

    return response;
  }
);
export const newUser = createAsyncThunk(
  "userRegister",
  async ({ email, password, username }) => {
    const response = await axios.post(`${login_RootURL}/register`, {
      email,
      username,
      password,
    });

    return response;
  }
);
export const getMe = createAsyncThunk("getMe", async () => {
  const response = await axios.get(`${login_RootURL}/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
});
const userLoginSLice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.tokenStatus = "pending";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.tokenStatus = "success";

        state.token = action.payload.data.token;
      })
      .addCase(userLogin.rejected, (state) => {
        state.tokenStatus = "rejected";
      })
      .addCase(newUser.pending, (state) => {
        state.newUserStatus = "pending";
      })
      .addCase(newUser.fulfilled, (state, action) => {
        state.newUserStatus = "success";
        state.newUserResp = action.payload;
      })
      .addCase(newUser.rejected, (state) => {
        state.newUserStatus = "rejected";
      })
      .addCase(getMe.pending, (state) => {
        state.meStatus = "pending";
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.meStatus = "success";
        state.me = action.payload.data;
      })
      .addCase(getMe.rejected, (state) => {
        state.meStatus = "rejected";
      });
  },
});
export default userLoginSLice.reducer;
