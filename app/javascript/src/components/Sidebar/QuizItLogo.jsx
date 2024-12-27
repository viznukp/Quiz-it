import React from "react";

import classNames from "classnames";
import { motion } from "framer-motion";
import { Typography } from "neetoui";

import { NeetoQuiz } from "neetoicons/app-icons";

const QuizItLogo = ({ isExpanded = false }) => (
  <motion.div
    initial={false}
    animate={{
      width: isExpanded ? "16rem" : "4rem",
    }}
    className={classNames("flex w-full items-center gap-3", {
      "justify-center": !isExpanded,
    })}
    transition={{
      duration: 0.3,
      ease: "easeInOut",
    }}
  >
    <motion.div transition={{ delay: 0.2, duration: 0.3 }}>
      <NeetoQuiz size={40} />
    </motion.div>
    {isExpanded && (
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <Typography style="h1" weight="bold">
          Quiz<span className="text-green-500">It</span>
        </Typography>
      </motion.div>
    )}
  </motion.div>
);

export default QuizItLogo;
