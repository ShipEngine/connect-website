import * as fs from "fs";
import * as path from "path";
import util from "util";
import { exec } from "child_process";
import cli from "cli-ux";
import logSymbols from "log-symbols";
import { PackageJSON } from './types/package-json';

const asyncExec = util.promisify(exec);

const isTypeScriptProject = (manifest: PackageJSON): boolean => {
  const dependencies = Object.keys(manifest.dependencies || {});
  const devDependencies = Object.keys(manifest.devDependencies || {});
  return dependencies.includes('typescript') || devDependencies.includes('typescript');
}

/**
 * This function is used for add all dependencies in the package.json app to the bundled dependencies property
 * and then running npm pack to create a tarball for deploying to the connect platform.
 */
export async function packageApp(cwd?: string): Promise<string> {
  const currentDir = cwd ? cwd : process.cwd();

  const packagePath = path.join(currentDir, "package.json");

  // Make a backup copy of the package.json file since we are going to add the bundledDependencies attribute
  const pJsonBackup = await fs.promises.readFile(packagePath);

  cli.action.start("Packaging app");

  const results = await fs.promises.readFile(packagePath, "utf-8");
  const pjson = JSON.parse(results) as PackageJSON;

  const usesTypeScript = isTypeScriptProject(pjson);

  // take dependencies and move them to bundledDependencies
  pjson.bundledDependencies = [];

  if (pjson.dependencies) {
    for (const dependency of Object.keys(pjson.dependencies)) {
      pjson.bundledDependencies.push(dependency);
    }

    await fs.promises.writeFile(
      packagePath,
      JSON.stringify(pjson, undefined, 2),
    );
  }

  let stdout = "";

  try {
    if (usesTypeScript) {
      console.log('Transpiling TypeScript.');
      const transpilationResults = await asyncExec("npm run-script build", { cwd: currentDir });
      stdout += transpilationResults.stdout;
    }
    const results = await asyncExec("npm pack", { cwd: currentDir });
    stdout += results.stdout;

  } catch (error) {
    const err = error as Error;
    const errorMessage = `Unable to bundle dependencies and package app: ${err.message}`;
    throw new AppFailedToPackageError(errorMessage);
  } finally {
    // Restore the package.json backup
    await fs.promises.writeFile(packagePath,
      pJsonBackup,
    );
  }

  cli.action.stop(`${logSymbols.success}`);

  return stdout.trim();
}


export class AppFailedToPackageError extends Error {
  code: string;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = AppFailedToPackageError.name; // stack traces display correctly now
    this.code = "APP_FAILED_TO_PACKAGE";
  }
}

export function isAppFailedToPackageError(obj: unknown): obj is AppFailedToPackageError {

  if (typeof obj === "object" && obj !== null) {
    const code = Reflect.get(obj, "code") as string | undefined;
    return code === "APP_FAILED_TO_PACKAGE";
  }

  return false;
}
