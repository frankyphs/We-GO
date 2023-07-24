import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../config/api";

export const deleteCart = createAsyncThunk("cart/deleteCart", async (id) => {
  try {
    console.log(id, "masukkkkkkkkkk ajaaa");
    const access_token = await AsyncStorage.getItem("access_token");
    //  console.log(access_token, "<<< TOKENNN");
    // console.log(data, "<<< ini data");
    const response = await axios.delete(`${BASE_URL}/carts/${id}`, {
      headers: {
        access_token: access_token, // Gunakan nilai token yang telah diambil
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error, "delete");
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
      .addCase(deleteCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload, "INI PAYLOAD");
        state.data = action.payload;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default getCart.reducer;
