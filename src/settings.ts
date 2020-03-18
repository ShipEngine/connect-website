/**
 * Options that can be provided by callers.  All fields are optional.
 */
export type Options = Partial<Settings>;

/**Options for the IPaaS sub-command */
// tslint:disable-next-line: interface-name
export interface IPaaSOptions {
  new?: boolean;
}

/**
 * Normalized, sanitized, and complete settings,
 * with default values for anything that wasn't specified by the caller.
 */
export class Settings {

  public ipaas!: IPaaSOptions;

  /**
   * Normalizes and sanitizes options provided by the caller,
   * and applies default values for any settings that aren't specified.
   */
  public constructor(options: Options = {}) {

    if (options.ipaas) {
      if (options.ipaas.new) {
        this.ipaas = { new: true };
      }
    }
  }
}
