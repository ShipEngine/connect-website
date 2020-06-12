import { DateTime } from "luxon";
import { TimeStamps } from '../types';

// TODO: ASSUMPTION: currently all the timestamps are based off of the origin addresses' timezone, research whether that is common for most carriers?
export function initializeTimeStamps(timeZone: string): TimeStamps {

  let date = new Date();

  // TODO: Get more business logic and see if these time stamps are accurate
  let yesterday = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).setZone(timeZone).plus({ hours: 12 }).minus({ days: 1 }).toISO();
  let today = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).setZone(timeZone).plus({ hours: 12 }).toISO();
  let tomorrowEarly = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).setZone(timeZone).plus({ days: 1, hours: 9 }).toISO();
  let tomorrowEarlyAM = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).setZone(timeZone).plus({ days: 1, hours: 6 }).toISO();
  let tomorrow = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).setZone(timeZone).plus({ days: 1, hours: 12 }).toISO();
  let twoDays = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).setZone(timeZone).plus({ days: 2, hours: 12 }).toISO();
  let twoDaysEarly = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).setZone(timeZone).plus({ days: 2, hours: 9 }).toISO();
  let threeDays = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).setZone(timeZone).plus({ days: 3 }).toISO();

  const timeStamps: TimeStamps = {
    yesterday,
    today,
    tomorrowEarly,
    tomorrowEarlyAM,
    tomorrow,
    twoDays,
    twoDaysEarly,
    threeDays
  }

  return timeStamps;
}


export function getTimeTitle(date: string, timeStamps: TimeStamps): string {

  if (date === timeStamps.yesterday) {
    return "Yesterday";
  }
  else if (date === timeStamps.today) {
    return "Today";
  }
  else if (date === timeStamps.tomorrowEarly) {
    return "Tomorrow Early";
  }
  else if (date === timeStamps.tomorrowEarlyAM) {
    return "Tomorrow Early";
  }
  else if (date === timeStamps.tomorrow) {
    return "Tomorrow";
  }
  else if (date === timeStamps.twoDays) {
    return "Two Days";
  }
  else if (date === timeStamps.twoDaysEarly) {
    return "Two Days Early";
  }
  else {
    return "Three Days";
  }
}
