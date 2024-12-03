import React from "react";

import classNames from "classnames";
import { Typography } from "neetoui";

const Score = ({ label, score, className = "" }) => (
  <div
    className={classNames(
      "flex flex-1 flex-col items-center justify-center gap-1 rounded-lg p-3",
      [className]
    )}
  >
    <Typography>{label}</Typography>
    <Typography style="h3">{score}</Typography>
  </div>
);

export default Score;
