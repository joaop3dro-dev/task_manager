import { useParams } from "react-router-dom";

function TarefaDetalhe() {
  const { id } = useParams();

  return (
    <div>
      <p>Tarefa ID: {id}</p>
    </div>
  );
}

export default TarefaDetalhe;
