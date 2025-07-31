import apiClient, { handleLoginResponse } from "../../api/client";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, remember }, { rejectWithValue }) => {
    window.localStorage.setItem("persist:rememberMe", remember ? "true" : "false");
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
