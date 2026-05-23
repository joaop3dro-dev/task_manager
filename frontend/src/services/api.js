import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => config,
  (erro) => Promise.reject(erro),
);

api.interceptors.response.use(
  (resposta) => resposta,
  async (erro) => {
    const original = erro.config;

    if (!erro.response || !original) return Promise.reject(erro);

    const status = erro.response.status;
    const url = original.url || "";

    const isAuthRoute =
      url.includes("/users/auth/login/") ||
      url.includes("/users/auth/logout/") ||
      url.includes("/users/auth/register/") ||
      url.includes("/users/auth/refresh/") ||
      url.includes("/users/auth/me/");

    if (status !== 401 || original._retry || isAuthRoute)
      return Promise.reject(erro);

    original._retry = true;

    try {
      await api.post("/users/auth/refresh/");
      return api(original);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);

export default api;
