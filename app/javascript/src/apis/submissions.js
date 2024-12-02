import axios from "axios";

const fetch = slug => axios.get(`/submissions/${slug}`);

const create = payload => axios.post("/submissions", { submission: payload });

const submissionsApi = { fetch, create };

export default submissionsApi;
