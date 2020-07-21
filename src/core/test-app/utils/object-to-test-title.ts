function formatTitleParameter(key: string, value: any) {
  switch (key) {
    case "weight":
      return `${value.value}${value.unit}`;
    case "shipTo":
      return value.country;
    case "shipFrom":
      return value.country;
    default:
      return value;
  }
}

/**
 * Returns a comma seperated string for a given object
 * @param {object} obj - The object to be formatted.
 */
export default function objectToTestTitle(obj: object): string {
  return Object.keys(obj)
    .map((key: string) => {
      return `${key}: ${formatTitleParameter(key, Reflect.get(obj, key))}`;
    })
    .join(", ");
}
