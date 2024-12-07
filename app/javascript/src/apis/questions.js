import axios from "axios";

const update = (id, payload) =>
  axios.put(`/questions/${id}`, { question: payload });

const destroy = id => axios.delete(`questions/${id}`);

const clone = id => axios.get(`questions/${id}/clone`);

const show = ({ slug, id }) =>
  axios.get(`/questions/${id}`, { params: { slug } });

const questionsApi = { show, update, destroy, clone };

export default questionsApi;
