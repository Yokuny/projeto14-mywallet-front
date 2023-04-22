import styled from "styled-components"
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
export default function TransactionsPage() {
  const [value, setValue] = useState("Valor");
  const [description, setDescription] = useState("Descrição");
  const { tipo } = useParams();
  const navigate = useNavigate();
  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const token = JSON.parse(localStorage.getItem("token"));
          if (!token) {
            navigate("/login");
          }
          axios
            .post(
              `http://localhost:5000/nova-transacao/${tipo}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              },
              { value, description }
            )
            .then((res) => {
              navigate("/home");
            })
            .catch((err) => {
              alert(err.message);
            });
        }}>
        <input
          placeholder={value}
          onChange={({ target }) => {
            if (parseFloat(target.value) >= 0.01) {
              setValue(target.value);
              target.style.border = "2px solid yellowgreen";
            } else {
              target.style.border = "2px solid crimson";
            }
          }}
          type="text"
          required
        />
        <input
          placeholder={description}
          onChange={({ target }) => {
            if (target.value.length > 1) {
              setDescription(target.value);
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
