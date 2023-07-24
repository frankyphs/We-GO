import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/api";
// // DOCS: https://redux-toolkit.js.org/api/createAsyncThunk
// import { BASE_URL } from "../../config/api";

export const fetchDetailProductsData = createAsyncThunk(
  "productsDetail/fetchDataDetail",
  async ({ eoId }) => {
    console.log(eoId, "di slice dtl");
    const response = await axios.get(`${BASE_URL}/products/${eoId}`);
    // console.log(response.data, ">>>>>di slice catherings>>>>>>>>>>>>>>>>>>>>.");
    return response.data;
  }
);

const initialState = {
  value: 0,
  data: [],
  status: "idle",
  error: null,
};

export const detailProductsSlice = createSlice({
  name: "detailProductsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailProductsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDetailProductsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        // console.log(action.payload, "=========================");
      })
      .addCase(fetchDetailProductsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log(action.error.message, "error");
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = detailProductsSlice.actions;

export default detailProductsSlice.reducer; // di import langsung menjadi namanya VenueReducer
