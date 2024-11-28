import axios from "axios";

const fetch = () => axios.get("/quizzes");

const create = payload => axios.post("/quizzes", { quiz: payload });

const show = slug => axios.get(`/quizzes/${slug}`);

const update = (slug, payload) =>
  axios.put(`/quizzes/${slug}`, { quiz: payload });

const destroy = slug => axios.delete(`/quizzes/${slug}`);

const addQuestion = payload => axios.post("/questions", { question: payload });

const fetchQuestion = (slug, id) =>
  axios.get(`/quizzes/${slug}/question/${id}`);

const clone = slug => axios.post(`/quizzes/${slug}/clone`);

const deleteMultiple = slugs =>
  axios.delete("/quizzes/bulk_destroy", { data: { quizzes: { slugs } } });

const quizzesApi = {
  fetch,
  show,
  create,
  clone,
  update,
  destroy,
  addQuestion,
  fetchQuestion,
  deleteMultiple,
};

export default quizzesApi;
