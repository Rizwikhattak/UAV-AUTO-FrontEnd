"use client";
import { configureStore } from "@reduxjs/toolkit";
import stationReducer from "./Reducers/stationSlice";
import droneReducer from "./Reducers/droneSlice";
import operatorReducer from "./Reducers/operatorSlice";
import planMissionReducer from "./Reducers/planMissionSlice";

export const store = configureStore({
  reducer: {
    station: stationReducer,
    drone: droneReducer,
    operator: operatorReducer,
    planMission: planMissionReducer,
  },
});
