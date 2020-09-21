import { OAuthConfigDefinition, InlineOrReference, InlineOrReferenceArray } from "@shipengine/connect-sdk";
import { OAuthConfigPOJO } from "@shipengine/connect-sdk/lib/internal";
import { readDefinition, readDefinitionValue } from "../read-definition";
import { readDeliveryConfirmationArrayDefinition } from "./read-delivery-confirmation-definition";
import { readPackingArrayDefinition } from "./read-packaging-definition";

/**
 * Reads a data driven OAuth Config definition
 */
export async function readOAuthConfigDefinition(
  definition: InlineOrReference<OAuthConfigDefinition>, cwd: string, fieldName: string): Promise<OAuthConfigPOJO> {

  [definition, cwd] = await readDefinition(definition, cwd, fieldName);

  return {
    ...definition
  };
}
