import api from "./api";

export const getTarefas = () => api.get("/tasks/");
export const postTarefa = (data) => api.post("/tasks/", data);
export const patchTarefa = (id, data) => api.patch(`/tasks/${id}/`, data);
export const deletarTarefa = (id) => api.delete(`/tasks/${id}/`);
