import axios from "axios";

const fetch = () => axios.get("/submissions");

const create = payload => axios.post("/submissions", { submission: payload });

const submissionsApi = { fetch, create };

export default submissionsApi;
