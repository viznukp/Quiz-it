import axios from "axios";

const update = (id, payload) =>
  axios.put(`/questions/${id}`, { question: payload });

const destroy = id => axios.delete(`questions/${id}`);

const questionsApi = { update, destroy };

export default questionsApi;
