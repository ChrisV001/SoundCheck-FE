import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist/es/constants";

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  exp: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { token } = action.payload;
      state.token = token;
      const [, payloadBase64] = token.split(".");
      const decoded = JSON.parse(atob(payloadBase64));
      state.user = decoded;
      state.exp = decoded.exp;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.exp = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder =>
  builder.addCase(REHYDRATE, (state, action) => {
    if (action.key !== "auth") {
      return state;
    }

    const remember = localStorage.getItem("persist:rememberMe") === "true";
    console.log("remember flag", remember);

    if (!remember) {
      return initialState;
    }

    const incoming = action.payload;
    if (incoming?.token) {
      authSlice.caseReducers.loginSuccess(state, {
        payload: { token: incoming.token },
      });
    }
  })
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
