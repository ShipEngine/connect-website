/**
 * Accessorial services are services offered by a carrier in addition to transportation services, such as hazardous materials handling, residential pickup or delivery, collecting payment at delivery, etc... Each carrier offers a unique set of services, represented primarily by a service code. In some cases additional data will be required such as the emergency contact for hazardous materials handling in which case that can be supplied via the `metadata` object. Please refer to the registry for more information about the metadata supported per accessorial service for a given carrier defined as a JSON schema.
 */
export interface AccessorialService {
  code: string;
  /**
   * Optional attributes as required by the carrier for the accessorial service
   */
  attributes?: any;
}
