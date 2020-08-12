import "source-map-support/register";
import { loadApp } from "./load-app";

export * from "./load-app";

// The default export is an "Connect Loader" object, which has a `loadApp()` method
export default { loadApp };

// CommonJS default export hack
/* eslint-env commonjs */
if (typeof module === "object" && typeof module.exports === "object") {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  module.exports = Object.assign(module.exports.default, module.exports);
}
