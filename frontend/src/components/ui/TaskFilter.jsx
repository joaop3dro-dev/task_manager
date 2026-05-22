function TaskFilter({ filtroAtual, onFiltrar }) {
  const botoes = [
    { label: "Todas", valor: "todas" },
    { label: "Pendentes", valor: "pendentes" },
    { label: "Concluidas", valor: "concluidas" },
  ];
  return (
    <div className="flex gap-2 mb-6">
      {botoes.map(({ label, valor }) => (
        <button
          key={valor}
          onClick={() => onFiltrar(valor)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filtroAtual === valor ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
export default TaskFilter;
