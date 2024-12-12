import axios from "axios";

const fetch = (slug, filters) =>
  axios.get("/submissions", { params: { slug, filters } });

const create = payload => axios.post("/submissions", payload);

const fetchResult = (slug, userId) =>
  axios.get(`/submissions/${slug}/result`, { params: { slug, userId } });

const checkSubmissionExists = (slug, userId) =>
  axios.get("/submissions/check", { params: { slug, userId } });

const generatePdf = slug =>
  axios.post("/submissions/report", { submission: { slug } });

const download = () =>
  axios.get("/submissions/report/download", { responseType: "blob" });

const submissionsApi = {
  fetch,
  create,
  fetchResult,
  generatePdf,
  download,
  checkSubmissionExists,
};

export default submissionsApi;
