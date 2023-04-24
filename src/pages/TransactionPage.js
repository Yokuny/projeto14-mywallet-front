import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TransactionsContainer from "../components/transactionsPageStyle.js";
import axios from "axios";

const TransactionsPage = () => {
  const { tipo } = useParams();
  const navigate = useNavigate();

  const [valor, setValor] = useState(0);
  const [displayValor, setDisplayValor] = useState("");
  const [descricao, setDescricao] = useState("");
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return navigate("/");
  }, [navigate]);

  const inputValor = ({ target }) => {
    const numeroLimpo = target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    const numero = parseFloat(numeroLimpo).toFixed(2);
    setDisplayValor(numeroLimpo);

    if (Number(target.value) >= 0.01) {
      setValor(numero);
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
      const connection = process.env.REACT_APP_API_URL;
      await axios.post(
        `${connection}nova-transacao/${tipo}`,
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
        <input placeholder="valor" value={displayValor} onChange={inputValor} type="text" required />
        <input placeholder="descrição" onChange={inputDescricao} required type="text" />
        <button>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  );
};
export default TransactionsPage;
