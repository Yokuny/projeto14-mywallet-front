import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function SignInPage() {
  return (
    <SingInContainer>
      <form
        onSubmit={() => {
          console.log("Entrou");
        }}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" />
        <input placeholder="Senha" type="password" />
        <button>Entrar</button>
      </form>

      <Link to="./cadastro">Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}