import { pipe, trim, isEmpty } from "ramda";

export const isEmptyString = pipe(trim, isEmpty);
