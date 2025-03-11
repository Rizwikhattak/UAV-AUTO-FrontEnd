"use client";
import {
  addDrone,
  deleteDrone,
  getAllDrones,
  updateDrone,
} from "@/Store/Actions/droneActions";
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
      })
      .addCase(updateDrone.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDrone.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.data.findIndex(
          (drone) => drone.id === action.payload.data.id
        );
        if (index !== -1) state.data[index] = action.payload.data;
      })
      .addCase(updateDrone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDrone.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDrone.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = state.data.filter(
          (drone) => drone.id !== action.payload.data.id
        );
      })
      .addCase(deleteDrone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export default droneSlice.reducer;
