function TaskFilter({ filtroAtual, onFiltrar }) {
  return (
    <div>
      <button
        onClick={() => onFiltrar("todas")}
        style={{ fontWeight: filtroAtual === "todas" ? "bold" : "normal" }}
      >
        Todas
      </button>
      <button
        onClick={() => onFiltrar("pendentes")}
        style={{ fontWeight: filtroAtual === "pendentes" ? "bold" : "normal" }}
      >
        Pendentes
      </button>
      <button
        onClick={() => onFiltrar("concluidas")}
        style={{ fontWeight: filtroAtual === "concluidas" ? "bold" : "normal" }}
      >
        Concluidas
      </button>
    </div>
  );
}
export default TaskFilter;
