import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/api";
// DOCS: https://redux-toolkit.js.org/api/createAsyncThunk

export const fetchCatheringsData = createAsyncThunk(
  "photographies/fetchData",
  async ({ search, price, belowPrice = 1000000000 }) => {
    //  let baseUrl = "https://fde2-103-138-68-174.ngrok-free.app/catherings";
    let baseUrl = `${BASE_URL}/catherings`;

    belowPrice = belowPrice * 0.3;

    console.log(belowPrice, search, price, "catering slice<<<2<<");

    const queryParams = [];
    if (search) {
      queryParams.push(`search=${search}`);
    }
    if (price) {
      queryParams.push(`price=${price}`);
    }
    if (belowPrice !== 0) {
      queryParams.push(`belowPrice=${belowPrice}`);
    }

    if (queryParams.length > 0) {
      baseUrl += `?${queryParams.join("&")}`;
    }

    console.log(baseUrl);
    const response = await axios.get(baseUrl);
    //  console.log(response.data, ">>>>>di slice photo>>>>>>>>>>>>>>>>>>>>.");
    return response.data;
  }
);

const initialState = {
  value: 0,
  data: [],
  status: "idle",
  error: null,
};

export const catheringsSlice = createSlice({
  name: "catheringsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatheringsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCatheringsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCatheringsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = catheringsSlice.actions;

export default catheringsSlice.reducer; // di import langsung menjadi namanya VenueReducer
