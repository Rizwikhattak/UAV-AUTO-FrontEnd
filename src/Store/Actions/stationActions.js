"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiCommon } from "@/utils/ApiCommon";

export const fetchStations = createAsyncThunk(
  "station/fetchStations",
  async (_, { rejectWithValue }) => {
    try {
      const stationsData = await ApiCommon(
        "getAll",
        "json",
        "get_all_stations",
        "Error fetching stations",
        null
      );
      return stationsData;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching stations");
    }
  }
);
