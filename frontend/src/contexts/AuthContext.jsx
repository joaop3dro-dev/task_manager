import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authStatus, setAuthStatus] = useState("unknown");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [usuario, setUsuario] = useState(null);

  return (
    <AuthContext.Provider
      value={{ usuario, setUsuario, authStatus, setAuthStatus, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}
