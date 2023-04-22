import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import {
  HomeContainer,
  Header,
  TransactionsContainer,
  ListItemContainer,
  Value,
  ButtonsContainer,
} from "../style/homePageStyle";
import { Link } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("Fulano");
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      navigate("/login");
    }
    if (localStorage.getItem("name")) {
      setDisplayName(JSON.parse(localStorage.getItem("name")));
    }
    console.log(token);
    const history = axios.get("http://localhost:5000/home", {
      headers: { Authorization: `Bearer ${token}` },
    });
    history
      .then((res) => {
        setDisplayName(res.data.name);
        setTransactions(res.data.transactions);
        //
        console.log(res.data);
        //
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {displayName}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          <ListItemContainer>
            <div>
              <span>30/11</span>
              <strong>Almoço mãe</strong>
            </div>
            <Value color={"negativo"}>120,00</Value>
          </ListItemContainer>

          <ListItemContainer>
            <div>
              <span>15/11</span>
              <strong>Salário</strong>
            </div>
            <Value color={"positivo"}>3000,00</Value>
          </ListItemContainer>
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={"positivo"}>2880,00</Value>
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
}
