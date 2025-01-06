import React, { useState } from "react";

import classNames from "classnames";
import { motion } from "framer-motion";
import {
  List,
  Expand,
  Collapse,
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
      <motion.div
        className="flex flex-col items-center justify-between gap-3 border-r bg-white py-4"
        initial={false}
        transition={{ duration: 0.3 }}
        animate={{
          width: isExpanded ? "16rem" : "4rem",
          paddingLeft: isExpanded ? "4px" : "0",
          paddingRight: isExpanded ? "4px" : "0",
        }}
      >
        <div className="flex w-full flex-col items-center ">
          <QuizItLogo isExpanded={isExpanded} />
          <div
            className={classNames("mt-4 flex w-full flex-col items-center", {
              "gap-2": !isExpanded,
            })}
          >
            <SidebarNavItem
              toolTipEnabled
              className={classNames({ "mb-2": isExpanded })}
              style="button"
              toolTipLabel={t("labels.expand")}
              icon={
                isExpanded ? (
                  <Collapse color="#ff0000" />
                ) : (
                  <Expand color="#22C55E" />
                )
              }
              onClickAction={() => setIsExpanded(!isExpanded)}
            />
            <SidebarNavItem
              toolTipEnabled
              icon={<List />}
              label={t("labels.quizzes")}
              onClickRoute={routes.admin.dashboard}
            />
            <QuizFilter
              isVisible={isExpanded && currentRoute === routes.admin.dashboard}
            />
            <SidebarNavItem
              toolTipEnabled
              baseRoute={routes.admin.settings.base}
              icon={<SettingsIcon />}
              label={t("labels.settings")}
              onClickRoute={routes.admin.settings.general}
            />
            <SidebarNavItem
              toolTipEnabled
              icon={<Globe />}
              label={t("labels.publicPage")}
              style="button"
              onClickAction={() => window.open(routes.public.home, "_blank")}
            />
          </div>
        </div>
        <SidebarUserProfile isExpanded={isExpanded} />
      </motion.div>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
