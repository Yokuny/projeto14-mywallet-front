import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";
import axios from "axios";

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const emailRegex = RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);
export default function SignUpPage() {
  const [name, setName] = useState("Nome");
  const [email, setEmail] = useState("E-mail");
  const [password, setPassword] = useState("Senha");
  const [passwordConfirm, setPasswordConfirm] = useState("Confirme a senha");

  return (
    <SingUpContainer>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (
            name.length < 3 ||
            !emailRegex.test(email) ||
            password.length < 3 ||
            passwordConfirm !== password
          ) {
            alert("Preencha os campos corretamente!");
            return;
          } else {
            const user = {
              name,
              email,
              password,
            };
            try {
              const res = await axios.post("http://localhost:5000/cadastro", user);
              const resData = await res.data;
              console.log(resData);
            } catch (err) {
              console.log(err.response.resquest.response);
            }
          }
        }}>
        <MyWalletLogo />
        <input
          type="text"
          placeholder={name}
          onChange={(e) => {
            if (e.target.value.length < 3) {
              e.target.style.border = "2px solid crimson";
            } else {
              e.target.style.border = "2px solid yellowgreen";
              setName(e.target.value);
            }
          }}
          required
        />
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
        <input
          placeholder={passwordConfirm}
          type="password"
          onChange={(e) => {
            if (e.target.value.length < 3) {
              e.target.style.border = "2px solid crimson";
            }
            if (e.target.value === password) {
              e.target.style.border = "2px solid yellowgreen";
              setPasswordConfirm(e.target.value);
            } else {
              e.target.style.border = "2px solid crimson";
              setPasswordConfirm(e.target.value);
            }
          }}
          required
        />
        <button>Cadastrar</button>
      </form>
      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}