function formatTitleParameter(key: string, value: any) {
  switch (key) {
    case "weight":
      return `${value.value}${value.unit}`;
    case "label":
      return `${value.size} ${value.format}`;
    case "shipTo":
      return value.country;
    case "shipFrom":
      return value.country;
    case "packages":
      return `${value.length}`;

    case "deliveryServiceNames":
      if (Array.isArray(value)) {
        return `${value.join(", ")}`;
      }
      
      return `${value}`;

    case "packageInsuredValue":
      return `${value.value} ${value.currency}`;
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
