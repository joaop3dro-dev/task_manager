import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

api.interceptors.request.use(
    (config) => config,
    (erro) => Promise.reject(erro)
)

api.interceptors.response.use(
    (resposta) => resposta,
    async (erro) => {
        const original = erro.config

        if (erro.response?.status === 401 && !original._retry) {
            original._retry = true

            try {
                await api.post('/auth/refresh/')
                return api(original)

            } catch {
                window.location.href = '/login'
                return Promise.reject(erro)
            }
        }
        return Promise.reject(erro)
    }
)

export default api;
