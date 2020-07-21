
/**
 * Deeply merges the configObject into the defaultObject. Whitelist keys specified in the defaultObject.
 * @param {object} defaultObject - The default object.
 * @param {object} configObject - The config object. Key/values in this object receive precedence.
 */
export default function reduceDefaultsWithConfig<T>(
  defaultObject: T,
  configObject: object,
): T {
  const whiteListKeys = Object.keys(defaultObject);

  const filteredConfigObject = Object.keys(configObject)
    .filter((key) => whiteListKeys.includes(key))
    .reduce((obj: any, key: string) => {
      Reflect.set(obj, key, Reflect.get(configObject, key));
      return obj;
    }, defaultObject);

  return filteredConfigObject;
}
