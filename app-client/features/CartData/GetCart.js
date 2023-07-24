import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../config/api";

export const getCartData = createAsyncThunk("cart/addCart", async () => {
  try {
    const access_token = await AsyncStorage.getItem("access_token");
    // console.log(access_token, "<<< TOKENNN");
    const response = await axios.get(`${BASE_URL}/carts`, {
      headers: {
        access_token: access_token, // Gunakan nilai token yang telah diambil
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  value: 0,
  data: [],
  status: "idle",
  error: null,
};

export const getCart = createSlice({
  name: "cartsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload, "INI PAYLOAD");
        state.data = action.payload;
      })
      .addCase(getCartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default getCart.reducer;
