import { CarrierAppDefinition, ErrorCode, OrderAppDefinition } from "@shipengine/integration-platform-sdk";
import { readCarrierAppDefinition } from "./definitions/read-carrier-app-definition";
import { readOrderAppDefinition } from "./definitions/read-order-app-definition";
import { fileCache } from "./file-cache";
import { error } from "./internal";
import { loadSDK } from "./load-sdk";
import { readAppManifest } from "./read-app-manifest";
import { readDefinition } from "./read-definition";

type AppDefinition = CarrierAppDefinition | OrderAppDefinition;

/**
 * Loads a ShipEngine Integration Platform App
 */
export async function loadApp(appPath: string = ".") {
  try {
    fileCache.startedLoading();

    // Read the app's manifest (package.json file)
    let manifest = await readAppManifest(appPath);

    // Load the SDK version that's needed for this app
    let sdk = await loadSDK(appPath, manifest);

    // Read the app's exported definition
    let [definition, definitionPath] = await readDefinition<AppDefinition>(appPath, ".", "ShipEngine Integration Platform app");

    if ("deliveryServices" in definition) {
      let pojo = await readCarrierAppDefinition(definition, definitionPath, manifest);
      return new sdk.CarrierApp(pojo);
    }
    else {
      let pojo = await readOrderAppDefinition(definition, definitionPath, manifest);
      return new sdk.OrderApp(pojo);
    }
  }
  catch (originalError) {
    throw error(ErrorCode.AppError, `Error loading the ShipEngine Integration Platform app:`, { originalError });
  }
  finally {
    // Let the cache know that we're done loading the app,
    // so the cache can be cleared to free-up memory
    fileCache.finishedLoading();
  }
}
