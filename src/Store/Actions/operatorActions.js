import { ApiCommon } from "@/utils/ApiCommon";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addOperator = createAsyncThunk(
  "operator/AddOperator",
  async (data, { rejectWithValue }) => {
    try {
      const operatorData = await ApiCommon(
        "post",
        "form",
        "insert_operator",
        "Error adding operator",
        data
      );
      return operatorData;
    } catch (err) {
      console.log("Rejected statr 1");
      return rejectWithValue(err?.message || "Error adding operator");
    }
  }
);
export const getAllOperators = createAsyncThunk(
  "operator/GetAllOperators",
  async (data, { rejectWithValue }) => {
    try {
      const operatorData = await ApiCommon(
        "getAll",
        "form",
        "get_all_operators",
        "Error fetching operator",
        data
      );
      return operatorData;
    } catch (err) {
      console.log("Rejected statr 1");
      return rejectWithValue(err?.message || "Error fetching operator");
    }
  }
);
