import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/api";
// DOCS: https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchProductsData = createAsyncThunk(
  "products/fetchData",
  async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  }
);

const initialState = {
  value: 0,
  data: [],
  status: "idle",
  error: null,
};

export const productsSlice = createSlice({
  name: "productsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = productsSlice.actions;

export default productsSlice.reducer; // di import langsung menjadi namanya VenueReducer
