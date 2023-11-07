import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tblData: [],
  rTblData: [],
  favTblData: [],
};

const reactTableSlice = createSlice({
  name: "reactTableSlice",
  initialState,
  reducers: {
    addTblData: (state, action) => {
      state.tblData = action.payload;
    },
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
    updateStockStatus: (state, action) => {
      const { row, status } = action.payload;
      const { brand } = row;
      state.tblData = state.tblData.map((item) => {
        if (item.brand === brand) {
          return { ...item, status: status };
        }
        return item;
      });
    },
  },

  extraReducers: {},
});
export const {
  addTblData,
  addrTblData,
  addfavTblData,
  updateBrandStatus,
  updateStockStatus,
} = reactTableSlice.actions;
export default reactTableSlice.reducer;
