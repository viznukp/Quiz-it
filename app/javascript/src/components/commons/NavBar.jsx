import React from "react";

import { LeftArrow } from "neetoicons";
import { Typography, Button, Tab } from "neetoui";
import PropTypes from "prop-types";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { buildRoute } from "utils/url";

const NavBar = ({
  title,
  backButtonVisible = false,
  activeTab,
  isTabsEnabled = false,
  quizSlug = "",
  tabs = [],
  children,
}) => {
  const history = useHistory();

  return (
    <div className="h-18 grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3 border-b px-12 py-4">
      <div className="flex items-center gap-3">
        {backButtonVisible && (
          <Button
            className="rounded-full"
            style="text"
            onClick={() => history.goBack()}
          >
            <LeftArrow />
          </Button>
        )}
        <Typography style="h1">{title}</Typography>
      </div>
      <div className="flex justify-center gap-3">
        {isTabsEnabled && (
          <Tab noUnderline>
            {tabs.map(({ label, path, id }) => (
              <Tab.Item active={id === activeTab} key={id}>
                <Link to={buildRoute(path, { slug: quizSlug })}> {label}</Link>
              </Tab.Item>
            ))}
          </Tab>
        )}
      </div>
      <div className="flex justify-end gap-3">{children}</div>
    </div>
  );
};

NavBar.propTypes = {
  title: PropTypes.string,
  backButtonVisible: PropTypes.bool,
  children: PropTypes.node,
  activeTab: PropTypes.string,
  isTabsEnabled: PropTypes.bool,
  quizSlug: PropTypes.string,
};

export default React.memo(NavBar);
