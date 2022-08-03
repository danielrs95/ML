/* eslint-disable no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItemsState {
  items: [];
  status: string;
}

const initialState: ItemsState = {
  items: [],
  status: "idle",
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
          status: "done",
          items: action.payload,
        };
      }
    );
  },
});

export const searchItems = createAsyncThunk("items/searchItems", async () => {
  const response = await fetch("/api/items");
  const responseJson = await response.json();
  // console.log(responseJson);
  return responseJson;
});

export default itemSlice.reducer;
