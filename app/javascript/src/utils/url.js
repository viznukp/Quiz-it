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
