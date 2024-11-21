import React from "react";

import { List } from "neetoicons";
import { useTranslation } from "react-i18next";
import routes from "src/routes";

import { NeetoQuiz } from "neetoicons/app-icons";

import SidebarNavItem from "./SidebarNavItem";

const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <div className="bordr-r flex w-16 flex-col items-center gap-3 bg-blue-50 py-3">
      <NeetoQuiz size={48} />
      <div className="mt-4">
        <SidebarNavItem
          icon={<List />}
          toolTipLabel={t("labels.quizzes")}
          onClickRoute={routes.root}
        />
      </div>
    </div>
  );
};

export default Sidebar;
