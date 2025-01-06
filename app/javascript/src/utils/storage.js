const STORAGE_KEYS = {
  TOKEN: "authToken",
  EMAIL: "authEmail",
  USERID: "authUserId",
  USERNAME: "authUserName",
};

const setToLocalStorage = ({ authToken, email, userId, userName }) => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, JSON.stringify(authToken));
  localStorage.setItem(STORAGE_KEYS.EMAIL, JSON.stringify(email));
  localStorage.setItem(STORAGE_KEYS.USERID, JSON.stringify(userId));
  localStorage.setItem(STORAGE_KEYS.USERNAME, JSON.stringify(userName));
};

const getFromLocalStorage = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

const setPublicUserToLocalStorage = userId => {
  localStorage.setItem("publicUser", JSON.stringify(userId));
};

const getPublicUserFromLocalStorage = () => getFromLocalStorage("publicUser");

export {
  STORAGE_KEYS,
  setToLocalStorage,
  getFromLocalStorage,
  setPublicUserToLocalStorage,
  getPublicUserFromLocalStorage,
};
