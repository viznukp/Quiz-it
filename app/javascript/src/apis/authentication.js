import axios from "axios";

const signup = payload => axios.post("/users", { user: payload });

const login = payload => axios.post("/session", { session: payload });

const logout = () => axios.delete("/session");

const authenticateStandardUser = payload =>
  axios.post("/users/create_standard_user", { user: payload });

const authApi = {
  signup,
  login,
  logout,
  authenticateStandardUser,
};

export default authApi;
