import axios from "axios";

const fetch = () => axios.get("/categories");

const updateOrder = order =>
  axios.put("/categories/bulk_update", { categories: { order } });

const categoriesApi = { fetch, updateOrder };

export default categoriesApi;
