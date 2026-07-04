import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import getErrorMessage from "../utils/getErrorMessage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // ── Login ────────────────────────────────────────────────────

  async function login(username, password) {
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { username, password });
      const data = response.data.data;

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      const loggedInUser = {
        username: data.username,
        fullName: data.fullName,
        role: data.role
      };

      setUser(loggedInUser);
      return { success: true };
    } catch (error) {
      return { success: false, message: getErrorMessage(error) };
    } finally {
      setLoading(false);
    }
  }

  // ── Register ─────────────────────────────────────────────────

  async function register(username, password, fullName, role) {
    setLoading(true);

    try {
      await api.post("/auth/register", { username, password, fullName, role });
      return { success: true };
    } catch (error) {
      return { success: false, message: getErrorMessage(error) };
    } finally {
      setLoading(false);
    }
  }

  // ── Logout ───────────────────────────────────────────────────

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  }

  const isAuthenticated = Boolean(user && localStorage.getItem("accessToken"));

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export default AuthContext;
