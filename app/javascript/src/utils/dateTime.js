const dateFromTimeStamp = timeStamp => {
  const dateObject = new Date(timeStamp);
  const year = dateObject.getFullYear();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[dateObject.getMonth()];
  const day = dateObject.getDate();

  return `${year} ${month} ${day}`;
};

const timeFromTimeStamp = timeStamp => {
  const dateObject = new Date(timeStamp);
  let hours = dateObject.getHours();
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const amPm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${amPm}`;
};

export { dateFromTimeStamp, timeFromTimeStamp };
