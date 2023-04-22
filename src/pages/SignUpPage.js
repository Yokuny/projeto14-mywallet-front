import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SingUpContainer from "../components/SingUpContainer.js";
import MyWalletLogo from "../components/MyWalletLogo";
import emailRegex from "../scripts/regex";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("Nome");
  const [email, setEmail] = useState("E-mail");
  const [password, setPassword] = useState("Senha");
  const [passwordConfirm, setPasswordConfirm] = useState("Confirme a senha");

  const register = async () => {
    if (name.length < 3 || !emailRegex.test(email) || password.length < 3 || passwordConfirm !== password) {
      alert("Preencha os campos corretamente!");
      return;
    } else {
      const user = {
        name,
        email,
        password,
      };
      try {
        await axios.post("http://localhost:5000/cadastro", user);
        navigate("/");
      } catch (err) {
        console.log(err.response.data.message);
      }
    }
  };
  return (
    <SingUpContainer>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          register();
        }}>
        <MyWalletLogo />
        <input
          placeholder={name}
          onChange={(e) => {
            if (e.target.value.length < 3) {
              e.target.style.border = "2px solid crimson";
            } else {
              e.target.style.border = "2px solid yellowgreen";
              setName(e.target.value);
            }
          }}
          type="text"
          required
        />
        <input
          placeholder={email}
          onChange={(e) => {
            if (emailRegex.test(e.target.value)) {
              setEmail(e.target.value);
              e.target.style.border = "2px solid yellowgreen";
            } else {
              e.target.style.border = "2px solid crimson";
            }
          }}
          type="E-mail"
          required
        />
        <input
          placeholder={password}
          onChange={(e) => {
            if (e.target.value.length < 3) {
              e.target.style.border = "2px solid crimson";
            } else {
              e.target.style.border = "2px solid yellowgreen";
              setPassword(e.target.value);
            }
          }}
          type="password"
          required
        />
        <input
          placeholder={passwordConfirm}
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
          type="password"
          required
        />
        <button>Cadastrar</button>
      </form>
      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}
