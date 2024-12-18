import axios from "axios";

const fetch = () => axios.get("/categories");

const create = payload => axios.post("/categories", { category: payload });

const updateOrder = order =>
  axios.put("/categories/bulk_update", { categories: { order } });

const categoriesApi = { fetch, create, updateOrder };

export default categoriesApi;
