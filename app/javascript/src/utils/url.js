import { keysToSnakeCase } from "neetocist";
import { stringify } from "qs";
import { toPairs, pipe, omit, reject, isNil, either, isEmpty } from "ramda";

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
  if (either(isNil, isEmpty)(url)) return baseUrl;

  const withoutProtocol = url.replace(PROTOCOL_REGEXP, "");
  const urlSegments = withoutProtocol.split("/");
  const isDomainPresent = urlSegments[0].includes(".");

  if (replaceDomain && isDomainPresent) {
    const path = urlSegments.slice(1).join("/");

    return `${baseUrl}/${path.replace(/^\/+/, "")}`;
  }

  if (isDomainPresent) {
    return `http://${withoutProtocol}`;
  }

  return `${baseUrl}/${withoutProtocol.replace(/^\/+/, "")}`;
};

export const stripDomainFromUrl = url =>
  url.replace(PROTOCOL_REGEXP, "").split("/").slice(1).join("/");
