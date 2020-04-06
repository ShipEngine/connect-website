import * as types from "@shipengine/ipaas-types";
import * as callsites from "callsites";
import * as path from "path";
import { CarrierApp } from "./integrations/carrier-app";

/**
 * Compile an IPaaS Integration into a single exported POJO
 *
 * @returns - Options
 */
export async function ipaasLoader(moduleId: string): Promise<CarrierApp /** | OrderSourceApp  */> {

  const callPath = callsites()[1].getFileName();
  // TODO: Figure out why require.resolve isn't working and remove callsites
  // const pathToModule = require.resolve(moduleId);
  const pathToModule = path.join(callPath as string, "..", moduleId);

  try {
    let module = await import(pathToModule) as types.App;

    switch (module.type) {
      case "shipping_provider":
        return await CarrierApp.import(module, pathToModule);

      // case "order_source":
      //   return OrderSourceApp.import(module);

      default:
        throw new TypeError(`Invalid IPaaS app type: ${module.type}`);
    }
  }
  catch (e) {
    let error = e as Error;
    throw new Error(`Error loading IPaaS app: ${error.message}`);
  }
}
