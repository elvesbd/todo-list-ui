import { createContext, useMemo } from "react";
import Cookies from "js-cookie";

import { AuthContextProps, AuthProviderProps } from "./interfaces";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const setToken = (token: string) => {
    Cookies.set("authToken", token, { expires: 7 });
  };

  const logout = async () => {
    Cookies.remove("authToken");
    navigate("/");
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
