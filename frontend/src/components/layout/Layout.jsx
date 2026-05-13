import { Outlet } from "react-router-dom";
import Header from "../ui/Header";

function Layout() {
  return (
    <div>
      <Header
        titulo="Gerenciador de Tarefas"
        subtitulo="Organize suas tarefas do dia"
      />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
