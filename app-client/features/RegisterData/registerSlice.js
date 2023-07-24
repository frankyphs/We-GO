import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../config/api";

export const registerData = createAsyncThunk(
  "register/fetchData",
  async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/register`, data);
      console.log(response.data, ">>>>>di slice register>>>>>>>>>>>>>>>>>>>>.");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  value: 0,
  data: [],
  status: "idle",
  error: null,
};

export const RegisterSlice = createSlice({
  name: "LoginData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.data = action.payload;
      })
      .addCase(registerData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default RegisterSlice.reducer;
