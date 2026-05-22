import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskFilter from "../components/ui/TaskFilter";
import TaskList from "../components/ui/TaskList";
import useTarefas from "../hooks/useTarefa";

function Home() {
  const { tarefas, concluirTarefa, deletarTarefa, loading, erro } =
    useTarefas();
  const [filtro, setFiltro] = useState("todas");
  const navigate = useNavigate();

  const tarefasFiltradas = useMemo(() => {
    return tarefas.filter((tarefa) => {
      if (filtro === "todas") return true;
      else if (filtro === "pendentes") return tarefa.status === "pending";
      else return tarefa.status === "completed";
    });
  }, [tarefas, filtro]);

  if (loading) return <p className="text-gray-400">Carregando...</p>;
  else if (erro) return <p className="text-red-400">{erro}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Minhas Tarefas</h2>
        <button
          onClick={() => navigate("/tasks/create/")}
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Nova Tarefa
        </button>
      </div>
      <TaskList
        tarefas={tarefasFiltradas}
        totalTarefas={tarefas.length}
        filtro={filtro}
        onConcluir={concluirTarefa}
        onDeletar={deletarTarefa}
      />
      <TaskFilter filtroAtual={filtro} onFiltrar={setFiltro} />
    </div>
  );
}

export default Home;
