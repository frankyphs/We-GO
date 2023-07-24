import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../config/api";

export const addTransactionData = createAsyncThunk(
  "transaction/addTransaction",
  async (data) => {
    try {
      // console.log(data, "<<<< ini data?");
      const access_token = await AsyncStorage.getItem("access_token");
      // console.log(access_token, "<<< TOKENNN");
      // console.log(data, "<<< ini data");

      // Menyiapkan objek headers dengan access_token
      const response = await axios.post(
        `${BASE_URL}/transactions/payment/${data.CartId}`,
        data,
        {
          headers: {
            access_token: access_token, // Gunakan nilai token yang telah diambil
          },
        }
      );

      // console.log(response.data, "POST TRANSAKSI==========");
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

export const AddCartSlice = createSlice({
  name: "AddTransactionData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTransactionData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTransactionData.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload, "INI PAYLOAD");
        state.data = action.payload;
      })
      .addCase(addTransactionData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default AddCartSlice.reducer;
