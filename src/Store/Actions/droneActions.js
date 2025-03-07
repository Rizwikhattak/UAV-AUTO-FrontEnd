"use client";

import { ApiCommon } from "@/utils/ApiCommon";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addDrone = createAsyncThunk(
  "drones/AddDrone",
  async (data, { rejectWithValue }) => {
    try {
      const droneData = await ApiCommon(
        "post",
        "form",
        "insert_drone",
        "Error adding drone",
        data
      );
      return droneData;
    } catch (error) {
      rejectWithValue(error.response?.data || "Error adding drone");
    }
  }
);
