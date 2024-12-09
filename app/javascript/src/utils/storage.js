const STORAGE_KEYS = {
  TOKEN: "authToken",
  EMAIL: "authEmail",
  USERID: "authUserId",
  USERNAME: "authUserName",
  STANDARD_USER_EMAIL: "standardUserEmail",
};

const setToLocalStorage = ({
  authToken,
  email,
  userId,
  userName,
  standardUserEmail,
}) => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, JSON.stringify(authToken));
  localStorage.setItem(STORAGE_KEYS.EMAIL, JSON.stringify(email));
  localStorage.setItem(STORAGE_KEYS.USERID, JSON.stringify(userId));
  localStorage.setItem(STORAGE_KEYS.USERNAME, JSON.stringify(userName));
  localStorage.setItem(
    STORAGE_KEYS.STANDARD_USER_EMAIL,
    JSON.stringify(standardUserEmail)
  );
};

const getFromLocalStorage = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

export { STORAGE_KEYS, setToLocalStorage, getFromLocalStorage };
