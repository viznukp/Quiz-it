import React, { useState } from "react";

import classNames from "classnames";
import {
  List,
  RightArrow,
  LeftArrow,
  Globe,
  Settings as SettingsIcon,
} from "neetoicons";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import routes from "src/routes";

import SidebarContext from "contexts/SidebarContext";

import QuizFilter from "./QuizFilter";
import QuizItLogo from "./QuizItLogo";
import SidebarNavItem from "./SidebarNavItem";
import SidebarUserProfile from "./SidebarUserProfile";

const Sidebar = () => {
  const { t } = useTranslation();
  const { pathname: currentRoute } = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SidebarContext.Provider value={[isExpanded]}>
      <div
        className={classNames(
          "flex flex-col items-center justify-between gap-3 border-r p-3 transition-all duration-300 ease-in",
          {
            "w-64": isExpanded,
            "w-16": !isExpanded,
          }
        )}
      >
        <div className="w-full">
          <QuizItLogo isExpanded={isExpanded} />
          <div className="mt-4 flex w-full flex-col gap-2">
            <SidebarNavItem
              toolTipEnabled
              style="button"
              toolTipLabel={t("labels.expand")}
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
              icon={<List />}
              label={t("labels.quizzes")}
              onClickRoute={routes.root}
            />
            <QuizFilter
              isVisible={isExpanded && currentRoute === routes.root}
            />
            <SidebarNavItem
              toolTipEnabled
              icon={<SettingsIcon />}
              label={t("labels.settings")}
              onClickRoute={routes.settings}
            />
            <SidebarNavItem
              toolTipEnabled
              icon={<Globe />}
              label={t("labels.publicPage")}
              onClickRoute={routes.publicPage}
            />
          </div>
        </div>
        <SidebarUserProfile isExpanded={isExpanded} />
      </div>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
