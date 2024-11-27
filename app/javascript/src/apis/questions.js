import axios from "axios";

const update = (id, payload) =>
  axios.put(`/questions/${id}`, { question: payload });

const destroy = id => axios.delete(`questions/${id}`);

const clone = id => axios.get(`questions/${id}/clone`);

const questionsApi = { update, destroy, clone };

export default questionsApi;
