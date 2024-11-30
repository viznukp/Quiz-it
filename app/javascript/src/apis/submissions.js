import axios from "axios";

const create = payload => axios.post("/submissions", { submission: payload });

const submissionsApi = { create };

export default submissionsApi;
