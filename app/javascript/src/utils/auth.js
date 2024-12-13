import { either, isEmpty, isNil } from "ramda";

import { STORAGE_KEYS, getFromLocalStorage } from "utils/storage";

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(STORAGE_KEYS.TOKEN);

  return !either(isNil, isEmpty)(authToken);
};
