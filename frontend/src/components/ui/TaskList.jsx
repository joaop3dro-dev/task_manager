function TaskList({ tarefas, onConcluir, onDeletar }) {
  return (
    <ul>
      {tarefas.map((tarefa) => (
        <li key={tarefa.id}>
          <span
            style={{
              textDecoration: tarefa.concluida ? "line-through" : "none",
            }}
          >
            {tarefa.texto}
          </span>
          <button onClick={() => onConcluir(tarefa.id, tarefa.concluida)}>
            Concluir
          </button>
          <button onClick={() => onDeletar(tarefa.id)}>Deletar</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
