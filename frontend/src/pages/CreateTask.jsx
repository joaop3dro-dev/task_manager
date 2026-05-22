import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTarefas from "../hooks/useTarefa";

function CreateTask() {
  const { tarefas, adicionarTarefa } = useTarefas();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [erro, setErro] = useState("");
  const [status, setStatus] = useState("pending");
  const navigate = useNavigate();

  const statusTask = [
    { value: "pending", label: "Pendente" },
    { value: "completed", label: "Concluída" },
    { value: "delayed", label: "Atrasada" },
    { value: "canceled", label: "Cancelada" },
  ];

  const validar = (valor) => {
    if (valor.length < 3) return "Nome da tarefa deve ter no mínimo de 3 caracteres";
    else if (valor.length > 50) return "Máximo de 50 caracteres";
    const duplicada = tarefas.some(
      (t) => t.name.toLowerCase() === valor.toLowerCase(),
    );
    if (duplicada) return "Tarefa já existe";
    return "";
  };

  const handleSubmit = async () => {
    const nameTrim = name.trim();
    const mensagemErro = validar(nameTrim);
    if (mensagemErro) {
      setErro(mensagemErro);
      return;
    }
    const data = {
      name: nameTrim,
      description: description.trim(),
      status,
    };
    try {
      await adicionarTarefa(data);
      setName("");
      setDescription("");
      setErro("");
      navigate(-1);
    } catch (e) {
      const mensagemServer = JSON.stringify(e.response?.data);
      setErro("Erro: " + (mensagemServer || e.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Criar Nova Tarefa</h2>
        <button
          onClick={() => navigate("/")}
          className="text-white text-sm transition-colors bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 cursor-pointer"
        >
          ← Voltar
        </button>
      </div>
      <div className="mb-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErro("");
              }}
              placeholder="Nome da tarefa"
              className="flex-1 bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />

            <input
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErro("");
              }}
              placeholder="Descrição (opcional)"
              className="flex-1 bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400">Status da Tarefa</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {statusTask.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Adicionar
            </button>
          </form>
        {erro && <p className="text-red-400 text-sm mt-1">{erro}</p>}
      </div>
    </div>
  );
}

export default CreateTask;
