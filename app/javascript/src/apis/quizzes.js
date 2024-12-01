import axios from "axios";
import qs from "qs";

const fetch = filters =>
  axios.get("/quizzes", {
    params: filters,
    paramsSerializer: params =>
      qs.stringify(params, { arrayFormat: "brackets" }),
  });

const fetchPublic = () => axios.get("/quizzes/index_public");

const create = payload => axios.post("/quizzes", { quiz: payload });

const show = slug => axios.get(`/quizzes/${slug}`);

const showWithoutAnswer = slug =>
  axios.get(`/quizzes/${slug}/show_quiz_without_answer`);

const update = (slug, payload) =>
  axios.put(`/quizzes/${slug}`, { quiz: payload });

const destroy = slug => axios.delete(`/quizzes/${slug}`);

const addQuestion = payload => axios.post("/questions", { question: payload });

const fetchQuestion = (slug, id) =>
  axios.get(`/quizzes/${slug}/question/${id}`);

const clone = slug => axios.post(`/quizzes/${slug}/clone`);

const deleteMultiple = slugs =>
  axios.delete("/quizzes/bulk_destroy", { data: { quizzes: { slugs } } });

const updateMultiple = (slugs, updateFields) =>
  axios.post("quizzes/bulk_update", { quizzes: { updateFields, slugs } });

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
  updateMultiple,
  fetchPublic,
  showWithoutAnswer,
};

export default quizzesApi;
