"use client";
import { addDrone, getAllDrones } from "@/Store/Actions/droneActions";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = {
  data: [],
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
        toast.success("Drone Added");
      })
      .addCase(addDrone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Unable to add drone");
      })
      .addCase(getAllDrones.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDrones.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log("Action.payload", action.payload);
        state.data = action.payload.data;
      })
      .addCase(getAllDrones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default droneSlice.reducer;
