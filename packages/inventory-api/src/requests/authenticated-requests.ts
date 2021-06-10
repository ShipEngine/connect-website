import { RequestAuth } from "../models";

/**
 * All requests from clients to Inventory Apps must include an `Authorization`
 * header, which should deserialize into a blob conforming to the `RequestAuth`
 * definition. This type acts as a mixin for other request definitions, indicating
 * they should include a deserialized `auth` blob after
 */
export type AuthenticatedRequest = {
  auth: RequestAuth;
};
