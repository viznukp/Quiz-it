import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const utcToLocalTime = utcTime =>
  dayjs(utcTime).local().format("DD MMMM YYYY, hh:mm A");
