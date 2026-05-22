import { useCallback, useEffect, useState } from "react";
import {
  deletarTarefa as deletarTarefaService,
  getTarefas,
  patchTarefa,
  postTarefa,
} from "../services/tarefa";
export function useTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregar = async () => {
      setLoading(true);
      try {
        const { data } = await getTarefas();
        console.log(data)
        setTarefas(data.results);
      } catch {
        setErro("Erro ao carregar tarefas");
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, []);

  const adicionarTarefa = useCallback(async (dataTask) => {
    const { data } = await postTarefa(dataTask);
    setTarefas((prev) => [...prev, data]);
  }, []);

  const concluirTarefa = useCallback(async (id) => {
    const { data } = await patchTarefa(id, { status: 'completed' });
    setTarefas((prev) => prev.map((t) => (t.id === id ? data : t)));
  }, []);

  const deletarTarefa = useCallback(async (id) => {
    await deletarTarefaService(id);
    setTarefas((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    tarefas,
    adicionarTarefa,
    concluirTarefa,
    deletarTarefa,
    loading,
    erro,
  };
}

export default useTarefas;
