import axios from "axios";

const fetch = () => axios.get("/quizzes");

const create = payload => axios.post("/quizzes", { quiz: payload });

const show = slug => axios.get(`/quizzes/${slug}`);

const destroy = slug => axios.delete(`/quizzes/${slug}`);

const addQuestion = payload => axios.post("/questions", { question: payload });

const fetchQuestion = (slug, id) =>
  axios.get(`/quizzes/${slug}/question/${id}`);

const quizzesApi = {
  fetch,
  create,
  show,
  destroy,
  addQuestion,
  fetchQuestion,
};

export default quizzesApi;
