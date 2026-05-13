import { useRef, useState } from "react";

function TaskForm({ onAdicionar, tarefas }) {
  const [texto, setTexto] = useState("");
  const [erro, setErro] = useState("");
  const inputRef = useRef(null);

  const validar = (valor) => {
    if (valor.length < 3) return "Mínimo de 3 caracteres";
    else if (valor.length > 100) return "Máximo de 100 caracteres";
    const duplicada = tarefas.some(
      (t) => t.texto.toLowerCase() === valor.toLowerCase(),
    );
    if (duplicada) return "Tarefa já existe";
    return "";
  };

  const handleSubmit = () => {
    const mensagemErro = validar(texto.trim());
    if (mensagemErro) {
      setErro(mensagemErro);
      return;
    }
    onAdicionar(texto.trim());
    setTexto("");
    setErro("");
    inputRef.current.focus();
  };

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        value={texto}
        onChange={(e) => {
          setTexto(e.target.value);
          setErro("");
        }}
        placeholder="Nova tarefa"
      />

      <button onClick={handleSubmit}>Adicionar</button>
      {erro && <p>{erro}</p>}
    </div>
  );
}

export default TaskForm;
