import APIClient from '../api-client';
import { ConnectApp } from '../types';
import logSymbols from "log-symbols";
import cli from "cli-ux";

export interface TestAccountInfo {
  email: string;
  password: string;
  testUrl?: string
}
/**
 * Find or create a test account and return the information.
 */
export async function createOrFindTestAccount(client: APIClient, platformApp: ConnectApp): Promise<TestAccountInfo> {
  const sellers = await client.sellers.getSellersForAppId(platformApp.id)
  const email = `${platformApp.id}@test.com`;

  if (!sellers.some((seller) => seller.email === email)) {
    cli.action.start("Creating test account");
    await client.sellers.createSeller(platformApp.id, email, platformApp.id)
    cli.action.stop(`${logSymbols.success}`);
  }

  const productInfo = platformApp.productInfos.find((info) => info.product === "ShipStation")
  const testUrl = productInfo && productInfo.loginUrl;

  return {
    email,
    password: platformApp.id,
    testUrl
  }
}