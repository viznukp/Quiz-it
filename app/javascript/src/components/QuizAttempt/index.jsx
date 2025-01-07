import React from "react";

import { Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";
import routes from "src/routes";

import { RegisterStandardUser } from "components/Authentication";
import { PageLoader, NoData } from "components/commons";
import { useShowQuiz } from "hooks/reactQuery/usePublicApi";
import { setPublicUserToLocalStorage } from "utils/storage";
import { buildRoute } from "utils/url";

const QuizAttempt = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const history = useHistory();

  const { data = {}, isLoading } = useShowQuiz(slug);
  const { quiz: { name: quizName, timeLimit = 0 } = {} } = data;

  const redirectAfterRegistration = responseData => {
    setPublicUserToLocalStorage(responseData.id);
    history.push(buildRoute(routes.public.quiz.attempt, { slug }));
  };

  if (isLoading) {
    return <PageLoader fullScreen />;
  }

  if (isEmpty(data)) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <NoData
          message={t("messages.error.invalidQuizLink")}
          buttonProps={{
            label: t("labels.tryOtherQuiz"),
            onClick: () => history.push(routes.public.home),
          }}
        />
      </div>
    );
  }

  return (
    <div className="neeto-ui-bg-gray-100 flex h-screen items-center justify-center overflow-y-auto p-6">
      <div className=" max-w-6xl sm:max-w-md lg:max-w-xl ">
        <Typography style="h1">{quizName}</Typography>
        {timeLimit > 0 && (
          <Typography className="mt-4">
            {t("messages.info.timedQuiz")}
          </Typography>
        )}
        <RegisterStandardUser
          afterRegistration={redirectAfterRegistration}
          className="mt-12"
        />
      </div>
    </div>
  );
};

export default QuizAttempt;
