import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginService,
  logoutService,
  meService,
  registerService,
} from "../services/auth";
import { useAuth } from "./useAuth";

function useAuthHook() {
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUsuario, setAuthStatus } = useAuth();

  async function login(data) {
    try {
      setLoading(true);
      await loginService(data);
      const { data: userData } = await meService();
      setUsuario(userData);
      setAuthStatus("authenticated");
      navigate("/");
    } catch {
      setErro("Credenciais inválidas. Tente novamente");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      await logoutService();
      setUsuario(null);
      setAuthStatus("unauthenticated");
      navigate("/home-page");
    } catch {
      setErro("Erro ao fazer logout. Tente novamente");
    } finally {
      setLoading(false);
    }
  }

  async function register(data) {
    try {
      setLoading(true);
      await registerService(data);
      navigate("/login");
    } catch {
      setErro("Erro ao se registrar. Tente novamente");
    } finally {
      setLoading(false);
    }
  }

  return { login, logout, register, erro, loading };
}

export default useAuthHook;
