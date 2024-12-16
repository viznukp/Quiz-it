import axios from "axios";

const fetch = filters => axios.get("/public/quizzes", { params: filters });

const show = slug => axios.get(`/public/quizzes/${slug}/`);

const fetchQuestionsForAttempt = (slug, userId) =>
  axios.get(`/public/questions/${slug}`, { params: { userId } });

const publicApi = { fetch, show, fetchQuestionsForAttempt };

export default publicApi;
