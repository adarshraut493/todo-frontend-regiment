import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import api from "../api/axios";
import { AuthContext } from "./auth.context";
import { setUser, clearUser, setAuthLoading } from "../store/authSlice";
import { toast } from "react-toastify";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, authLoading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    let isMounted = true;

    const checkAuth = async () => {
      if (!token) {
        if (isMounted) dispatch(setAuthLoading(false));
        return;
      }

      try {
        const res = await api.get("/auth/me");
        if (!isMounted) return;
        dispatch(setUser(res.data.data));
      } catch {
        if (!isMounted) return;
        localStorage.clear();
        dispatch(clearUser());
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });

    const { accessToken, refreshToken, user } = res.data.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    dispatch(setUser(user));
    toast.success("Login successful!");
  };

  const logout = async () => {
    localStorage.clear();
    dispatch(clearUser());
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        authLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
