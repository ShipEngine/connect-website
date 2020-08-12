import pTimeout from "p-timeout";
import pRetry from "p-retry";

export default async function callWithTimeoutAndRetries(
  fn: any,
  timeout: number,
  retries: number,
) {
  const run = async () => {
    return pTimeout(fn(), timeout, `test timed out after ${timeout}ms`);
  };

  return pRetry(run, { retries: retries });
}
