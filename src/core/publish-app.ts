import ShipengineApiClinet from "./shipengine-api-client";
import cli from "cli-ux";
import fs from "fs";
import logSymbols from "log-symbols";
import path from "path";
import { deployApp } from "./publish-app/deploy-app";
import { packageApp } from "./publish-app/package-app";
import { NewDeployment } from "./types";

class AppFailedToPackageError extends Error {
  code: string;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = AppFailedToPackageError.name; // stack traces display correctly now
    this.code = "APP_FAILED_TO_PACKAGE";
  }
}

class AppFailedToDeployError extends Error {
  code: string;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = AppFailedToPackageError.name; // stack traces display correctly now
    this.code = "APP_FAILED_TO_DEPLOY";
  }
}

export default async function publishApp(
  pathToApp: string,
  client: ShipengineApiClinet,
): Promise<NewDeployment> {
  // Make a backup copy of the package.json file since we are going to add the bundledDependencies attribute
  const pJsonBackup = await fs.promises.readFile(
    path.join(pathToApp, "package.json"),
  );

  cli.action.start("Packaging App");

  let tarballName: string;

  try {
    tarballName = await packageApp();
  } catch (error) {
    const errorMessage = `Unable to bundle dependencies and package app: ${error.message}`;
    throw new AppFailedToPackageError(errorMessage);
  } finally {
    // Restore the package.json backup
    await fs.promises.writeFile(
      path.join(pathToApp, "package.json"),
      pJsonBackup,
    );
  }

  cli.action.stop(`${logSymbols.success}`);
  cli.action.start("Publishing App");

  let newDeployment;

  try {
    newDeployment = await deployApp(tarballName, client);
  } catch (error) {
    const errorMessage = `There was an error deploying your app to the integration platform: ${error}`;
    throw new AppFailedToDeployError(errorMessage);
  } finally {
    // Delete the package tarball
    await fs.promises.unlink(tarballName);
  }

  cli.action.stop(`${logSymbols.success}`);

  return newDeployment;
}
