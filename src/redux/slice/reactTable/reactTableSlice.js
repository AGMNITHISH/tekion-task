import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { carTable_RootURL, reactTable_RootURL } from "../../../constants";

const initialState = {
  tblData: [],
  rTblData: [],
  favTblData: [],
  status: "idle",
  modelStatus: "idle",
  favStatus: "idle",
  carData: [],
  carModelData: [],
  carBodyData: [],
  carBodyStatus: "idle",
  carModelStatus: "idle",
  carStatus: "idle",
};
export const getCarBodyBasedOnModel = createAsyncThunk(
  "getCarBodyBasedOnModel",
  async (model) => {
    const response = axios.get(`${carTable_RootURL}/type/${model}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return (await response).data;
  }
);
export const getAllCars = createAsyncThunk("getAllCars", async () => {
  const response = axios.get(`${carTable_RootURL}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return (await response).data;
});
export const getModelBasedOnBrand = createAsyncThunk(
  "getModelBasedOnBrand",
  async (brand) => {
    const response = axios.get(`${carTable_RootURL}/${brand}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return (await response).data;
  }
);

export const getAllTableApi = createAsyncThunk("getAllTableApi", async (id) => {
  const response = await axios.get(`${reactTable_RootURL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
});

export const updateTableDataBasedOnModel = createAsyncThunk(
  "updateTableDataBasedOnModel",
  async ({ status, row, id }) => {
    let data = { status, id };

    const response = await axios.put(
      `${reactTable_RootURL}/${row.model}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  }
);
export const updateTableDataFav = createAsyncThunk(
  "updateTableDataFav",
  async ({ view, model, id }) => {
    let fav = "";
    if (view === "add") {
      fav = "Yes";
    } else if (view === "remove") {
      fav = "No";
    }
    let data = {
      favorites: fav,
      userId: id,
    };
    const response = await axios.put(
      `${reactTable_RootURL}/fav/${model}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
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
    resetCreatePopupDatas: (state, action) => {
      state.carBodyData = [];
      state.carBodyStatus = "idle";
      state.carData = [];
      state.carStatus = "idle";
      state.carModelData = [];
      state.carModelStatus = "idle";
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
        if (doc != null) {
          state.tblData = doc;
        }
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
      })
      .addCase(getAllCars.pending, (state) => {
        state.carStatus = "pending";
      })
      .addCase(getAllCars.fulfilled, (state, action) => {
        state.carStatus = "success";
        state.carData = action.payload.data;
      })
      .addCase(getAllCars.rejected, (state) => {
        state.carStatus = "rejected";
      })
      .addCase(getModelBasedOnBrand.pending, (state) => {
        state.carModelStatus = "pending";
      })
      .addCase(getModelBasedOnBrand.fulfilled, (state, action) => {
        state.carModelStatus = "success";
        state.carModelData = action.payload.data;
      })
      .addCase(getModelBasedOnBrand.rejected, (state) => {
        state.carModelStatus = "rejected";
      })
      .addCase(getCarBodyBasedOnModel.pending, (state) => {
        state.carBodyStatus = "pending";
      })
      .addCase(getCarBodyBasedOnModel.fulfilled, (state, action) => {
        state.carBodyStatus = "success";
        state.carBodyData = action.payload.data;
      })
      .addCase(getCarBodyBasedOnModel.rejected, (state) => {
        state.carBodyStatus = "rejected";
      });
  },
});
export const { addTblData, addrTblData, addfavTblData, resetCreatePopupDatas } =
  reactTableSlice.actions;
export default reactTableSlice.reducer;
