import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const createSession = async (email, password, loggedUserId, token) => {
  return api.post("/auth/signin", { email, password, loggedUserId, token });
};
export const create = async (email, password) => {
  return api.post("/auth/signup", { email, password });
};

export const listaSkill = async () => {
  return api.get("/skill/listar");
};

export const deleteId = async (id) => {
  return api.delete(`/skill/${id}`);
};

export const deleteUsuarioId = async(usuarioId, skillId) => {
  return api.delete(`/skill/${usuarioId}/${skillId}`);
};

export const skillPut = async (id, usuarioId, levelSkill) => {
  return api.put(`/skill/levelSkill`, { levelSkill, usuarioId, skillId: id });
};

export const getIdSkill = async (id) => {
  return api.get(`/skill/${id}`);
};

export const atualizarId = async (id, levelSkill, usuarioId) => {
  return api.put(`/skill/atualizar`, { skillId: id, levelSkill, usuarioId });
};
