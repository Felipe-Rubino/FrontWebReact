import React from "react";
import { useState } from "react";
import CadastroForm from "../../Components/CadastroForms";
import { FiEye, FiEyeOff } from "react-icons/fi";
import * as Yup from "yup";
import { create } from "../../Services/api";
import "./styles.css";
import BotaoVoltar from "../../Components/BotaoVoltar";
import Logo from "../../assets/b1_00000.png";
const Cadastro = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMensagem, setErrorMensagem] = useState({});
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const erro = {
    email: "E-mail ou senha inválido",
    password: "E-mail ou senha inválido",
    noEmail: "Por favor coloque o e-mail",
    noPassword: "Por favor coloque a senha",
    noIgualdade: "As senhas devem corresponder",
  };

  const errorMsg = (name) => {
    return (
      errorMensagem &&
      name === errorMensagem.name && (
        <p className="mensagemerrorCadastro">{errorMensagem.message}</p>
      )
    );
  };

  const validadeInput = (email, password, confirmarPassword) => {
    setErrorMensagem(null);
    if (!email) {
      setErrorMensagem({ name: "noEmail", message: erro.noEmail });
      setTimeout(() => {
        setErrorMensagem(null);
      }, 3000);
      return false;
    }
    if (password !== confirmarPassword) {
      setErrorMensagem({ name: "noIgualdade", message: erro.noIgualdade });
      setTimeout(() => {
        setErrorMensagem(null);
      }, 3000);
      return false;
    }
    if (!password) {
      setErrorMensagem({ name: "noPassword", message: erro.noPassword });
      setTimeout(() => {
        setErrorMensagem(null);
      }, 3000);
      return false;
    }
    if (!confirmarPassword) {
      setErrorMensagem({ name: "noPassword", message: erro.noPassword });
      setTimeout(() => {
        setErrorMensagem(null);
      }, 3000);
      return false;
    }
    return true;
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMensagem(null);
    if (validadeInput(email, password, confirmarPassword)) {
      try {
        const response = await create(email, password);
        if (response) {
          setCadastroSucesso(true);
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        } else {
          console.log("Erro no cadastro: ", response.error);
        }
        return;
      } catch (error) {
        setErrorMensagem({
          name: "cadastroError",
          message: "Verifique as credencias e tente novamente!",
        });
        setTimeout(() => {
          setErrorMensagem(null);
        }, 2000);
      }
    }
  };
  return (
    <CadastroForm>
      <BotaoVoltar />
      <img className="logodologin" src={Logo} alt="Logo skill" />
      {errorMsg("noPassword")}
      {errorMsg("noIgualdade")}
      {errorMsg("noEmail")}
      {cadastroSucesso && (
        <p className="mensagemSucesso">Cadastro concluído!</p>
      )}
      <h1 className="tituloCadastro"> Cadastro </h1>
      <form onSubmit={handleRegister}>
        <div className="input_container">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="containerdasenhaCadastro">
            <input
              className="inputsenhaCadastro"
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FiEye size={24} onClick={togglePasswordVisibility} />
            ) : (
              <FiEyeOff size={24} onClick={togglePasswordVisibility} />
            )}
            <input
              className="inputsenha"
              type={showPassword ? "text" : "password"}
              placeholder="Confirmar senha"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
            />
            {showPassword ? (
              <FiEye size={24} onClick={togglePasswordVisibility} />
            ) : (
              <FiEyeOff size={24} onClick={togglePasswordVisibility} />
            )}
          </div>
          <div>
            <button onClick={handleRegister} className="botaocadastro">
              Cadastro
            </button>
          </div>
        </div>
      </form>
    </CadastroForm>
  );
};

export default Cadastro;
