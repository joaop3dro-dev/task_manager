import api from "./api";

export const loginService = (data) => api.post("/users/auth/login/", data);
export const logoutService = () => api.post('/users/auth/logout/')
export const refreshService = () => api.post('/users/auth/refresh/')
export const registerService = (data) => api.post('/users/auth/register/', data)
export const meService = () => api.get('/users/auth/me/')
