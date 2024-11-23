import axios from "axios";

const signup = payload => axios.post("/users", { user: payload });

const login = payload => axios.post("/session", { session: payload });

const logout = () => axios.delete("/session");

const authApi = {
  signup,
  login,
  logout,
};

export default authApi;
