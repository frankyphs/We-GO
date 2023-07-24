import {
  combineReducers,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
// DOCS: https://redux-toolkit.js.org/api/createAsyncThunk

// First screen - Budget and Date
const initialState = {
  budget: 0,
  date: null,
  venueId: null,
  photographerId: null,
  cateringId: null,
  guestPax: 0,
};

const inputDateBudgetSlice = createSlice({
  name: "inputDateBudget",
  initialState,
  reducers: {
    setBudget: (state, action) => {
      state.budget = action.payload;
      console.log("Budget:", state.budget);
    },
    setDate: (state, action) => {
      state.date = action.payload;
      console.log("Date:", state.date);
    },
    setVenueId: (state, action) => {
      state.venueId = action.payload;
      console.log("Venue ID:", state.venueId);
    },
    setPhotographerId: (state, action) => {
      state.photographerId = action.payload;
      console.log("Photographer ID:", state.photographerId);
    },
    setCateringId: (state, action) => {
      state.cateringId = action.payload;
      console.log("Catering ID:", state.cateringId);
    },
    setGuestPax: (state, action) => {
      state.guestPax = action.payload;
      console.log("Guest Pax:", state.guestPax);
    },
  },
});

export const {
  setBudget,
  setDate,
  setVenueId,
  setPhotographerId,
  setCateringId,
  setGuestPax,
} = inputDateBudgetSlice.actions;

export default inputDateBudgetSlice.reducer;
