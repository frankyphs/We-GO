import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../config/api";

export const addCartData = createAsyncThunk(
  "cart/addCart",
  async ({ data, idProduct }) => {
    try {
      // console.log("masukkkkkkkkkk");
      console.log(data);
      const access_token = await AsyncStorage.getItem("access_token");
      // console.log(access_token, "<<< TOKENNN");
      // console.log(data, "<<< ini data");

      // Menyiapkan objek headers dengan access_token
      const response = await axios.post(
        `${BASE_URL}/carts/` + idProduct,
        data,
        {
          headers: {
            access_token: access_token, // Gunakan nilai token yang telah diambil
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error, "<<< error nih cart");
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
  name: "AddCartData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCartData.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload, "INI PAYLOAD");
        state.data = action.payload;
      })
      .addCase(addCartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default AddCartSlice.reducer;
