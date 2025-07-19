import apiClient, { handleLoginResponse } from "../../api/client";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.post("/auth/login", { email, password });
      handleLoginResponse(data);
      return data.user;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Network error";
      return rejectWithValue(msg);
    }
  }
);
