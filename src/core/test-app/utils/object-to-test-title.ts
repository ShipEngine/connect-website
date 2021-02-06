function formatTitleParameter(key: string, value: any) {
  switch (key) {
    case "weight":
      return `${value.value}${value.unit}`;
    case "dimensions":
      return `${value.length} x ${value.width} x ${value.height} ${value.unit}`;
    case "label":
      return `${value.size} ${value.format}`;
    case "shipTo":
      return value.country;
    case "shipFrom":
      return value.country;
    case "returnTo":
      return value.country;
    case "packages":
      return `${value.length}`;
    case "contact":
      return `${value.name}`
    case "address":
      return value.country;

    case "deliveryServiceNames":
      if (Array.isArray(value)) {
        return `${value.join(", ")}`;
      }

      return `${value}`;

    case "packageInsuredValue":
      return `${value.value} ${value.currency}`;

    case "timeWindow":
      return `${value.startDateTime} - ${value.endDateTime}`;
    case "shipments":
      return `${value.length}`;

    case "contents":
      if(Array.isArray(value)) {
        return `${value.length}`;
      }

      return value;

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
