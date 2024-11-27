import axios from "axios";

const update = (id, payload) =>
  axios.put(`/questions/${id}`, { question: payload });

const questionsApi = { update };

export default questionsApi;
