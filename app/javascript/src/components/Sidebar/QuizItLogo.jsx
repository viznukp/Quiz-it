import React from "react";

import classNames from "classnames";
import { Typography } from "neetoui";

import { NeetoQuiz } from "neetoicons/app-icons";

const QuizItLogo = ({ isExpanded = false }) => (
  <div
    className={classNames("flex w-full items-center gap-3 ", {
      "justify-center": !isExpanded,
    })}
  >
    <NeetoQuiz size={40} />
    {isExpanded && (
      <Typography style="h1" weight="bold">
        Quiz<span className="text-green-500">It</span>
      </Typography>
    )}
  </div>
);

export default QuizItLogo;
