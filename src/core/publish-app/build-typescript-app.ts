import * as fs from "fs";
import * as path from "path";
import cli from "cli-ux";
import util from "util";
import { exec } from "child_process";
import logSymbols from "log-symbols";

const asyncExec = util.promisify(exec);

/**
 * This function is used for add all dependencies in the package.json app to the bundled dependencies property
 * and then running npm pack to create a tarball for deploying to the integration platform.
 */
export async function buildTypescriptApp(cwd?: string): Promise<void> {
  let currentDir = cwd ? cwd : process.cwd();

  const tsConfigPath = path.join(currentDir, "tsconfig.json");

  try{
    await fs.promises.access(tsConfigPath);
    cli.action.start("transpiling typescript");

  } catch {
    return;
  }

  await asyncExec("npm run build", { cwd: currentDir });
  cli.action.stop(`${logSymbols.success}`);
}
