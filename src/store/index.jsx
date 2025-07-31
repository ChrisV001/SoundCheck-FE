import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  persistReducer,
  persistStore,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "exp"],
};

const persistedAuth = persistReducer(persistConfig, authReducer);

const actionLogger = (storeAPI) => (next) => (action) => {
  console.log("🟢 ACTION DISPATCHED:", action.type, action);
  return next(action);
};

export const store = configureStore({
  reducer: { auth: persistedAuth },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(actionLogger),
});

export const persistor = persistStore(store);
