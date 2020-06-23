import { TinyStaticConfig } from './tiny';
import { readFile } from "../../utils/read-file";

export async function loadStaticConfig(): Promise<TinyStaticConfig> {
  let staticConfig: TinyStaticConfig = {};

  try {
    staticConfig = await readFile<TinyStaticConfig>(
      `${process.cwd()}/shipengine.config.js`,
    );

    validateShipengineConfig(staticConfig);

    return staticConfig;
  } catch (error) {
    // Check for sdk error
    if (error.error) {
      throw error.error;
    }
    else {
      throw error;
    }
  }
}

/**
 * Make sure that the shipengine.config.js file contains the expected methods
 */
function validateShipengineConfig(staticConfig: TinyStaticConfig): void {
  const rootLevelProps = ["negateTests", "methods"];
  const methodProps = ["connectionFormDataProps", "getSeller", "getSalesOrder", "getSalesOrdersByDate", "shipmentCreated", "shipmentCancelled"];


  for (let key of Object.keys(staticConfig)) {
    if (!rootLevelProps.includes(key)) {
      throw new Error(`Invalid shipengine.config.js file, unrecognized property: ${key}`);
    }

    if (staticConfig.methods) {
      for (let [key, value ] of Object.entries(staticConfig.methods)) {
        if (!methodProps.includes(key)) {
          throw new Error(`Invalid shipengine.config.js file, unrecognized property: ${key}`);
        }
        if(key !== "connectionFormDataProps" && !Array.isArray(value)) {
          throw new Error(`Invalid shipengine.config.js file, ${key} value should be an array`);
        }
      } 
    }
  }
}