import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Value } from "../components/HomePageStyle";

export const ListItemStyle = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
  div:last-child {
    display: flex;
    gap: 11px;
    align-items: end;
  }
  div:last-child span {
    font-size: 16px;
    cursor: pointer;
  }
`;

const ListItemContainer = ({ atualizar, item }) => {
  const navigate = useNavigate();

  const deletarItem = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return navigate("/");

    const confirmar = window.confirm("Deseja mesmo deletar esta transação?");
    if (!confirmar) return;

    const connection = process.env.REACT_APP_API_URL;
    const deletar = axios.delete(`${connection}home/${item._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    deletar
      .then((res) => {
        if (res.status === 200) {
          atualizar((current) => !current);
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err.message));
        alert(err.message);
      });
  };

  return (
    <ListItemStyle id={item._id}>
      <div>
        <span>{item.data}</span>
        <strong>{item.descricao}</strong>
      </div>
      <div>
        <Value color={item.tipo === "entrada" ? "positivo" : "negativo"}>{item.valor}</Value>
        <span onClick={deletarItem}>X</span>
      </div>
    </ListItemStyle>
  );
};
export default ListItemContainer;
