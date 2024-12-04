import axios from "axios";

const show = () => axios.get("/organization");

const organizationApi = { show };

export default organizationApi;
