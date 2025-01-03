import axios from "axios";

const fetch = () => axios.get("/categories");

const create = payload => axios.post("/categories", { category: payload });

const update = ({ id, payload }) =>
  axios.put(`/categories/${id}`, { category: payload });

const destroy = ({ id, payload }) =>
  axios.delete(`/categories/${id}`, { params: payload });

const reorder = ({ id, position }) =>
  axios.put(`/categories/${id}/order`, { position });

const categoriesApi = { fetch, create, update, destroy, reorder };

export default categoriesApi;
