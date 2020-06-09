import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";
import util from "util";

const asyncExec = util.promisify(exec);


/**
 * This function is used for add all dependencies in the package.json app to the bundled dependencies property 
 * and then running npm pack to create a tarball for deploying to the integration platform.
 */
export async function packageApp(cwd?: string): Promise<string> {

  let currentDir = cwd ? cwd : process.cwd();

  const packagePath = path.join(currentDir, "package.json");

  const results = await fs.promises.readFile(packagePath, "utf-8");
  const pjson = JSON.parse(results);

  // take dependencies and move them to bundledDependencies
  pjson.bundledDependencies = [];

  if(pjson.dependencies) {
    for (let dependency of Object.keys(pjson.dependencies)) {
      pjson.bundledDependencies.push(dependency);
    }
  
    await fs.promises.writeFile(packagePath, JSON.stringify(pjson, undefined, 2));
  }

  const { stdout } = await asyncExec("npm pack", { cwd: currentDir });

  return stdout.trim();
}