import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyWalletLogo from "../components/MyWalletLogo";
import SingInContainer from "../components/SingInContainer.js";
import emailRegex from "../scripts/regex";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("E-mail");
  const [senha, setSenha] = useState("Senha");

  const login = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email) || senha.length < 3) {
      return alert("Preencha os campos corretamente!");
    }
    const user = {
      email,
      senha,
    };
    try {
      const connection = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${connection}login`, user);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("nome", JSON.stringify(response.data.nome));
      navigate("/home");
    } catch (err) {
      console.log(JSON.stringify(err.message));
      alert(err.message);
    }
  };
  const inputEmail = ({ target }) => {
    if (emailRegex.test(target.value)) {
      setEmail(target.value);
      target.style.border = "2px solid yellowgreen";
    } else {
      target.style.border = "2px solid crimson";
    }
  };
  const inputSenha = ({ target }) => {
    if (target.value.length < 3) {
      target.style.border = "2px solid crimson";
    } else {
      target.style.border = "2px solid yellowgreen";
      setSenha(target.value);
    }
  };
  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input placeholder={email} onChange={inputEmail} type="email" required />
        <input placeholder={senha} onChange={inputSenha} type="password" required />
        <button>Entrar</button>
      </form>
      <Link to="./cadastro">Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
};
export default SignInPage;