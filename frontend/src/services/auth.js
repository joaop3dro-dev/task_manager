import api from "./api";

export const login = (dados) => api.post("/auth/login/", dados);
