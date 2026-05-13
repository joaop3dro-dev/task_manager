import { useMemo, useState } from "react";
import TaskFilter from "../components/ui/TaskFilter";
import TaskForm from "../components/ui/TaskForm";
import TaskList from "../components/ui/TaskList";
import useTarefas from "../hooks/useTarefa";

function Home() {
  const {
    tarefas,
    adicionarTarefa,
    concluirTarefa,
    deletarTarefa,
    loading,
    erro,
  } = useTarefas();
  const [filtro, setFiltro] = useState("todas");

  const tarefasFiltradas = useMemo(() => {
    return tarefas.filter((tarefa) => {
      if (filtro === "todas") return true;
      else if (filtro === "pendentes") return !tarefa.concluida;
      else return tarefa.concluida;
    });
  }, [tarefas, filtro]);

  if (loading) return <p>Carregando...</p>;
  else if (erro) return <p>{erro}</p>;

  return (
    <div>
      <TaskForm onAdicionar={adicionarTarefa} tarefas={tarefas} />
      <TaskList
        tarefas={tarefasFiltradas}
        onConcluir={concluirTarefa}
        onDeletar={deletarTarefa}
      />
      <TaskFilter filtroAtual={filtro} onFiltrar={setFiltro} />
    </div>
  );
}

export default Home;
