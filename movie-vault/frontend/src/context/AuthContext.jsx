import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const { data } = await api.get("/auth/check");
      if (data.authenticated) {
        const profileRes = await api.get("/profile/");
        setUser(profileRes.data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const login = async (username, password) => {
    await api.post("/auth/login", { username, password });
    await checkUser();
  };

  const register = async (username, password) => {
    await api.post("/auth/register", { username, password });
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  if (loading) return null; // Or a nice spinner

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
