import APIClient, { ApiClientErrors } from '../api-client';
import { ConnectApp } from '../types';
import logSymbols from 'log-symbols';
import cli from 'cli-ux';

export interface TestAccountInfo {
  email: string;
  country: string;
  password: string;
  testUrl?: string;
}

/**
 * Find or create a test account and return the information.
 */
export async function createOrFindTestAccounts(
  client: APIClient,
  platformApp: ConnectApp,
  supportedCountries: string[],
): Promise<TestAccountInfo[]> {
  const testAccounts: TestAccountInfo[] = [];
  const sellers = await client.sellers.getSellersForAppId(platformApp.id);
  const productInfo = platformApp.productInfos.find(
    (info) => info.product === 'ShipStation',
  );
  const testUrl = productInfo && productInfo.loginUrl;

  // The older sellers didn't have country specific log ins
  const oldEmail = `${platformApp.id}@test.com`;
  const oldSeller = sellers.find((account) => account.email === oldEmail);
  if (oldSeller) {
    testAccounts.push({
      email: oldEmail,
      country: 'N/A',
      password: platformApp.id,
      testUrl,
    });
  }

  for (let idx = 0; idx < supportedCountries.length; idx++) {
    const country = supportedCountries[idx];
    const email = `${platformApp.id}+${country}@test.com`;
    if (!sellers.some((seller) => seller.email === email)) {
      cli.action.start(`Creating ${country} test account`);
      let success = true;
      try {
        await client.sellers.createSeller(
          platformApp.id,
          email,
          platformApp.id,
          country,
        );
      } catch (error) {
        if (error.code !== ApiClientErrors.BadRequest) {
          success = false;
          console.log(error);
        }
      }
      cli.action.stop(`${success ? logSymbols.success : logSymbols.error}`);
    }
    testAccounts.push({
      email,
      country,
      password: platformApp.id,
      testUrl,
    });
  }

  return testAccounts;
}
