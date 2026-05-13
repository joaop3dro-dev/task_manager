import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TarefaDetalhe from "./pages/TarefaDetalhe";

function App() {
  return (
    <div>
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
            path="/tarefas/:id"
            element={
              <PrivateRoute>
                <TarefaDetalhe />
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
      </Routes>
    </div>
  );
}

export default App;
