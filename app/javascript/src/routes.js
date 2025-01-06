const routes = {
  root: "/dashboard",
  signup: "/signup",
  login: "/login",
  quiz: {
    questions: "/:slug/questions",
    question: {
      new: "/:slug/question/new",
      edit: "/:slug/questions/:id/edit",
    },
    submissions: "/:slug/submissions",
    result: "/submissions/:slug/:userId/result",
    configure: "/:slug/configure",
  },
  publicPage: "/public",
  registerQuiz: "/quiz/:slug/register",
  attemptQuiz: "/quiz/:slug",
  settings: {
    base: "/settings",
    general: "/settings/general",
    categories: "/settings/categories",
    redirections: "/settings/redirections",
  },
};

export default routes;
