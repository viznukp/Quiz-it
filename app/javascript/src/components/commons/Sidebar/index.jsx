import React, { useState } from "react";

import classNames from "classnames";
import { List, RightArrow, LeftArrow } from "neetoicons";
import { useTranslation } from "react-i18next";
import routes from "src/routes";

import QuizItLogo from "./QuizItLogo";
import SidebarNavItem from "./SidebarNavItem";

const Sidebar = () => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={classNames(
        "flex w-16 flex-col items-center gap-3 border-r p-3 transition-all duration-500 ease-in-out",
        { "w-64": isExpanded }
      )}
    >
      <QuizItLogo isExpanded={isExpanded} />
      <div className="mt-4 w-full">
        <SidebarNavItem
          expanded={isExpanded}
          style="button"
          icon={
            isExpanded ? (
              <LeftArrow color="#ff0000" />
            ) : (
              <RightArrow color="#22C55E" />
            )
          }
          onClickAction={() => setIsExpanded(!isExpanded)}
        />
        <SidebarNavItem
          toolTipEnabled
          expanded={isExpanded}
          icon={<List />}
          label={t("labels.quizzes")}
          onClickRoute={routes.dashboard}
        />
      </div>
    </div>
  );
};

export default Sidebar;
