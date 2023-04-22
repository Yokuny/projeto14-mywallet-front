import styled from "styled-components"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
export default function TransactionsPage() {
  const [valor, setValor] = useState("Valor");
  const [descricao, setDescricao] = useState("Descrição");
  const { tipo } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      return navigate("/");
    }
  }, []);
  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const token = JSON.parse(localStorage.getItem("token"));
          axios
            .post(
              `http://localhost:5000/nova-transacao/${tipo}`,
              { valor, descricao },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then(() => {
              navigate("/home");
            })
            .catch((err) => {
              console.log(err);
              alert(err.data);
            });
        }}>
        <input
          placeholder={valor}
          onChange={({ target }) => {
            if (parseFloat(target.value) >= 0.01) {
              setValor(target.value);
              target.style.border = "2px solid yellowgreen";
            } else {
              target.style.border = "2px solid crimson";
            }
          }}
          type="text"
          required
        />
        <input
          placeholder={descricao}
          onChange={({ target }) => {
            if (target.value.length > 1) {
              setDescricao(target.value);
              target.style.border = "2px solid yellowgreen";
            } else {
              target.style.border = "2px solid crimson";
            }
          }}
          required
          type="text"
        />
        <button>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
