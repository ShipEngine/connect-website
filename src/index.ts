import { loadApp } from "./load-app";

// // Export `loadApp` as a named export and the default export
export { loadApp };
// tslint:disable-next-line: no-default-export
export default loadApp;

// CommonJS default export hack
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Object.assign(module.exports.default, module.exports);  // tslint:disable-line: no-unsafe-any
}
