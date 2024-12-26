import axios from "axios";

const fetch = () => axios.get("/redirections");

const create = payload => axios.post("/redirections", { redirection: payload });

const update = (id, payload) =>
  axios.put(`/redirections/${id}`, { redirection: payload });

const redirectionsApi = { fetch, create, update };

export default redirectionsApi;
