import axios from "axios";

const fetch = slug => axios.get(`/submissions/${slug}`);

const create = payload => axios.post("/submissions", { submission: payload });

const fetchResult = slug => axios.get(`/submissions/${slug}/result`);

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
};

export default submissionsApi;
