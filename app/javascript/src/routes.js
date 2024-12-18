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
  },
  publicPage: "/public",
  registerStandardUser: "/user/standard/register/:slug",
  attemptQuiz: "/quiz/:slug",
  settings: {
    general: "/settings/general",
    categories: "/settings/categories",
  },
};

export default routes;
