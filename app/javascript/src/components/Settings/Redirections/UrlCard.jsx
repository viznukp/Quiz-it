import React from "react";

import Create from "./Create";
import Show from "./Show";

const UrlCard = ({ status, redirectionData }) => (
  <div className="bg-white p-4 shadow-sm">
    {status === "edit" ? <Create /> : <Show {...redirectionData} />}
  </div>
);

export default UrlCard;
