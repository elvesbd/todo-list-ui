import { createContext, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { User } from "../../services/auth/interfaces";
import AuthService from "../../services/auth/AuthService";
import { AuthContextProps, AuthProviderProps } from "./interfaces";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [username, setUsername] = useState<string | "">("");

  const setAuthData = (userData: User) => {
    setUsername(userData.name);
    Cookies.set("authToken", userData.token, { expires: 7 });
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
      username,
      logout,
      setAuthData,
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
