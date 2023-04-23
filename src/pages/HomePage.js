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
  ListItemContainer,
  Value,
  ButtonsContainer,
} from "../components/homePageStyle";

const HomePage = () => {
  const navigate = useNavigate();
  const [mostrarNome, setMostrarNome] = useState("Fulano");
  const [transacao, setTransacao] = useState([]);

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
        setMostrarNome(res.data.name);
        setTransacao(res.data.transactions.reverse());
        console.log(res.data.transactions);
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
        <BiExit />
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

        <article>
          <strong>Saldo</strong>

          {/* <Value color={"positivo"}>{transacao.reduce((item) => )}</Value> */}
        </article>
      </TransactionsContainer>

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
              Nova <br />
              saída
            </p>
          </Link>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
};
export default HomePage;
