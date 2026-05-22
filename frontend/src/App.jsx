import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import { useAuth } from "./hooks/useAuth";
import CreateTask from "./pages/CreateTask";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TarefaDetalhe from "./pages/TarefaDetalhe";
import { meService, refreshService } from "./services/auth";
function App() {
  const { setUsuario, setAuthStatus } = useAuth();

  useEffect(() => {
    async function init() {
      try {
        const { data } = await meService();
        setUsuario(data);
        setAuthStatus("authenticated");
        return;
      } catch (error) {
        if (error.response?.status !== 401) {
          setUsuario(null);
          setAuthStatus("unauthenticated");
          return;
        }
      }

      try {
        await refreshService();
        const { data } = await meService();
        setUsuario(data);
        setAuthStatus("authenticated");
      } catch {
        setUsuario(null);
        setAuthStatus("unauthenticated");
      }
    }

    init();
  }, []);
  return (
    <div>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/tasks/:id"
            element={
              <PrivateRoute>
                <TarefaDetalhe />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/create/"
            element={
              <PrivateRoute>
                <CreateTask />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
