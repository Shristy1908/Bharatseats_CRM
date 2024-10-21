import moment from "moment";

export const dateFormat = (date) => {
  try {
    const d = new Date(date);
    const convertedDate = moment(d).format("MMM, DD YYYY");
    return convertedDate;
  } catch {
    return "";
  }
};

export const dateFormatDefault = (date) => {
  try {
    const d = new Date(date);
    const convertedDate = moment(d).format("MM/DD/YYYY");
    return convertedDate;
  } catch {
    return "";
  }
};
export const dateFormatDDMMYY = (date) => {
  try {
    const d = new Date(date);
    const convertedDate = moment(d).format("DD-MM-YYYY");
    return convertedDate;
  } catch {
    return "";
  }
};

export const daysdifference = (firstDate, secondDate) => {
  const startDay = new Date(firstDate);
  const endDay = new Date(secondDate);

  const millisBetween = startDay.getTime() - endDay.getTime();

  const days = millisBetween / (1000 * 3600 * 24);

  return Math.round(Math.abs(days));
};

export const tConvert = (time) => {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    time = time.slice(1);
    time[5] = +time[0] < 12 ? " AM" : " PM";
    time[0] = +time[0] % 12 || 12;
  }
  return time.join("");
};

export const dateToCompanyFormat = (date) => {
  try {
    const format = "yyyy-MM-dd".toUpperCase();
    const d = new Date(date);
    const convertedDate = moment(d).format(format);
    return convertedDate;
  } catch {
    return "";
  }
};

export const dateToSpecificFormat = (date, format) => {
  try {
    const d = new Date(date);
    const convertedDate = moment(d).format(format);
    return convertedDate;
  } catch {
    return null;
  }
};

export const dateTimeCompanyFormat = (input) => {
  try {
    const res = input.split("T", 1);
    const res2 = input.split("T", 2);
    var datePart = res[0].match(/\d+/g),
      year = datePart[0], // get only two digits
      month = datePart[1],
      day = datePart[2];

    var datePart2 = res2[1].match(/\d+/g),
      hour = datePart2[0],
      min = datePart2[1],
      sec = datePart2[2];

    return day + "-" + month + "-" + year + " " + hour + ":" + min + ":" + sec;
  } catch {
    return "";
  }
};
