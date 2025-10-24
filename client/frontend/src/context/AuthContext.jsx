import React, { createContext, useState, useEffect } from "react";
import API from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkAuth(token);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchFavoritesCount = async () => {
      if (user) {
        try {
          const { data } = await API.get("/favorites");
          setFavoritesCount(data.length);
        } catch (err) {
          console.error("Error fetching favorites count:", err);
        }
      } else {
        setFavoritesCount(0);
      }
    };

    fetchFavoritesCount();
  }, [user]);

  const checkAuth = async (token) => {
    try {
      const { data } = await API.get("/auth/me");
      setUser(data);
    } catch (error) {
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data } = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data;
  };

  const register = async (username, email, password) => {
    const { data } = await API.post("/auth/register", {
      username,
      email,
      password,
    });
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateFavoritesCount = (delta) => {
    setFavoritesCount((prev) => prev + delta);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        favoritesCount,
        updateFavoritesCount,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};