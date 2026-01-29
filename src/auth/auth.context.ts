import { createContext } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  authLoading: boolean; // ✅ MUST exist
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
