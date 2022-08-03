/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItemsState {
  items: object;
  status: string;
}

const initialState: ItemsState = {
  items: {},
  status: "idle",
};

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    deleteItems(state) {
      return {
        ...state,
        items: {},
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(searchItems.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(searchItems.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          items: action.payload,
          status: "success",
        };
      })

      // * Cases when searching by id
      .addCase(searchById.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(
        searchById.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          return {
            ...state,
            items: action.payload,
            status: "success",
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

export const searchById = createAsyncThunk(
  "items/searchById",
  async (id: string) => {
    const response = await fetch(`/api/items/${id}`);
    const responseJson = await response.json();
    return responseJson;
  }
);

export const { deleteItems } = itemSlice.actions;

export default itemSlice.reducer;
