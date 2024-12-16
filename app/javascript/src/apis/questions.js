import axios from "axios";

const create = ({ slug, questionData }) =>
  axios.post("/questions", { question: questionData, slug });

const show = ({ slug, id }) =>
  axios.get(`/questions/${id}`, { params: { slug } });

const update = (id, payload) =>
  axios.put(`/questions/${id}`, { question: payload });

const destroy = id => axios.delete(`/questions/${id}`);

const clone = id => axios.post(`/questions/${id}/clone`);

const questionsApi = { create, show, update, destroy, clone };

export default questionsApi;
