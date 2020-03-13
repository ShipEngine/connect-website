import { Options, Settings } from "./settings";

/**
 * CLI for using public ShipEngine services
 *
 * @returns - Options
 */
export function shipengine(options?: Options): string {
  let settings = new Settings(options);

  if (settings.greeting === "Goodbye") {
    // Simulate a runtime error
    throw new Error("Cannot say goodbye");
  }

  return `${settings.greeting}, ${settings.subject}.`;
}
