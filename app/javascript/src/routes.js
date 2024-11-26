const routes = {
  root: "/",
  signup: "/signup",
  login: "/login",
  quiz: {
    questions: "/:slug/questions",
    new: "/:slug/questions/new",
  },
};

export default routes;
