import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import ListItemContainer from "../components/ListItemContainer.js";
import {
  HomeContainer,
  Header,
  TransactionsContainer,
  Saldo,
  Value,
  ButtonsContainer,
} from "../components/HomePageStyle";

const HomePage = () => {
  const navigate = useNavigate();
  const [mostrarNome, setMostrarNome] = useState("bom dia!");
  const [transacao, setTransacao] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [atualizar, setAtualizar] = useState(false);

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return navigate("/");
    const nomeLocal = localStorage.getItem("nome");
    if (nomeLocal) setMostrarNome(nomeLocal);

    const connection = process.env.REACT_APP_API_URL;
    const historico = axios.get(`${connection}home`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    historico
      .then((res) => {
        if (res.data.nome) {
          setMostrarNome(res.data.nome);
        }
        setTransacao(res.data.transacoes.reverse());
        const saldoFinal = res.data.transacoes.reduce((saldo, item) => {
          const valor = parseFloat(item.valor);
          const operacao = item.tipo === "entrada" ? 1 : -1;
          return saldo + valor * operacao;
        }, 0);
        setSaldo(saldoFinal);
      })
      .catch((err) => {
        console.log(JSON.stringify(err.message));
        alert(err.message);
      });
  }, [navigate, atualizar]);
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {mostrarNome}</h1>
        <div onClick={logOut}>
          <BiExit />
        </div>
      </Header>
      <TransactionsContainer>
        <ul>
          {transacao.map((item) => (
            <ListItemContainer key={item._id} atualizar={setAtualizar} item={item} />
          ))}
        </ul>
      </TransactionsContainer>
      <Saldo>
        <strong>Saldo</strong>
        <Value color={saldo >= 0 ? "positivo" : "negativo"}>{saldo}</Value>
      </Saldo>
      <ButtonsContainer>
        <button>
          <Link to={"/nova-transacao/entrada"}>
            <AiOutlinePlusCircle />
            <p>
              Nova <br /> entrada
            </p>
          </Link>
        </button>
        <button>
          <Link to={"/nova-transacao/saida"}>
            <AiOutlineMinusCircle />
            <p>
              Nova <br /> saída
            </p>
          </Link>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
};
export default HomePage;
