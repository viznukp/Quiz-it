import React, { useState } from "react";

import { Draggable } from "@hello-pangea/dnd";
import classNames from "classnames";
import { capitalize } from "neetocist";
import { MenuHorizontal, Drag } from "neetoicons";
import { Typography, Dropdown, Button, Tooltip } from "neetoui";
import { useTranslation } from "react-i18next";

const Card = ({ id, name, quizCount, index }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={classNames(
              "flex items-center justify-between gap-2 rounded-lg border  bg-white p-3 transition-all duration-300 ease-in hover:bg-gray-100",
              { "border-blue-300 bg-gray-100 shadow-xl": snapshot.isDragging }
            )}
          >
            <div className="flex items-center gap-2">
              <Tooltip
                content={t("messages.info.rearrangeOrder")}
                position="top"
              >
                <div
                  className={classNames("text-gray-400", {
                    "opacity-0 transition-all ease-in": !(
                      isHovered || snapshot.isDragging
                    ),
                  })}
                >
                  <Drag />
                </div>
              </Tooltip>
              <div className="flex flex-col gap-2">
                <Typography style="h3">{capitalize(name)}</Typography>
                <Typography className="text-gray-400">
                  {t("labels.quiz", { count: quizCount })}
                </Typography>
              </div>
            </div>
            <div>
              <Dropdown buttonProps={{ style: "text" }} icon={MenuHorizontal}>
                <div className="flex flex-col">
                  <Button label={t("labels.edit")} style="text" />
                  <Button label={t("labels.delete")} style="text" />
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
