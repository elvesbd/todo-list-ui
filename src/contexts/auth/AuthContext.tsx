import { createContext, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { User } from "../../services/auth/interfaces";
import AuthService from "../../services/auth/AuthService";
import { AuthContextProps, AuthProviderProps } from "./interfaces";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const user = await AuthService.login(email, password);
      setUser(user);

      console.log({ user });
      Cookies.set("authToken", user.token, { expires: 7 }); // O cookie expira em 7 dias
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
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

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      <>{children}</>
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
