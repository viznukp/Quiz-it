import axios from "axios";

const fetch = filters => axios.get("/public/quizzes", { params: filters });

const show = slug => axios.get(`/public/quizzes/${slug}/`);

const publicApi = { fetch, show };

export default publicApi;
