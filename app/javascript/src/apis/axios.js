import axios from "axios";
import i18n from "i18next";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocist";
import { Toastr } from "neetoui";
import { evolve } from "ramda";
import routes from "src/routes";

import {
  STORAGE_KEYS,
  getFromLocalStorage,
  setToLocalStorage,
} from "utils/storage";

const HOME_URL = routes.public.home;
const DEFAULT_ERROR_NOTIFICATION = i18n.t("messages.error.default");
const AXIOS_HEADER_AUTH_KEY_EMAIL = "X-Auth-Email";
const AXIOS_HEADER_AUTH_KEY_TOKEN = "X-Auth-Token";
const API_VERSION = "/api/v1";

axios.defaults.baseURL = routes.root;

const transformResponseKeysToCamelCase = response => {
  if (response.data && !(response.data instanceof Blob)) {
    response.data = keysToCamelCase(response.data);
  }
};

const setAuthHeaders = () => {
  axios.defaults.headers.common = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      ?.getAttribute("content"),
  };
  const token = getFromLocalStorage(STORAGE_KEYS.TOKEN);
  const email = getFromLocalStorage(STORAGE_KEYS.EMAIL);
  if (token && email) {
    axios.defaults.headers[AXIOS_HEADER_AUTH_KEY_EMAIL] = email;
    axios.defaults.headers[AXIOS_HEADER_AUTH_KEY_TOKEN] = token;
  }
};

const resetAuthTokens = () => {
  delete axios.defaults.headers[AXIOS_HEADER_AUTH_KEY_EMAIL];
  delete axios.defaults.headers[AXIOS_HEADER_AUTH_KEY_TOKEN];
};

const handleSuccessResponse = response => {
  if (response) {
    response.success = response.status === 200;
    if (response.data.notice) {
      Toastr.success(response.data.notice);
    }
  }

  return response;
};

const handleErrorResponse = axiosErrorObject => {
  if (axiosErrorObject.response?.status === 401) {
    setToLocalStorage({
      authToken: null,
      email: null,
      userId: null,
      userName: null,
    });
    setTimeout(() => (window.location.href = HOME_URL), 2000);
  }

  Toastr.error(
    axiosErrorObject.response?.data?.error || DEFAULT_ERROR_NOTIFICATION
  );

  if (axiosErrorObject.response?.status === 423) {
    window.location.href = HOME_URL;
  }
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      handleSuccessResponse(response);
      transformResponseKeysToCamelCase(response);

      return response.data;
    },
    error => {
      handleErrorResponse(error);

      return Promise.reject(error);
    }
  );
};

const prefixApiVersion = url =>
  !url.startsWith(API_VERSION) ? `${API_VERSION}${url}` : url;

const requestInterceptors = () => {
  axios.interceptors.request.use(
    evolve({
      url: prefixApiVersion,
      data: serializeKeysToSnakeCase,
      params: serializeKeysToSnakeCase,
    })
  );
};

const initializeAxios = () => {
  responseInterceptors();
  requestInterceptors();
};

export { initializeAxios, setAuthHeaders, resetAuthTokens };
