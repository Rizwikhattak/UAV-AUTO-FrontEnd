"use client";

import { createSlice } from "@reduxjs/toolkit";
import { getAllStations } from "@/Store/Actions/stationActions";
import { toast } from "sonner";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const stationSlice = createSlice({
  name: "station",
  initialState,
  reducers: {}, // Removed `getAllStations` because it was unused
  extraReducers: (builder) => {
    builder
      .addCase(getAllStations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllStations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // ✅ Corrected from `.push()`
      })
      .addCase(getAllStations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default stationSlice.reducer;
