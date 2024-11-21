import React from "react";

import { LeftArrow } from "neetoicons";
import { Typography } from "neetoui";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NavBar = ({ title, backButtonVisible = false, children }) => (
  <div className="h-18 flex w-full items-center gap-3 border-b px-12 py-4">
    {backButtonVisible && (
      <Link>
        <LeftArrow />
      </Link>
    )}
    <Typography style="h1">{title}</Typography>
    <div className="flex">{children}</div>
  </div>
);

export default NavBar;
