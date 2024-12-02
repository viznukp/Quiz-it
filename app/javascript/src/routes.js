const routes = {
  root: "/",
  signup: "/signup",
  login: "/login",
  quiz: {
    questions: "/:slug/questions",
    question: {
      new: "/:slug/question/new",
      edit: "/:slug/questions/:id/edit",
      clone: "/:slug/questions/:id/clone",
    },
  },
  publicPage: "/public",
  registerStandardUser: "/user/standard/register/:slug",
  attemptQuiz: "/quiz/:slug",
  submissions: "/submissions",
};

export default routes;
