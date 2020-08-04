export function deserialize<T>(body = {}): T {
  return body as T;
}

// export function serialize(obj, stack = []) {
//   const pojo = {};
//   const keys = Object.keys(obj).concat(
//     Object.getOwnPropertyNames(Object.getPrototypeOf(obj)),
//   );
//   stack.push(obj);

//   for (const key of keys) {
//     if (!key.startsWith("_")) {
//       pojo[key] = serializeValue(obj[key], stack);
//     }
//   }

//   return pojo;
// }

// function serializeValue(value, stack = []) {
//   if (value === null || value === undefined) {
//     return null;
//   }

//   switch (typeof value) {
//     case "object":
//       if (value instanceof Date) {
//         return value;
//       }
//       if (Buffer.isBuffer(value)) {
//         return value.toString("base64");
//       }
//       if (typeof value[Symbol.iterator] === "function") {
//         stack = [...stack, value];
//         return [...value].map((item) => serializeValue(item, stack));
//       }
//       if (!stack.includes(value)) {
//         stack = [...stack, value];
//         return serialize(value, stack);
//       }
//       return "<< circular reference >>";

//     case "function":
//       return undefined;

//     default:
//       return value;
//   }
// }
