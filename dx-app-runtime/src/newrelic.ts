import logger from "./util/logger";

const newRelicAppName = process.env.NEW_RELIC_APP_NAME;
const enabled = !!process.env.NEW_RELIC_LICENSE_KEY;
logger.info(`NewRelic agent enabled: ${enabled}. AppName: ${newRelicAppName}`);
/**
 * New Relic agent configuration.
 *
 * See lib/config/default.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
const config = {
  app_name: newRelicAppName,
  logging: {
    level: "info",
  },
  agent_enabled: enabled,
  error_collector: {
    ignore_status_codes: [404, 401],
  },
  /**
   * When true, all request headers except for those listed in attributes.exclude
   * will be captured for all traces, unless otherwise specified in a destination's
   * attributes include/exclude lists.
   */
  allow_all_headers: true,
  attributes: {
    /**
     * Prefix of attributes to exclude from all destinations. Allows * as wildcard
     * at end.
     *
     * NOTE: If excluding headers, they must be in camelCase form to be filtered.
     *
     * @env NEW_RELIC_ATTRIBUTES_EXCLUDE
     */
    exclude: [
      "request.headers.cookie",
      "request.headers.authorization",
      "request.headers.proxyAuthorization",
      "request.headers.setCookie*",
      "request.headers.x*",
      "request.headers.apiKey",
      "request.headers.sharedSecret",
      "response.headers.cookie",
      "response.headers.authorization",
      "response.headers.proxyAuthorization",
      "response.headers.setCookie*",
      "response.headers.x*",
    ],
  },
};

exports.config = config;
