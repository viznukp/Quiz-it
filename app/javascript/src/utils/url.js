import { keysToSnakeCase } from "neetocist";
import { stringify } from "qs";
import { toPairs, pipe, omit, reject, isNil } from "ramda";

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

export const prefixUrl = (url, baseUrl, prefixStrict) => {
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  try {
    const urlObj = new URL(url);
    if (prefixStrict) {
      const path = urlObj.pathname + urlObj.search + urlObj.hash;

      return `${baseUrl}${path}`;
    }

    return url;
  } catch {
    const path = url.split("/").slice(1).join("/");

    return `${baseUrl}/${path}`;
  }
};
