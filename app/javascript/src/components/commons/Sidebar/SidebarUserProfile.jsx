import React, { useState } from "react";

import classNames from "classnames";
import { LeftArrow } from "neetoicons";
import { Avatar, Typography, Button } from "neetoui";

import { STORAGE_KEYS, getFromLocalStorage } from "utils/storage";

const SidebarUserProfile = ({ isExpanded = false }) => {
  const [isUserProfileVisible, setIsUserProfileVisible] = useState(false);

  const userName = getFromLocalStorage(STORAGE_KEYS.USERNAME);
  const userEmail = getFromLocalStorage(STORAGE_KEYS.EMAIL);

  return (
    <div className="relative w-full">
      {!isExpanded && (
        <Avatar
          className="cursor-pointer"
          size="large"
          user={{ name: userName }}
          onClick={() => setIsUserProfileVisible(!isUserProfileVisible)}
        />
      )}
      {isUserProfileVisible ||
        (isExpanded && (
          <div
            className={classNames({
              "absolute bottom-0 left-full ml-4 rounded-md border bg-white px-6 py-4 shadow-xl ":
                !isExpanded,
            })}
          >
            <div className="flex gap-2 border-b">
              <Avatar size="large" user={{ name: userName }} />
              <div>
                <Typography className="">{userName}</Typography>
                <Typography style="body3">{userEmail}</Typography>
              </div>
            </div>
            <Button
              fullWidth
              className="mt-2"
              icon={LeftArrow}
              iconPosition="left"
              label="Logout"
              style="danger-text"
            />
          </div>
        ))}
    </div>
  );
};

export default SidebarUserProfile;
