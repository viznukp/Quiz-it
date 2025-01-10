import axios from "axios";

const fetch = filters => axios.get("/quizzes", { params: filters });

const create = payload => axios.post("/quizzes", { quiz: payload });

const show = slug => axios.get(`/quizzes/${slug}`);

const update = ({ slug, payload }) =>
  axios.put(`/quizzes/${slug}`, { quiz: payload });

const destroy = slug => axios.delete(`/quizzes/${slug}`);

const clone = ({ slug, name }) =>
  axios.post(`/quizzes/${slug}/clone`, { quiz: { name } });

const deleteMultiple = slugs =>
  axios.delete("/quizzes/bulk_destroy", { data: { quizzes: { slugs } } });

const updateMultiple = ({ slugs, updateFields }) =>
  axios.put("/quizzes/bulk_update", { quizzes: { updateFields, slugs } });

const quizzesApi = {
  fetch,
  show,
  create,
  clone,
  update,
  destroy,
  deleteMultiple,
  updateMultiple,
};

export default quizzesApi;
