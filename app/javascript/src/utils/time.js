export const convertMinutesToHoursAndMinutes = totalMinutes => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
};

export const convertHoursAndMinutesToMinutes = (hours, minutes) =>
  hours * 60 + minutes;
