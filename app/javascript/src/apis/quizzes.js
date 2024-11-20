import axios from "axios";

const fetch = () => axios.get("/quizzes");

const quizzesApi = { fetch };

export default quizzesApi;
