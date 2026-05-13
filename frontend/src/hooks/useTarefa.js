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
        setTarefas(data);
      } catch (e) {
        setErro("Erro ao carregar tarefas");
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, []);

  const adicionarTarefa = useCallback(async (texto) => {
    const { data } = await postTarefa(texto);
    setTarefas((prev) => [...prev, data]);
  }, []);

  const concluirTarefa = useCallback(async (id, concluida) => {
    const { data } = await patchTarefa(id, { concluida: !concluida });
    setTarefas((prev) => prev.map((t) => (t.id === id ? data : t)));
  }, []);

  const deletarTarefa = useCallback(async (id) => {
    await deletarTarefaService(id);
    setTarefas((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { tarefas, adicionarTarefa, concluirTarefa, deletarTarefa, loading, erro };
}

export default useTarefas;
