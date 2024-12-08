import axios from "axios";

const fetch = filters => axios.get("/quizzes", { params: filters });

const fetchPublic = filters =>
  axios.get("/quizzes/index_public", { params: filters });

const create = payload => axios.post("/quizzes", { quiz: payload });

const show = slug => axios.get(`/quizzes/${slug}`);

const showWithoutAnswer = slug =>
  axios.get(`/quizzes/${slug}/show_quiz_without_answer`);

const update = (slug, payload) =>
  axios.put(`/quizzes/${slug}`, { quiz: payload });

const destroy = slug => axios.delete(`/quizzes/${slug}`);

const addQuestion = payload => axios.post("/questions", { question: payload });

const clone = (slug, newName) =>
  axios.post(`/quizzes/${slug}/clone`, { quiz: { name: newName } });

const deleteMultiple = slugs =>
  axios.delete("/quizzes/bulk_destroy", { data: { quizzes: { slugs } } });

const updateMultiple = (slugs, updateFields) =>
  axios.put("/quizzes/bulk_update", { quizzes: { updateFields, slugs } });

const fetchQuizStats = () => axios.get("quizzes/stats");

const quizzesApi = {
  fetch,
  show,
  create,
  clone,
  update,
  destroy,
  addQuestion,
  deleteMultiple,
  updateMultiple,
  fetchPublic,
  showWithoutAnswer,
  fetchQuizStats,
};

export default quizzesApi;
