import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import FundoHome from "../../Components/FundoHome";
import "./styles.css";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { api, atualizarId, deleteUsuarioId } from "../../Services/api";
import { FiXCircle } from "react-icons/fi";
const Home = () => {
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [levelSkill, setLevelSkill] = useState("");
  const [selectedSkill, setSelectedSkill] = useState();
  const [confirmaMessage, setConfirmaMessage] = useState("");
  function onClickSkill(skill) {
    console.log(skill);
    setSelectedSkill(skill);
  }
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchNivelSkill = async () => {
    const usuarioId = localStorage.getItem("loggedUserId");
    console.log(usuarioId);
    const id = selectedSkill ? selectedSkill.skillId : null;
    console.log(id);
    try {
      const response = await atualizarId(id, levelSkill, usuarioId);
      setConfirmaMessage("Nivel de skill atualizada!");
      setTimeout(() => {
        setConfirmaMessage("");
      }, 2000);
      fetchSkill();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDeleteUsuarioId = async () => {
    const usuarioId = localStorage.getItem("loggedUserId");
    const id = selectedSkill ? selectedSkill.skillId : null;
    try {
      const response = await deleteUsuarioId(usuarioId, id);
      console.log(response);
      fetchSkill();
    } catch (error) {
      console.log(error);
    }
  };

  function handleSkill() {
    return (window.location.href = "/skills");
  }

  const fetchSkill = async () => {
    const usuarioId = localStorage.getItem("loggedUserId");
    try {
      const response = await fetch(
        `http://localhost:8080/api/skill/${usuarioId}/skillUsuario`
      );
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setSkills(data);
      } else {
        setSkills([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSkill();
  }, []);
  return (
    <FundoHome>
      <Header />
      <p className="tituloHome"> Essas são suas skills!</p>
      <div className="container">
        <div className="containerModal">
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <button onClick={closeModal} className="botaofechar">
                  <FiXCircle />
                </button>
                <div className="confirmaMessage">{confirmaMessage}</div>
                <p className="dialogTitle">Atualize aqui seu level</p>
                <div className="dialogInput">
                  <input
                    type="numeric"
                    value={levelSkill}
                    onChange={(e) => setLevelSkill(e.target.value)}
                  />
                </div>
                <div className="divbotaoconfirmar">
                  <button onClick={fetchNivelSkill} className="botaoConfirmar">
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {skills.map((s) => {
          return (
            <div
              className="listaHomeSkills"
              key={s.skillId}
              onClick={() => onClickSkill(s)}
            >
              <p className="nomeSkill">{s.nomeSkill}</p>
              <p className="tituloSkill">{s.descricao}</p>
              <p className="levelSkill">
                Seu level nessa skill é {s.levelSkill}
              </p>
              <div className="divdafoto">
                <img
                  className="imagemSkill"
                  width="120px"
                  src={`data:image/png;base64, ${s.imagem.dados} `}
                />
              </div>
              <div className="divdalixeira">
                <button
                  onClick={() => fetchDeleteUsuarioId()}
                  className="botaoexcluir"
                >
                  <FiTrash2 size={18} color="red" />
                </button>
              </div>
              <div className="divdolapis">
                <button className="botaoeditar" onClick={openModal}>
                  <FiEdit2 size={18} className="lapis" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="paginahomebotao">
        <button onClick={handleSkill} className="cadastroskillhome">
          Cadastrar Skill
        </button>
      </div>
    </FundoHome>
  );
};

export default Home;
