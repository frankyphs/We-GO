import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../config/api";

export const changeStatusTransaction = createAsyncThunk(
  "transaction/changeStatusTransaction",
  async (idTransaction) => {
    try {
      console.log(idTransaction, "ini id transaction");
      const access_token = await AsyncStorage.getItem("access_token");
      const response = await axios.patch(
        `${BASE_URL}/transactions/update/` + idTransaction,
        {},
        {
          headers: {
            access_token: access_token, // Gunakan nilai token yang telah diambil
          },
        }
      );
      console.log(response.data, "]]]]]]]]]]]]]]]]]]]]]]]");
      return response.data;
    } catch (error) {
      console.log(error, "<<< error nih changestatus");
    }
  }
);

const initialState = {
  value: 0,
  data: [],
  status: "idle",
  error: null,
};

export const ChangeStatusSlice = createSlice({
  name: "AddCartData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeStatusTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeStatusTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload, "INI PAYLOAD");
        state.data = action.payload;
      })
      .addCase(changeStatusTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default changeStatusTransaction.reducer;
