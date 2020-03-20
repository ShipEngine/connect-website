import { ipaasLoader } from "./ipaas-loader";

export { Options } from "./settings";
export { ipaasLoader };

// Export `ipaasLoader` as the default export
// tslint:disable: no-default-export
export default ipaasLoader;

// CommonJS default export hack
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Object.assign(module.exports.default, module.exports);  // tslint:disable-line: no-unsafe-any
}
