import React, { useState } from "react";

import classNames from "classnames";
import { LeftArrow } from "neetoicons";
import { Avatar, Typography, Button } from "neetoui";
import { either, isEmpty, isNil } from "ramda";

import authApi from "apis/authentication";
import { resetAuthTokens } from "apis/axios";
import {
  STORAGE_KEYS,
  getFromLocalStorage,
  setToLocalStorage,
} from "utils/storage";

const SidebarUserProfile = ({ isExpanded = false }) => {
  const [isUserProfileVisible, setIsUserProfileVisible] = useState(false);

  const userName = getFromLocalStorage(STORAGE_KEYS.USERNAME);
  const userEmail = getFromLocalStorage(STORAGE_KEYS.EMAIL);
  const authToken = getFromLocalStorage(STORAGE_KEYS.TOKEN);
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  if (!isLoggedIn) return false;

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
      {(isUserProfileVisible || isExpanded) && (
        <div
          className={classNames({
            "absolute bottom-0 left-full z-10 ml-4 rounded-md border bg-white px-6 py-4 shadow-xl ":
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
            onClick={handleLogout}
          />
        </div>
      )}
    </div>
  );
};

export default SidebarUserProfile;
