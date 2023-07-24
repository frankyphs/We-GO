import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
// DOCS: https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchDataUser = createAsyncThunk("user/fetchData", async () => {
  const response = await axios.get(`${BASE_URL}/users`, {
    headers: {
      access_token: await AsyncStorage.getItem("access_token"),
    },
  });
  console.log(response.data, "<<<<<<<<<<<<<");
  return response.data;
});
const initialState = {
  value: 0,
  data: [],
  status: "idle",
  error: null,
};

export const detailUser = createSlice({
  name: "productsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDataUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        console.log(action.payload, "Action.value");
      })
      .addCase(fetchDataUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = detailUser.actions;

export default detailUser.reducer; // di import langsung menjadi namanya VenueReducer
