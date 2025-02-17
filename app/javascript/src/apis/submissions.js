import axios from "axios";

import { browserTimeZone } from "utils/browserTimeZone";

const fetch = (slug, filters) =>
  axios.get("/submissions", { params: { slug, filters } });

const create = payload => axios.post("/submissions", payload);

const fetchResult = (slug, userId) =>
  axios.get(`/submissions/${slug}/result`, { params: { userId } });

const generatePdf = slug =>
  axios.post("/submissions/report", {
    submission: { slug, timezone: browserTimeZone() },
  });

const downloadPdf = () =>
  axios.get("/submissions/report/download", { responseType: "blob" });

const submissionsApi = {
  fetch,
  create,
  fetchResult,
  generatePdf,
  downloadPdf,
};

export default submissionsApi;
