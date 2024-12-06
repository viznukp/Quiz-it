import React from "react";

import { Check } from "neetoicons";
import { ActionDropdown, Button } from "neetoui";

import { QUIZ_STATUSES } from "components/constants";

const SaveAction = ({ saveAction, saveType, setSaveType }) => {
  const {
    DRAFT: { STATUS: STATUS_DRAFT, BUTTON_LABEL: DRAFT_BUTTON_LABEL },
    PUBLISHED: { STATUS: STATUS_PUBLISHED, BUTTON_LABEL: PUBLISH_BUTTON_LABEL },
  } = QUIZ_STATUSES;

  return (
    <ActionDropdown
      label={
        saveType === STATUS_DRAFT ? DRAFT_BUTTON_LABEL : PUBLISH_BUTTON_LABEL
      }
      onClick={saveAction}
    >
      <div className="flex flex-col">
        <Button
          fullWidth
          className="justify-end"
          icon={saveType === STATUS_PUBLISHED && Check}
          iconPosition="left"
          label={PUBLISH_BUTTON_LABEL}
          style="text"
          onClick={() => setSaveType(STATUS_PUBLISHED)}
        />
        <Button
          fullWidth
          className="justify-end"
          icon={saveType === STATUS_DRAFT && Check}
          iconPosition="left"
          label={DRAFT_BUTTON_LABEL}
          style="text"
          onClick={() => setSaveType(STATUS_DRAFT)}
        />
      </div>
    </ActionDropdown>
  );
};

export default SaveAction;
