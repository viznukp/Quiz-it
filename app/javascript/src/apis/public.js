import axios from "axios";

const fetchQuizzes = filters =>
  axios.get("/public/quizzes", { params: filters });

const showQuiz = slug => axios.get(`/public/quizzes/${slug}/`);

const fetchQuestions = ({ slug, userId }) =>
  axios.get(`/public/questions/${slug}`, { params: { userId } });

const fetchCategories = () => axios.get("/public/categories");

const publicApi = { fetchQuizzes, showQuiz, fetchQuestions, fetchCategories };

export default publicApi;
