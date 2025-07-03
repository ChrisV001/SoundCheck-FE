import { createContext, useState, useEffect } from "react";
import axios from "axios";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token && user?.email) {
      axios
        .get("http://localhost:8080/user/get-my-info", {
          params: { email: user.email },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data.userDTO))
        .catch(() => {
          setToken(null);
          setUser(null);
          localStorage.removeItem("token");
        });
    }
  }, [token, user?.email]);

  const login = async (email, password) => {
    const response = await axios.post("http://localhost:8080/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    setToken(response.data.token);
    setUser(response.data.userDTO);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const AuthContext = createContext();
