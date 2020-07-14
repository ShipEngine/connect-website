import { Domain } from '../api-key-store';
import BaseCommand from '../../base-command';
import * as ApiKeyStore from "../../core/api-key-store";
import cli from "cli-ux";
import Login from '../../commands/auth/login';

export async function setUser(domain: Domain, apiKey: string, baseCommand: BaseCommand): Promise<void> {
  try {
    await ApiKeyStore.set(domain, apiKey);
  } catch (error) {
    ApiKeyStore.clear(domain);
    baseCommand.error(error, { exit: 1 });
  }
}

export function clearUser(domain: Domain): void {
  if (domain === Domain.ShipEngine) {
    cli.action.start("logging out of shipengine  ⚙ ");
    ApiKeyStore.clear(Domain.ShipEngine);
    cli.action.stop();
  }
  else {
    cli.action.start("logging out of auctane 🏎  🔥 ");
    ApiKeyStore.clear(Domain.Apps);
    cli.action.stop();
  }
}

export async function checkAppLoginStatus(baseCommand: BaseCommand): Promise<void> {
  try {
    await baseCommand.currentAppUser();
  } catch {
    baseCommand.log("you need to login before you can access your apps");
    await Login.run([]);
  }
}

export async function checkShipEngineLoginStatus(baseCommand: BaseCommand): Promise<void> {
  try {
    await baseCommand.currentShipEngineUser();
  } catch {
    baseCommand.log("you need to login before you can access the ShipEngine API");
    await Login.run([]);
  }
}