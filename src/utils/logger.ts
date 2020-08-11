import chalk from "chalk";

/**
 * Logger class - exported as a singleton
 * @class
 */
class Logger {
  private _disable: boolean;

  constructor(disable = false) {
    this._disable = disable;
  }

  /**
   * Disable the logger by setting disable to true
   * @param {boolean} val - The value for the disable setting
   */
  public set disable(v: boolean) {
    this._disable = v;
  }

  /**
   * info
   */
  public info(val: string | Record<string, unknown>): void {
    !this._disable && console.log(chalk.cyan(val));
  }

  /**
   * info
   */
  public body(val: string | Record<string, unknown>): void {
    !this._disable && console.dir(val, { depth: Infinity });
  }

  /**
   * success
   */
  public success(val: string | Record<string, unknown>): void {
    !this._disable && console.log(chalk.green(val));
  }

  /**
   * warn
   */
  public warn(val: string | Record<string, unknown>): void {
    !this._disable && console.warn(chalk.yellow(val));
  }

  /**
   * error
   */
  public error(val: string | Record<string, unknown>): void {
    !this._disable && console.error(chalk.red(val));
  }
}
const log = new Logger();

export default log;
