import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";
import emailRegex from "../scripts/regex";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("E-mail");
  const [password, setPassword] = useState("Senha");

  const login = async () => {
    if (!emailRegex.test(email) || password.length < 3) {
      alert("Preencha os campos corretamente!");
      return;
    } else {
      const user = {
        email,
        password,
      };
      try {
        const response = await axios.post("http://localhost:5000/login", user);
        localStorage.setItem("token", JSON.stringify(response.data));
        navigate("/home");
      } catch (err) {
        console.log(err.response.data.message);
      }
    }
  };
  return (
    <SingInContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}>
        <MyWalletLogo />

        <input
          type={email}
          placeholder="E-mail"
          onChange={(e) => {
            if (emailRegex.test(e.target.value)) {
              setEmail(e.target.value);
              e.target.style.border = "2px solid yellowgreen";
            } else {
              e.target.style.border = "2px solid crimson";
            }
          }}
          required
        />

        <input
          placeholder={password}
          type="password"
          onChange={(e) => {
            if (e.target.value.length < 3) {
              e.target.style.border = "2px solid crimson";
            } else {
              e.target.style.border = "2px solid yellowgreen";
              setPassword(e.target.value);
            }
          }}
          required
        />
        <button>Entrar</button>
      </form>

      <Link to="./cadastro">Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}