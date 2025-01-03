import React, { useState } from "react";

import { REDIRECTION_FORM_MODES } from "./constants";
import CreateEdit from "./CreateEdit";
import Show from "./Show";

const UrlCard = ({ redirectionData }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white p-4 shadow-sm">
      {isEditing ? (
        <CreateEdit
          id={redirectionData.id}
          mode={REDIRECTION_FORM_MODES.edit}
          initialValues={{
            fromUrl: redirectionData.source,
            toUrl: redirectionData.destination,
          }}
          onClose={() => setIsEditing(false)}
        />
      ) : (
        <Show {...redirectionData} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
};

export default UrlCard;
