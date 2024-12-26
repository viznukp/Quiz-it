import React, { useState } from "react";

import CreateOrEdit from "./CreateOrEdit";
import Show from "./Show";

const UrlCard = ({ redirectionData }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white p-4 shadow-sm">
      {isEditing ? (
        <CreateOrEdit
          id={redirectionData.id}
          mode="update"
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
