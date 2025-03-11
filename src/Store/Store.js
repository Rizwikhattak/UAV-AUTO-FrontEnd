"use client";
import { configureStore } from "@reduxjs/toolkit";
import stationReducer from "./Reducers/stationSlice";
import droneReducer from "./Reducers/droneSlice";

export const store = configureStore({
  reducer: {
    station: stationReducer,
    drone: droneReducer,
  },
});
