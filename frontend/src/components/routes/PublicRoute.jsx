import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function PublicRoute({ children }) {
  const { authStatus } = useAuth();

  if (authStatus === "unknown") return <p>Verificando sessão...</p>;
  if (authStatus === "authenticated") return <Navigate to="/" />;

  return children;
}

export default PublicRoute;
