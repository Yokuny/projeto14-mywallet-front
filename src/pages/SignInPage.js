import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyWalletLogo from "../components/MyWalletLogo";
import SingInContainer from "../components/SingInContainer.js";
import emailRegex from "../scripts/regex";

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
        //
        console.log(response.data.token);
        //
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("name", JSON.stringify(response.data.name));
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
          placeholder={email}
          onChange={({ target }) => {
            if (emailRegex.test(target.value)) {
              setEmail(target.value);
              target.style.border = "2px solid yellowgreen";
            } else {
              target.style.border = "2px solid crimson";
            }
          }}
          type="email"
          required
        />
        <input
          placeholder={password}
          onChange={({ target }) => {
            if (target.value.length < 3) {
              target.style.border = "2px solid crimson";
            } else {
              target.style.border = "2px solid yellowgreen";
              setPassword(target.value);
            }
          }}
          type="password"
          required
        />
        <button>Entrar</button>
      </form>
      <Link to="./cadastro">Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}
