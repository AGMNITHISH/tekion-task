import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { reactTable_RootURL } from "../../../constants";

const initialState = {
  tblData: [],
  rTblData: [],
  favTblData: [],
  status: "idle",
  modelStatus: "idle",
  favStatus: "idle",
};

export const getAllTableApi = createAsyncThunk("getAllTableApi", async () => {
  const response = await axios.get(`${reactTable_RootURL}`);
  return response.data;
});

export const updateTableDataBasedOnModel = createAsyncThunk(
  "updateTableDataBasedOnModel",
  async ({ status, row }) => {
    let data = { status };

    const response = await axios.put(
      `${reactTable_RootURL}/${row.model}`,
      data
    );
    return response.data;
  }
);
export const updateTableDataFav = createAsyncThunk(
  "updateTableDataFav",
  async ({ view, model }) => {
    let fav = "";
    if (view === "add") {
      fav = "Yes";
    } else if (view === "remove") {
      fav = "No";
    }
    let data = {
      favorites: fav,
    };
    const response = await axios.put(
      `${reactTable_RootURL}/fav/${model}`,
      data
    );
    return response.data;
  }
);

const reactTableSlice = createSlice({
  name: "reactTableSlice",
  initialState,
  reducers: {
    addrTblData: (state, action) => {
      state.rTblData = action.payload;
    },
    addfavTblData: (state, action) => {
      state.favTblData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllTableApi.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllTableApi.fulfilled, (state, action) => {
        state.status = "success";
        const { doc } = action.payload;
        state.tblData = doc;
      })
      .addCase(getAllTableApi.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(updateTableDataBasedOnModel.pending, (state) => {
        state.modelStatus = "pending";
      })
      .addCase(updateTableDataBasedOnModel.fulfilled, (state) => {
        state.modelStatus = "success";
      })
      .addCase(updateTableDataBasedOnModel.rejected, (state) => {
        state.modelStatus = "rejected";
      })
      .addCase(updateTableDataFav.pending, (state) => {
        state.favStatus = "pending";
      })
      .addCase(updateTableDataFav.fulfilled, (state) => {
        state.favStatus = "success";
      })
      .addCase(updateTableDataFav.rejected, (state) => {
        state.favStatus = "rejected";
      });
  },
});
export const { addTblData, addrTblData, addfavTblData } =
  reactTableSlice.actions;
export default reactTableSlice.reducer;
