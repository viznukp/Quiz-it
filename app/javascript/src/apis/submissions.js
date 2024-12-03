import axios from "axios";

const fetch = slug => axios.get(`/submissions/${slug}`);

const create = payload => axios.post("/submissions", { submission: payload });

const fetchResult = slug => axios.get(`/submissions/${slug}/result`);

const submissionsApi = { fetch, create, fetchResult };

export default submissionsApi;
