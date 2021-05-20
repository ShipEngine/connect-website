import { AppType, CarrierAppDefinition, ErrorCode, OrderAppDefinition } from "@shipengine/connect-sdk";
import { App, AppManifestPOJO, CarrierApp, DeploymentType, error, OrderApp } from "@shipengine/connect-sdk/lib/internal";
import { readCarrierAppDefinition } from "./definitions/read-carrier-app-definition";
import { readOrderAppDefinition } from "./definitions/read-order-app-definition";
import { fileCache } from "./file-cache";
import { readAppManifest } from "./read-app-manifest";
import { readDefinition } from "./read-definition";

type AppDefinition = CarrierAppDefinition | OrderAppDefinition;

const usesGenericRuntime = (manifest: AppManifestPOJO): boolean => {
  const dependencies = [...Object.keys(manifest.devDependencies || {}), ...Object.keys(manifest.dependencies || {})];
  return dependencies.includes('@shipengine/connect-runtime');
}

const getGenericRuntimeAppType = (manifest: AppManifestPOJO): AppType => {
  const dependencies = [...Object.keys(manifest.devDependencies || {}), ...Object.keys(manifest.dependencies || {})];
  const orderSourceApi = '@shipengine/connect-order-source-api';
  const carrierApi = '@shipengine/connect-carrier-api';
  if(dependencies.includes(orderSourceApi)) {
    return AppType.Order;
  } else if(dependencies.includes(carrierApi)) {
    return AppType.Carrier;
  } else {
    throw new Error('Unknown App Type');
  }
}

const getGenericRuntimeDeploymentType = (type: AppType): DeploymentType => {
  switch(type) {
    case AppType.Carrier:
      return DeploymentType.CarrierAPI;
    case AppType.Freight:
      return DeploymentType.FreightAPI;
    case AppType.Order:
      return DeploymentType.OrderSourceAPI;
  }
}

/**
 * Loads a ShipEngine Connect App
 */
export async function loadApp(appPath = "."): Promise<App> {
  try {
    fileCache.startedLoading();

    // Read the app's manifest (package.json file)
    const manifest = await readAppManifest(appPath);

    // Read the app's exported definition
    const [definition, definitionPath] = await readDefinition<AppDefinition>(appPath, ".", "ShipEngine Connect app");
    if (usesGenericRuntime(manifest)) {
      const type = getGenericRuntimeAppType(manifest);
      const deploymentType = getGenericRuntimeDeploymentType(type);
      const app = definition as any;
      return new App({
        providerId: app.data.Id,
        id: app.data.Id,
        manifest,
        type,
        deploymentType,
      });
    } else if (isCarrierApp(definition)) {
      const pojo = await readCarrierAppDefinition(definition, definitionPath, manifest);
      pojo.deploymentType = DeploymentType.LegacyConnectCarrier;
      return new CarrierApp(pojo);
    }
    else {
      const pojo = await readOrderAppDefinition(definition, definitionPath, manifest);
      pojo.deploymentType = DeploymentType.LegacyConnectOrder;
      return new OrderApp(pojo);
    }
  }
  catch (originalError: unknown) {
    throw error(ErrorCode.AppError, "Error loading the ShipEngine Connect app:", { originalError });
  }
  finally {
    // Let the cache know that we're done loading the app,
    // so the cache can be cleared to free-up memory
    fileCache.finishedLoading();
  }
}

/**
 * Checks to make sure that an app has enough required and distinguishing properties to determine its type.
 */
function isCarrierApp(definition: AppDefinition): definition is CarrierAppDefinition {
  const requiredCarrierProperties = ["deliveryServices"];
  const optionalCarrierProperties = ["manifestLocations", "manifestShipments", "pickupServices", "createShipment", "cancelShipments",
    "rateShipment", "trackShipment", "createManifest", "schedulePickup", "cancelPickups"];

  for (const property of requiredCarrierProperties) {
    if (property in definition) {
      return true;
    }
  }

  for (const property of optionalCarrierProperties) {
    if (property in definition) {
      throw new Error("Carrier app is missing required 'deliveryServices` property");
    }
  }

  const optionalOrderProperties = ["getSalesOrdersByDate", "shipmentCreated"];

  for (const property of optionalOrderProperties) {
    if (property in definition) {
      return false;
    }
  }

  throw new Error("Your app is missing some required fields. Please refer to the documentation.");
}
