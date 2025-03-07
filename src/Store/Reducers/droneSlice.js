"use client";
import { addDrone } from "@/Store/Actions/droneActions";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = {
  drones: [],
  loading: false,
  error: false,
};

const droneSlice = createSlice({
  name: "drone",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDrone.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDrone.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast("Drone Added");
      })
      .addCase(addDrone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast("Unable to add drone");
      });
  },
});

export default droneSlice.reducer;
