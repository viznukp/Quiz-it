import axios from "axios";

import { getFromLocalStorage, STORAGE_KEYS } from "utils/storage";

const fetch = (slug, filters) =>
  axios.get("/submissions", { params: { slug, filters } });

const create = payload => axios.post("/submissions", { submission: payload });

const fetchResult = slug =>
  axios.get(`/submissions/${slug}/result`, {
    headers: {
      "X-Standard-Email": getFromLocalStorage(STORAGE_KEYS.STANDARD_USER_EMAIL),
    },
  });

const checkSubmissionExists = slug =>
  axios.get("/submissions/check", {
    params: { slug },
    headers: {
      "X-Standard-Email": getFromLocalStorage(STORAGE_KEYS.STANDARD_USER_EMAIL),
    },
  });

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
