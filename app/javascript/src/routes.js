const routes = {
  index: "",
  root: "/",
  admin: {
    dashboard: "/admin/dashboard",
    signup: "/admin/signup",
    login: "/admin/login",
    quiz: {
      questions: "/admin/quiz/:slug/questions",
      question: {
        new: "/admin/quiz/:slug/question/new",
        edit: "/admin/quiz/:slug/questions/:id/edit",
      },
      submissions: "/admin/quiz/:slug/submissions",
      configure: "/admin/quiz/:slug/configure",
    },
    settings: {
      base: "/admin/settings",
      general: "/admin/settings/general",
      categories: "/admin/settings/categories",
      redirections: "/admin/settings/redirections",
    },
  },
  public: {
    home: "/quizit",
    quiz: {
      register: "/quizit/quiz/:slug/register",
      attempt: "/quizit/quiz/:slug/attempt",
      result: "/quizit/quiz/:slug/:userId/result",
    },
  },
};

export default routes;
