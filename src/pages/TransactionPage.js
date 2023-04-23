import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TransactionsContainer from "../components/transactionsPageStyle.js";
import axios from "axios";

const TransactionsPage = () => {
  const { tipo } = useParams();
  const navigate = useNavigate();

  const [valor, setValor] = useState("Valor");
  const [descricao, setDescricao] = useState("Descrição");

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      return navigate("/");
    }
  }, []);

  const inputValor = ({ target }) => {
    if (parseFloat(target.value) >= 0.01) {
      setValor(target.value);
      target.style.border = "2px solid yellowgreen";
    } else {
      target.style.border = "2px solid crimson";
    }
  };

  const inputDescricao = ({ target }) => {
    if (target.value.length > 1) {
      setDescricao(target.value);
      target.style.border = "2px solid yellowgreen";
    } else {
      target.style.border = "2px solid crimson";
    }
  };
  const salvarTransacao = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      await axios.post(
        `http://localhost:5000/nova-transacao/${tipo}`,
        { valor, descricao },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/home");
    } catch (err) {
      console.log(JSON.stringify(err.message));
      alert(err.message);
    }
  };

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={salvarTransacao}>
        <input placeholder={valor} onChange={inputValor} type="text" required />
        <input placeholder={descricao} onChange={inputDescricao} required type="text" />
        <button>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  );
};
export default TransactionsPage;
