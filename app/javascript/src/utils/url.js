import { keysToSnakeCase } from "neetocist";
import { stringify } from "qs";
import { toPairs, pipe, omit, reject, isNil } from "ramda";

const PROTOCOL_REGEXP = /^https?:\/\//i;

export const buildUrl = (route, params) => {
  const paramsExcludingEmpty = reject(
    value => isNil(value) || value === "",
    params
  );
  const placeHolders = [];
  toPairs(paramsExcludingEmpty).forEach(([key, value]) => {
    if (route.includes(`:${key}`)) {
      placeHolders.push(key);
      route = route.replace(`:${key}`, encodeURIComponent(value));
    }
  });

  const queryParams = pipe(
    omit(placeHolders),
    keysToSnakeCase,
    stringify
  )(paramsExcludingEmpty);

  return `${route}?${queryParams}`;
};

export const buildRoute = (route, params) =>
  route.replace(/:(\w+)/g, (match, key) => params[key] || match);

export const prefixUrl = (url, baseUrl, replaceDomain = false) => {
  if (replaceDomain) {
    const urlSegments = url.replace(PROTOCOL_REGEXP, "").split("/");
    const path = urlSegments.slice(1).join("/");

    return `${baseUrl}/${path.replace(/^\/+/, "")}`;
  }

  if (PROTOCOL_REGEXP.test(url)) return url;

  const urlSegments = url.split("/");
  const isSubdomainPresent = urlSegments[0].split(".").length > 1;

  if (isSubdomainPresent) {
    return `http://${url}`;
  }

  return `${baseUrl}/${url.replace(/^\/+/, "")}`;
};
