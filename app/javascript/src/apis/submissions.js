import axios from "axios";

import { getFromLocalStorage, STORAGE_KEYS } from "utils/storage";

const fetch = (slug, filters) =>
  axios.get("/submissions", { params: { slug, filters } });

const create = payload => axios.post("/submissions", { submission: payload });

const fetchResult = slug => {
  const standard_user_email = getFromLocalStorage(
    STORAGE_KEYS.STANDARD_USER_EMAIL
  );

  return axios.get(`/submissions/${slug}/result`, {
    headers: { "X-Standard-Email": standard_user_email },
  });
};

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
