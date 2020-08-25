import { Domain } from "../api-key-store";
import BaseCommand from "../../base-command";
import * as ApiKeyStore from "../../core/api-key-store";
import cli from "cli-ux";
import Login from "../../commands/login";

/**
 * Set the user in the api key store.
 */
export function setUser(domain: Domain, apiKey: string, baseCommand: BaseCommand): void {
  try {
    ApiKeyStore.set(domain, apiKey);
  } catch (error) {
    ApiKeyStore.clear(domain);
    baseCommand.error(error, { exit: 1 });
  }
}

/**
 * Clear the user from the api key store.
 */
export function clearUser(): void {
  cli.action.start("logging out of connect");
  ApiKeyStore.clear(Domain.Apps);
  cli.action.stop();
}

/**
 * Check the users' login status.
 */
export async function checkAppLoginStatus(baseCommand: BaseCommand): Promise<void> {
  try {
    await baseCommand.currentUser();
  } catch {
    baseCommand.log("you need to login before you can access your apps");
    await Login.run([]);
  }
}
