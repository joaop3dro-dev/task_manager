import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthHook from "../hooks/useAuthHook";

function Login() {
  const { login } = useAuthHook();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    try {
      const dados = {
        email,
        password,
      };
      await login(dados);
      navigate("/", { replace: true });
    } catch (e) {
      const status = e.response?.status;

      if (status === 401) {
        setErro("Email ou senha incorretos");
      } else if (status === 400) {
        setErro("Preencha todos os campos");
      } else {
        setErro("Erro ao fazer login. Tente novamente");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Entrar</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 mb-2">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              setErro("");
            }}
            className="bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />

          <input
            type="password"
            value={password}
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />

          {erro && <p className="text-red-400 text-sm">{erro}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`font-medium py-2 rounded-lg transition-colors ${loading ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"}`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <Link to='/register' className="flex justify-center text-sm text-blue-500 hover:text-blue-600 transition-colors">Não tem conta? Registre-se aqui</Link>
      </div>
    </div>
  );
}

export default Login;
