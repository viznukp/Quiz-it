import axios from "axios";

const signup = payload => axios.post("/users", { user: payload });

const login = payload => axios.post("/session", { session: payload });

const logout = () => axios.delete("/session");

const registerStandardUser = payload =>
  axios.post("/users/create_standard_user", { user: payload });

const authApi = {
  signup,
  login,
  logout,
  registerStandardUser,
};

export default authApi;
