import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import {
  HomeContainer,
  Header,
  TransactionsContainer,
  Saldo,
  ListItemContainer,
  Value,
  ButtonsContainer,
} from "../components/homePageStyle";

const HomePage = () => {
  const navigate = useNavigate();
  const [mostrarNome, setMostrarNome] = useState("bom dia!");
  const [transacao, setTransacao] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return navigate("/");
    const nomeLocal = localStorage.getItem("nome");
    if (nomeLocal) setMostrarNome(nomeLocal);

    const historico = axios.get("http://localhost:5000/home", {
      headers: { Authorization: `Bearer ${token}` },
    });
    historico
      .then((res) => {
        if (res.data.nome) {
          setMostrarNome(res.data.nome);
        }
        setTransacao(res.data.transacoes.reverse());
        console.log(res.data.transacoes);
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
  }, []);
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
          {transacao.map((item) => {
            return (
              <ListItemContainer key={item._id}>
                <div>
                  <span>{item.data}</span>
                  <strong>{item.descricao}</strong>
                </div>
                <Value color={item.tipo === "entrada" ? "positivo" : "negativo"}>{item.valor}</Value>
              </ListItemContainer>
            );
          })}
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
