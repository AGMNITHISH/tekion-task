import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { reactTable_RootURL } from "../../../constants";

const initialState = {
  tblData: [],
  rTblData: [],
  favTblData: [],
  status: "idle",
  modelStatus: "idle",
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
    updateBrandStatus: (state, action) => {
      const { view, row } = action.payload;
      const { brand } = row;
      if (view === "add") {
        state.tblData = state.tblData.map((Item) => {
          if (Item.brand === brand) {
            return { ...Item, favorites: "Yes" };
          }
          return Item;
        });
      } else if (view === "remove") {
        state.tblData = state.tblData.map((Item) => {
          if (Item.brand === brand) {
            return { ...Item, favorites: "No" };
          }
          return Item;
        });
      }
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
      .addCase(updateTableDataBasedOnModel.fulfilled, (state, payload) => {
        state.modelStatus = "success";
      })
      .addCase(updateTableDataBasedOnModel.rejected, (state) => {
        state.modelStatus = "rejected";
      });
  },
});
export const { addTblData, addrTblData, addfavTblData, updateBrandStatus } =
  reactTableSlice.actions;
export default reactTableSlice.reducer;
