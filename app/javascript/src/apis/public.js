import axios from "axios";

const fetch = filters => axios.get("/public/quizzes", { params: filters });

const publicApi = { fetch };

export default publicApi;
