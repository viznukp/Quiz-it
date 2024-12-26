import React from "react";

import CreateUrl from "./CreateUrl";
import ShowUrl from "./ShowUrl";

const UrlCard = ({ status, redirectionData }) => (
  <div className="bg-white p-4 shadow-sm">
    {status === "edit" ? <CreateUrl /> : <ShowUrl {...redirectionData} />}
  </div>
);

export default UrlCard;
