import ShipengineAPIClient from "./shipengine-api-client";
import { getAPIKey, promptUserForAPIKey, setAPIKey } from './shipengine-core/netrc';

export default class APIClient extends ShipengineAPIClient {
  /**
   * Here we can do things related to networking but that should not be coupled in the actual API client implementation
   * - set the header for which version of the CLI is calling the API
   * - check to see if the user is logged in w/ the API key
   */

  get isLoggedIn(): boolean {
    return this.apiKey !== "";
  }

  async login(): Promise<boolean> {

    const apiKey = getAPIKey();
    
    if (!apiKey) {

      let apiKey = await promptUserForAPIKey();

      try {
        await this.validateAPIKey(apiKey);
        this.apiKey = apiKey;
        setAPIKey(apiKey);
        return true;
      }
      catch (error) {
        const err = error as Error;
        console.error("Error validating your API Key, please try again:", err.message);
        return false;
      }
    }
    else {
      this.apiKey = apiKey;
      return true;
    }
  }

  constructor() {
    super();
  }
}
