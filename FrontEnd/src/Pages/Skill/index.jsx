import React, { useState } from "react";
import "./styles.css";
import { useEffect } from "react";
import { listaSkill, skillPut } from "../../Services/api";
import { FiXCircle } from "react-icons/fi";
import Header from "../../Components/Header";
import FundoHome from "../../Components/FundoHome";
import BotaoVoltar from "../../Components/BotaoVoltar";
const Skill = () => {
  const [skills, setSkills] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [levelSkill, setLevelSkill] = useState("");
  const [selectedSkill, setSelectedSkill] = useState();
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  function onClickSkill(skill) {
    setSelectedSkill(skill);
    setDialogVisible(true);
  }
  useEffect(() => {
    async function fetchSkills() {
      const response = await listaSkill();
      setSkills(response.data);
      console.log(response.data);
    }
    fetchSkills();
  }, []);

  const fetchSkillUsuario = async () => {
    const usuarioId = localStorage.getItem("loggedUserId");
    const id = selectedSkill.skillId;
    console.log(levelSkill);
    try {
      const response = await skillPut(id, usuarioId, levelSkill);
      if (response) {
        setCadastroSucesso(true);
      }
      console.log(response);
    } catch {
      console.log("deu ruim");
    }
  };

  return (
    <FundoHome>
      <div className="skill">
        <Header />
        <BotaoVoltar />
        <dialog open={dialogVisible} className="dialog">
          {cadastroSucesso && (
            <p className="mensagemSucesso">Cadastro concluído!</p>
          )}
          <FiXCircle onClick={() => setDialogVisible(false)} />
          <p className="dialogTitle">
            Qual é o seu nível em {selectedSkill?.nomeSkill} de 1-5?
          </p>
          <div className="dialogInput">
            <input
              type="numeric"
              value={levelSkill}
              onChange={(e) => setLevelSkill(e.target.value)}
            />
          </div>
          <div className="divbotaoconfirmar">
            <button className="botaoConfirmar" onClick={fetchSkillUsuario}>
              Confirmar
            </button>
          </div>
        </dialog>
        <div className="dialogSkill">
          {skills.map((s) => {
            return (
              <button
                className="botaoskill"
                onClick={() => onClickSkill(s)}
                key={s.skillId}
              >
                <p>{s.nomeSkill}</p>
                <img
                  width="50px"
                  src={`data:image/png;base64, ${s.imagem.dados} `}
                />
              </button>
            );
          })}
        </div>
      </div>
    </FundoHome>
  );
};

export default Skill;
