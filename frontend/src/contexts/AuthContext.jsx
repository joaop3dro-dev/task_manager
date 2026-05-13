import { createContext, useContext, useState } from "react";
import { login as loginService } from "../services/auth";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  const login = async (dados) => {
    const { data } = await loginService(dados);
    setUsuario(data);
  };

  const logout = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
