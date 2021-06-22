import { BaseRequest } from './base-request';

/**
 * Provision a freight provider account for a tenant. Freight carrier integrations might be direct to the carrier or via a provider such as SMC3. When a freight carrier requires it, a freight provider account must be created for each tenant making requests to the Freight API. The registry will indicate what type of freight provider account is required, so if a tenant does not have an account of the type required then it is the responsibility of the caller to provision one on behalf of the tenant for the correct type and persist the resulting access token. Once the caller has an access token of the correct type it can be reused for any calls for that tenant for all freight carriers that require a freight provider account of that type, sent in the `auth` section of subsequent requests.
 *
 * Freight provider accounts typically identify a tenant within an external system, linking any carrier credentials to that tenant, so the recommendation is that the definition of a tenant in this situation is an individual user vs a service-level identity or similar. In the case of SMC3 only one set of credentials per carrier is active per freight provider account, so attempting to add multiple accounts for a single carrier will result in the requests simply overwriting each other.
 *
 * Note: at this point in time freight provider account access tokens do not expire but that may be a consideration to keep in mind for future freight providers that we integrate with.
 */
export interface ProvisionFreightProviderAccountRequest extends BaseRequest {
  account_type: 'SMC3';
  tenant_id: string;
  tenant_name: string;
}
