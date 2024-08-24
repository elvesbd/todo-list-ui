import { createContext, useMemo } from "react";
import Cookies from "js-cookie";

import AuthService from "../../services/auth/AuthService";
import { AuthContextProps, AuthProviderProps } from "./interfaces";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setToken = (token: string) => {
    Cookies.set("authToken", token, { expires: 7 });
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      Cookies.remove("authToken");
      console.log("logout");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const contextValue = useMemo(
    () => ({
      logout,
      setToken,
    }),
    []
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <>{children}</>
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
