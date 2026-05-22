function TaskList({ tarefas, totalTarefas, filtro, onConcluir, onDeletar }) {
  const statusConfig = {
    pending: {
      label: "Pendente",
      className: "bg-yellow-500/10 text-yellow-400",
    },
    completed: {
      label: "Concluída",
      className: "bg-green-500/10 text-green-400",
    },
    delayed: { label: "Atrasada", className: "bg-red-500/10 text-red-400" },
    canceled: { label: "Cancelada", className: "bg-gray-500/10 text-gray-400" },
  };

  const filtroLabel = {
    todas: "tarefas",
    pendentes: "tarefas pendentes",
    concluidas: "tarefas concluídas",
  };

  if (totalTarefas === 0)
    return (
      <p className="inline-block mx-3 mb-6 bg-gray-800/50 text-gray-300 px-4 py-2 rounded-lg border border-gray-700 text-sm">
        Você não tem tarefas.
      </p>
    );

  if (tarefas.length === 0) {
    return (
      <p className="inline-block mx-3 mb-6 bg-gray-800/50 text-gray-300 px-4 py-2 rounded-lg border border-gray-700 text-sm">
        Você não tem {filtroLabel[filtro]}
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3 mb-6">
      {tarefas.map((tarefa) => {
        const { label, className } = statusConfig[tarefa.status];

        return (
          <li
            key={tarefa.id}
            className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 flex items-center justify-between"
          >
            <div className="flex flex-col">
              <span className="text-white font-medium">{tarefa.name}</span>
              {tarefa.description && (
                <span className="text-gray-400 text-xs">
                  {tarefa.description}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${className}`}
              >
                {label}
              </span>
              <button
                disabled={tarefa.status === "completed"}
                onClick={() => onConcluir(tarefa.id)}
                className={`px-3 py-1 rounded text-white text-sm transition-colors ${tarefa.status === "completed" ? "bg-gray-700 cursor-not-allowed opacity-50" : "bg-green-700 hover:bg-green-800 cursor-pointer"}`}
              >
                Concluir
              </button>
              <button
                onClick={() => onDeletar(tarefa.id)}
                className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-white text-sm transition-colors cursor-pointer"
              >
                Deletar
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default TaskList;
