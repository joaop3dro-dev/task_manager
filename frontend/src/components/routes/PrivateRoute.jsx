import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function PrivateRoute({ children }) {
  const { authStatus } = useAuth();

  if (authStatus === "unknown") return <p>Verificando sessão...</p>;
  if (authStatus !== "authenticated") return <Navigate to="/login" />;

  return children;
}

export default PrivateRoute;
