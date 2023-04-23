import { Link, json } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SingUpContainer from "../components/SingUpContainer.js";
import MyWalletLogo from "../components/MyWalletLogo";
import emailRegex from "../scripts/regex";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("Nome");
  const [email, setEmail] = useState("E-mail");
  const [senha, setSennha] = useState("Senha");
  const [senhaCheck, setSennhaCheck] = useState("Confirme a senha");

  const registrar = async (e) => {
    e.preventDefault();
    if (nome.length < 3 || !emailRegex.test(email) || senha.length < 3 || senhaCheck !== senha) {
      alert("Preencha os campos corretamente!");
      return;
    }
    const user = {
      nome,
      email,
      senha,
    };
    try {
      await axios.post("http://localhost:5000/cadastro", user);
      navigate("/");
    } catch (err) {
      console.log(JSON.stringify(err.message));
      alert(err.message);
    }
  };

  const inputNome = ({ target }) => {
    if (target.value.length < 3) {
      target.style.border = "2px solid crimson";
    } else {
      target.style.border = "2px solid yellowgreen";
      setNome(target.value);
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
      setSennha(target.value);
    }
  };
  const inputSenhaCheck = ({ target }) => {
    if (target.value.length < 3 || target.value !== senha) {
      target.style.border = "2px solid crimson";
    } else {
      target.style.border = "2px solid yellowgreen";
      setSennhaCheck(target.value);
    }
  };

  return (
    <SingUpContainer>
      <form onSubmit={registrar}>
        <MyWalletLogo />
        <input placeholder={nome} onChange={inputNome} type="text" required />
        <input placeholder={email} onChange={inputEmail} type="E-mail" required />
        <input placeholder={senha} onChange={inputSenha} type="password" required />
        <input placeholder={senhaCheck} onChange={inputSenhaCheck} type="password" required />
        <button>Cadastrar</button>
      </form>
      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
};
export default SignUpPage;
