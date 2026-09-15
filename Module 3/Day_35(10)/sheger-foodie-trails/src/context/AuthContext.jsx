import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("sheger_user");
      return saved ? JSON.parse(saved) : null;
    } catch (err) {
      console.error("Failed to parse user session from localStorage:", err);
      return null;
    }
  });

  const login = (userData) => {
    try {
      setUser(userData);
      localStorage.setItem("sheger_user", JSON.stringify(userData));
    } catch (err) {
      console.error("Failed to save user session to localStorage:", err);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem("sheger_user");
    } catch (err) {
      console.error("Failed to remove user session from localStorage:", err);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};