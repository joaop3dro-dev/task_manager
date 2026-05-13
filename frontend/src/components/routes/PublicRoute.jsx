import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
function PublicRoute({ children }) {
  const { usuario } = useAuth();

  if (usuario) return <Navigate to="/" />;

  return children;
}

export default PublicRoute;
