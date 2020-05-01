import * as fs from "fs";
import * as fsExtra from "fs-extra";
import * as path from "path";
import { cliPrompt } from "./utils/cli-prompt";
import { fileExists } from './utils/files';

/**
 * Create a new shipengine integration template
 */
export async function createTemplate(cwd?: string): Promise<void> {

  const createCwd = cwd ? cwd : process.cwd();

  const answers = await cliPrompt(
    [
      {
        type: "input",
        name: "project-name",
        message: "What would you like to name your project?",
        default: "shipengine-integration",
        validate: (value: string) => {
          const re = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
          const pass = value.match(re);

          if (pass) {
            return true;
          }

          return "Please enter a valid npm package name (ex: shipengine-integration)";
        }
      },
      {
        type: "list",
        name: "project-type",
        message: "What project type would you like to build?",
        choices: ["carrier", "order-source"],
        default: "carrier"
      }
    ]
  );

  const projectName = answers["project-name"] as string;
  const projectType = answers["project-type"] as string;

  const templatePath = path.join(__dirname, "templates", projectType);
  const newProjectPath = path.join(createCwd, projectName);

  const projectExists = await fileExists(newProjectPath);

  if (!projectExists) {
    await fs.promises.mkdir(newProjectPath);
    await fsExtra.copy(templatePath, newProjectPath);

    const data = await fs.promises.readFile(path.join(newProjectPath, "package.json"), "utf-8");
    const replacedData = data.replace(/<PROJECT_NAME>/g, projectName);
    await fs.promises.writeFile(path.join(newProjectPath, "package.json"), replacedData, "utf-8");

    // TODO: uncomment this once the package is publicly available, there's some weird linking issues.
    // execSync("npm install", { cwd: newProjectPath });
  }
  else {
    throw new Error(`A project with the name ${projectName} already exists`);
  }
}
