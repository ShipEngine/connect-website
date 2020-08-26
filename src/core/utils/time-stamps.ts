import { DateTime } from "luxon";
import { TimeStamps } from '../types';

// TODO: ASSUMPTION: currently all the timestamps are based off of the origin addresses' timezone, research whether that is common for most carriers?
export function initializeTimeStamps(): TimeStamps {

  const date = new Date();

  // TODO: Get more business logic and see if these time stamps are accurate
  const yesterday = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).plus({ hours: 12 }).minus({ days: 1 }).toISO();
  const today = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).plus({ hours: 12 }).toISO();
  const tomorrowEarly = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).plus({ days: 1, hours: 9 }).toISO();
  const tomorrowEarlyAM = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).plus({ days: 1, hours: 6 }).toISO();
  const tomorrow = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).plus({ days: 1, hours: 12 }).toISO();
  const twoDays = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).plus({ days: 2, hours: 12 }).toISO();
  const twoDaysEarly = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).plus({ days: 2, hours: 9 }).toISO();
  const threeDays = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate()).plus({ days: 3 }).toISO();


  const timeStamps = {
    yesterday,
    today,
    tomorrowEarly,
    tomorrowEarlyAM,
    tomorrow,
    twoDays,
    twoDaysEarly,
    threeDays
  }

  for (const key of Object.keys(timeStamps)) {
    if (Reflect.get(timeStamps, key) === null) {
      throw new Error(`Unable to properly instantiate ${key} time stamp`);
    }
  }

  return timeStamps as TimeStamps;
}


export function getTimeTitle(date: string, timeStamps: TimeStamps): string {

  if (date === timeStamps.yesterday) {
    return "Yesterday";
  }
  if (date === timeStamps.today) {
    return "Today";
  }
  if (date === timeStamps.tomorrowEarly) {
    return "Tomorrow Early";
  }
  if (date === timeStamps.tomorrowEarlyAM) {
    return "Tomorrow Early";
  }
  if (date === timeStamps.tomorrow) {
    return "Tomorrow";
  }
  if (date === timeStamps.twoDays) {
    return "Two Days";
  }
  if (date === timeStamps.twoDaysEarly) {
    return "Two Days Early";
  }
  return "Three Days";
}
