import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/api";
// DOCS: https://redux-toolkit.js.org/api/createAsyncThunk

export const fetchVenueData = createAsyncThunk(
  "venue/fetchData",
  async ({ search, location, price, belowPrice = 1000000000, weddingDate }) => {
    //  let baseUrl = "https://fde2-103-138-68-174.ngrok-free.app/venues";
    let baseUrl = `${BASE_URL}/venues`;

    //  console.log(belowPrice, ">>>>");

    belowPrice = belowPrice * 0.6;

    const formattedDate = weddingDate.split(" ")[0].replace(/\//g, "-");

    //  console.log(formattedDate, "<<<<<<");

    const queryParams = [];
    if (weddingDate) {
      queryParams.push(`weddingDate=${formattedDate}`);
    }
    if (search) {
      queryParams.push(`search=${search}`);
    }
    if (location) {
      queryParams.push(`location=${location}`);
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
    return response.data;
  }
);

const initialState = {
  value: 0,
  data: [],
  status: "idle",
  error: null,
};

export const venueSlice = createSlice({
  name: "vanueData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenueData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVenueData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchVenueData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = venueSlice.actions;

export default venueSlice.reducer; // di import langsung menjadi namanya VenueReducer
