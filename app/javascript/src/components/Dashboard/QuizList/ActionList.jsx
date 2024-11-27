import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown, Button } from "neetoui";

import quizzesApi from "apis/quizzes";

const ActionList = ({ slug, reloadQuizzes }) => {
  const handleDelete = async () => {
    try {
      await quizzesApi.destroy(slug);
      reloadQuizzes();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Dropdown buttonStyle="text" icon={MenuHorizontal} strategy="fixed">
      <div className="flex flex-col">
        <Button label="Delete" style="danger-text" onClick={handleDelete} />
      </div>
    </Dropdown>
  );
};
export default ActionList;
