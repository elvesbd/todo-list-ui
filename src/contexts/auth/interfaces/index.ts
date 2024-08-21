import { ReactNode } from "react";
import { User } from "../../../services/auth/interfaces";

export interface AuthContextProps {
  username: string;
  logout: () => void;
  setAuthData: (user: User) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
