import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/auth/useAuth";
import AuthService from "../../services/auth/AuthService";
import useNotification from "../../hooks/notifications/useNotification";

export function useLogin() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { notifySuccess, notifyError } = useNotification();

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
      const { accessToken } = await AuthService.login(email, password);
      setToken(accessToken);
      notifySuccess("Seja bem vindo ao Todo App!");
      navigate("/todos");
      handleClearForm();
    } catch (err) {
      notifyError("Não foi possível efetuar o login!");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return {
    email,
    error,
    loading,
    password,
    showPassword,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
    handleClickShowPassword,
  };
}
