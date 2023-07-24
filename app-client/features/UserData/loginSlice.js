import AsyncStorage from "@react-native-async-storage/async-storage";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../config/api";

export const loginData = createAsyncThunk("login/fetchData", async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, data);
    await AsyncStorage.setItem("access_token", response.data.access_token);
    await AsyncStorage.setItem("username", response.data.username);

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const initialState = {
  value: 0,
  access_token: "",
  status: "idle",
  error: null,
};

export const loginSlice = createSlice({
  name: "LoginData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.access_token = action.payload.access_token; // Update access_token
      })
      .addCase(loginData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default loginSlice.reducer;
