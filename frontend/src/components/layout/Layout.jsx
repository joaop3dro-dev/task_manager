import { Outlet } from "react-router-dom";
import Header from "../ui/Header";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header
        titulo="Gerenciador de Tarefas"
        subtitulo="Organize suas tarefas do dia"
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
