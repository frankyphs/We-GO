import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../config/api";

export const addCustomCartData = createAsyncThunk(
  "cart/addCart",
  async (data) => {
    try {
      console.log(data, "di slice cart custom");
      const access_token = await AsyncStorage.getItem("access_token");

      const response = await axios.post(`${BASE_URL}/carts`, data, {
        headers: {
          access_token: access_token, // Gunakan nilai token yang telah diambil
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error, "<<< error nih");
    }
  }
);

const initialState = {
  value: 0,
  data: [],
  status: "idle",
  error: null,
};

export const AddCustomCartSlice = createSlice({
  name: "AddCustomCartData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCustomCartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCustomCartData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload, "INI PAYLOAD carts");
        state.data = action.payload;
      })
      .addCase(addCustomCartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default AddCustomCartSlice.reducer;
