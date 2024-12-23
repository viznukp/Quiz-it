import axios from "axios";

const fetch = () => axios.get("/redirections");

const create = payload => axios.post("/redirections", { redirection: payload });

const redirectionsApi = { fetch, create };

export default redirectionsApi;
