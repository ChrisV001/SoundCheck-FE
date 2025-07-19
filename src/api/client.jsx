import axios from "axios";
import jwt_decode from "jwt-decode";
import { store } from "../store";
import { logout, loginSuccess } from "../store/authSlice";

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  const percentEncoded = atob(base64)
    .split("")
    .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");

  const json = decodeURIComponent(percentEncoded);
  return JSON.parse(json);
}

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export function handleLoginResponse(response) {
  const { token } = response;
  store.dispatch(loginSuccess({ token }));

  const { exp } = parseJwt(token);
  const msUntilExpiry = exp * 1000 - Date.now();

  setTimeout(() => store.dispatch(logout()), msUntilExpiry);
}

export default apiClient;
