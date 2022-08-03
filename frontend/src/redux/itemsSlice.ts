/* eslint-disable no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItemsState {
  items: [];
}

const initialState: ItemsState = {
  items: [],
};

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
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

export default itemSlice.reducer;
