import { ReactNode } from "react";

export interface AuthContextProps {
  logout: () => void;
  setToken: (token: string) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
