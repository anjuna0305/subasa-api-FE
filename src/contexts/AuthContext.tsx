"use client";

import React, { createContext, useContext, useCallback, useMemo } from "react";
import { LoginRequest, LoginResponse } from "@/types/auth";

const LOGIN_API_URL = "PLACEHOLDER";

type AuthState = {
  accessToken: string | null;
  role: string | null;
  isAuthenticated: boolean;
};

type AuthContextType = AuthState & {
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY_TOKEN = "subasa_access_token";
const STORAGE_KEY_ROLE = "subasa_role";

function getInitialAuthState(): AuthState {
  if (typeof window === "undefined") {
    return { accessToken: null, role: null, isAuthenticated: false };
  }
  const token = localStorage.getItem(STORAGE_KEY_TOKEN);
  const role = localStorage.getItem(STORAGE_KEY_ROLE);
  if (token) {
    return { accessToken: token, role, isAuthenticated: true };
  }
  return { accessToken: null, role: null, isAuthenticated: false };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = React.useState<AuthState>(
    getInitialAuthState,
  );

  const login = useCallback(async (credentials: LoginRequest) => {
    const response = await fetch(LOGIN_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.detail || `Login failed with status ${response.status}`,
      );
    }

    const data: LoginResponse = await response.json();

    localStorage.setItem(STORAGE_KEY_TOKEN, data.access_token);
    localStorage.setItem(STORAGE_KEY_ROLE, data.role);

    setAuthState({
      accessToken: data.access_token,
      role: data.role,
      isAuthenticated: true,
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_ROLE);
    setAuthState({ accessToken: null, role: null, isAuthenticated: false });
  }, []);

  const value = useMemo(
    () => ({ ...authState, login, logout }),
    [authState, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
