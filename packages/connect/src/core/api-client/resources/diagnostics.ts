import { Pulse } from '../../types';
import AppsAPIClient from '..';

export default class Diagnostics {
  private client: AppsAPIClient;

  constructor(apiClient: AppsAPIClient) {
    this.client = apiClient;
  }

  /**
   * Check the API for a heart beat.
   * @returns {Promise<Pulse>} Promise object that resolves to a Pulse object.
   */
  async heartBeat(): Promise<Pulse> {
    const response = await this.client.call<Pulse>({
      endpoint: 'diagnostics/heartbeat',
      method: 'GET',
    });

    return response;
  }
}
