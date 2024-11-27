import React from "react";

import { LeftArrow } from "neetoicons";
import { Typography, Button } from "neetoui";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NavBar = ({ title, backButtonVisible = false, children }) => {
  const history = useHistory();

  return (
    <div className="h-18 flex w-full items-center justify-between gap-3 border-b px-12 py-4">
      <div className="flex gap-3">
        {backButtonVisible && (
          <Button style="text" onClick={() => history.goBack()}>
            <LeftArrow />
          </Button>
        )}
        <Typography style="h1">{title}</Typography>
      </div>
      <div className="flex">{children}</div>
    </div>
  );
};

NavBar.propTypes = {
  title: PropTypes.string,
  backButtonVisible: PropTypes.bool,
  children: PropTypes.node,
};

export default NavBar;
