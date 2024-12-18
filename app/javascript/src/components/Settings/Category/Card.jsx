import React, { useState } from "react";

import { Draggable } from "@hello-pangea/dnd";
import classNames from "classnames";
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
          className={classNames(
            "flex items-center justify-between gap-2 rounded-lg border bg-white p-3 hover:bg-gray-100",
            { "bg-gray-100 shadow-xl": snapshot.isDragging }
          )}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center gap-2">
            {isHovered && (
              <Tooltip
                content={t("messages.info.rearrangeOrder")}
                position="top"
              >
                <div className="text-gray-400">
                  <Drag />
                </div>
              </Tooltip>
            )}
            <div className="flex flex-col gap-2">
              <Typography style="h3">{name}</Typography>
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
      )}
    </Draggable>
  );
};

export default Card;
