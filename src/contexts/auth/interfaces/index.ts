import { ReactNode } from "react";
import { User } from "../../../services/auth/interfaces";

export interface AuthContextProps {
  user: User | null;
  logout: () => void;
  login: (email: string, password: string) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
