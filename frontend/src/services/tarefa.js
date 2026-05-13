import api from "./api";

export const getTarefas = () => api.get("/tarefas/");
export const postTarefa = (texto) => api.post("/tarefas/", { texto });
export const patchTarefa = (id, dados) => api.patch(`/tarefas/${id}/`, dados);
export const deletarTarefa = (id) => api.delete(`/tarefas/${id}/`);
