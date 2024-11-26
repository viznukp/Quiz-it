import axios from "axios";

const fetch = () => axios.get("/quizzes");

const create = payload => axios.post("/quizzes", { quiz: payload });

const show = slug => axios.get(`/quizzes/${slug}`);

const addQuestion = payload => axios.post("/questions", { question: payload });

const quizzesApi = { fetch, create, show, addQuestion };

export default quizzesApi;
