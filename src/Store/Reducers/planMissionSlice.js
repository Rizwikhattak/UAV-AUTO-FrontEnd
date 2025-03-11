import { addMissionPlan } from "@/Store/Actions/planMissionActions";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  data: [],
  error: null,
};
const planMissionSlice = createSlice({
  name: "planMission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMissionPlan.pending, (state, action) => {})
      .addCase(addMissionPlan.fulfilled, (state, action) => {})
      .addCase(addMissionPlan.rejected, (state, action) => {});
  },
});
export default planMissionSlice.reducer;
