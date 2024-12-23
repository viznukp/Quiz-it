import React from "react";

import CreateUrl from "./CreateUrl";
import ShowUrl from "./ShowUrl";

const Entry = ({ status, redirectionData }) => (
  <div className="bg-white p-4 shadow-sm">
    <div className="grid w-full grid-cols-2  items-start gap-4 py-2">
      {status === "edit" ? <CreateUrl /> : <ShowUrl {...redirectionData} />}
    </div>
  </div>
);

export default Entry;
