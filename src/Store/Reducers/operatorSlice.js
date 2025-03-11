import { addOperator, getAllOperators } from "@/Store/Actions/operatorActions";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = {
  data: [],
  loading: false,
  error: false,
};
const operatorSlice = createSlice({
  name: "operator",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOperator.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOperator.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log("Operator added");
        toast.success("Operator Added");
      })
      .addCase(addOperator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("Error Adding Operator");
        toast.error("Error Adding Operator");
      })
      .addCase(getAllOperators.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOperators.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllOperators.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error Fetching Operators");
      });
  },
});

export default operatorSlice.reducer;
