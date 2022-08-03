/* eslint-disable no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItemsState {
  items: object;
}

const initialState: ItemsState = {
  items: {},
};

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    deleteItems() {
      return {
        items: {},
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(
      searchItems.fulfilled,
      (state, action: PayloadAction<any>) => {
        return {
          ...state,
          items: action.payload,
        };
      }
    );
  },
});

export const searchItems = createAsyncThunk(
  "items/searchItems",
  async (query: string) => {
    const response = await fetch(`/api/items?q=${query}`);
    const responseJson = await response.json();
    return responseJson;
  }
);

export const { deleteItems } = itemSlice.actions;

export default itemSlice.reducer;
