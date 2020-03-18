/**
 * Options that can be provided by callers.  All fields are optional.
 */
export type Options = Partial<Settings>;

/**
 * Options for the IPaaS sub-command
 */
// tslint:disable-next-line: interface-name
export interface IPaaSOptions {
  new?: boolean;
  help?: boolean;
}

/**
 * Normalized, sanitized, and complete settings,
 * with default values for anything that wasn't specified by the caller.
 */
export class Settings {

  public help: boolean;

  public ipaas!: IPaaSOptions;

  /**
   * Normalizes and sanitizes options provided by the caller,
   * and applies default values for any settings that aren't specified.
   */
  public constructor(options: Options = {}) {

    this.help = options.help === true;

    if (options.ipaas) {
      if (options.ipaas.new) {
        this.ipaas = {new: true};
      }
      else if (options.ipaas.help) {
        this.ipaas = {help: true};
      }
    }
  }
}
