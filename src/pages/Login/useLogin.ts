import { useState } from "react";
import useAuth from "../../hooks/auth/useAuth";
import useNotification from "../../hooks/notifications/useNotification";
import AuthService from "../../services/auth/AuthService";

export function useLogin() {
  const { setAuthData } = useAuth();
  const { notifySuccess, notifyError } = useNotification();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleClearForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const user = await AuthService.login(email, password);
      setAuthData(user);
      notifySuccess("Seja bem vindo ao Todo App!");
      handleClearForm();
    } catch (err) {
      notifyError("Não foi possível efetuar o login!");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    error,
    loading,
    password,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
  };
}
