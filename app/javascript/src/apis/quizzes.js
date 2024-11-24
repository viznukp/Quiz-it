import axios from "axios";

const fetch = () => axios.get("/quizzes");

const create = payload => axios.post("/quizzes", { quiz: payload });

const quizzesApi = { fetch, create };

export default quizzesApi;
