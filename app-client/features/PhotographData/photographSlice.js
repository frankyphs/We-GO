import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/api";
// DOCS: https://redux-toolkit.js.org/api/createAsyncThunk

export const fetchPhotographData = createAsyncThunk(
  "photographies/fetchData",
  async ({ search, price, belowPrice = 1000000000 }) => {
    //  let baseUrl = "https://fde2-103-138-68-174.ngrok-free.app/photographies";
    let baseUrl = `${BASE_URL}/photographies`;

    belowPrice = belowPrice * 0.1;

    console.log(belowPrice, search, price, "photo slice<4<<<1<<");

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

export const photographSlice = createSlice({
  name: "photographData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotographData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPhotographData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPhotographData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = photographSlice.actions;

export default photographSlice.reducer; // di import langsung menjadi namanya VenueReducer
