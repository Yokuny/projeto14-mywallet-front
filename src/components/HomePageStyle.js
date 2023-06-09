import styled from "styled-components";
export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
  div {
    cursor: pointer;
  }
`;
export const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  height: auto;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;
export const Saldo = styled.article`
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  strong {
    font-weight: 700;
    text-transform: uppercase;
  }
`;
export const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
export const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;
