import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuthHook from "../hooks/useAuthHook";

function Register() {
  const { register, erro, loading } = useAuthHook();
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function validate() {
    const newErrors = {};

    const emailTrim = email.trim().toLowerCase();
    const passwordTrim = password.trim();
    const usernameTrim = username.trim();

    if (!usernameTrim) newErrors.username = "Usuário é obrigatório";
    else if (usernameTrim.length < 3)
      newErrors.username = "Nome de usuário deve ter no mínimo 3 caracteres";

    if (!emailTrim) newErrors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(emailTrim))
      newErrors.email = "Email inválido";

    if (!passwordTrim) newErrors.password = "Senha é obrigatória";
    else if (passwordTrim.length < 6)
      newErrors.password = "Senha deve ter no mínimo 6 caracteres";

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;

    return {
      isValid,
      errors: newErrors,
      data: isValid
        ? {
            username: usernameTrim,
            email: emailTrim,
            password: passwordTrim,
          }
        : null,
    };
  }

  function handleSubmit() {
    const result = validate();

    if (!result.isValid) {
      const errs = result.errors;

      if (errs.username) toast.error(errs.username);
      if (errs.email) toast.error(errs.email);
      if (errs.password) toast.error(errs.password);

      return;
    }

    register(result.data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-xl p-8">
        <h1 className="text-white text-2xl font-bold mb-6">Registrar</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col gap-4 mb-2"
        >
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`bg-gray-800 text-white placeholder-gray-500 border rounded-lg px-4 py-2 focus:outline-none ${errors.username ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-700 focus:border-blue-500"}`}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`bg-gray-800 text-white placeholder-gray-500 border rounded-lg px-4 py-2 focus:outline-none ${errors.email ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-700 focus:border-blue-500"}`}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`bg-gray-800 text-white placeholder-gray-500 border rounded-lg px-4 py-2 focus:outline-none ${errors.password ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-700 focus:border-blue-500"}`}
          />
          <button
            disabled={loading}
            className={`font-medium py-2 rounded-lg transition-colors ${loading ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"}`}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
        <Link
          to="/login"
          className="flex justify-center text-blue-600 text-sm hover:text-blue-700 transition-colors"
        >
          Tem uma conta? Faça login
        </Link>
      </div>
    </div>
  );
}

export default Register;
