import capitalization from "@shipengine/capitalization";
import { AppType } from "@shipengine/connect-sdk";
import * as fs from "fs";
const { readdirSync, statSync } = require("fs");
import _ from "lodash";
import { join, resolve } from "path";
import { v4 as uuidv4 } from "uuid";
import { SdkAppTypes } from "../types";
import Generator = require("yeoman-generator");

const fixpack = require("@oclif/fixpack");
const sortPjson = require("sort-pjson");

class BetaNew extends Generator {
  args!: { [k: string]: string };

  type: SdkAppTypes;

  path: string;

  pjson: any;

  githubUser: string | undefined;

  answers!: {
    name: string;
    type: SdkAppTypes;
    description: string;
    version: string;
    github: { repo: string; user: string };
    author: string;
    typescript: boolean;
  };

  ts!: boolean;

  constructor(args: any, opts: any) {
    super(args, opts);
    this.path = opts.path;
    this.type = AppType.Carrier;
  }

  async prompting(): Promise<void> {
    if (this.path) {
      this.destinationRoot(resolve(this.path));
      process.chdir(this.destinationRoot());
    }

    try {
      this.githubUser = await this.user.github.username();
    } catch {
      this.githubUser = undefined;
    }

    this.pjson = {
      private: true,
      scripts: {},
      engines: {},
      devDependencies: {},
      dependencies: {},
      ...this.fs.readJSON("package.json", {}) as object,
    };

    const defaults = {
      name: capitalization.kebabCase(this.determineAppname(), { }),
      type: "carrier",
      version: "1.0.0",
      author: this.githubUser
        ? `${this.user.git.name()} @${this.githubUser}`
        : this.user.git.name(),
      dependencies: {},
      ...this.pjson,
      engines: {
        node: ">=14.16.1",
        ...this.pjson.engines,
      },
      typescript: true,
    };

    if (this.options.skipQuestions) {
      this.answers = defaults;
    } else {
      this.answers = (await this.prompt([
        {
          type: "input",
          name: "name",
          message: "npm package name",
          default: defaults.name,
          when: !this.pjson.name,
          validate: (value: string) => {
            const re = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
            const pass = value.match(re);

            if (pass) {
              return true;
            }

            return "please enter a valid npm package name";
          },
        },
        {
          type: "list",
          name: "type",
          message: "what type of app are you building",
          choices: [
            { name: "Carrier app ", value: "carrier" },
            { name: "Order app", value: "order" },
          ],
          default: defaults.type,
        },
        {
          type: "input",
          name: "description",
          message: "description",
          default: defaults.description,
          when: !this.pjson.description,
        },
        {
          type: "input",
          name: "author",
          message: "author",
          default: defaults.author,
          when: !this.pjson.author,
        },
        {
          type: "input",
          name: "version",
          message: "version",
          default: defaults.version,
          when: !this.pjson.version,
        },
        {
          type: "list",
          name: "typescript",
          message: "which language would you like to use",
          choices: [
            {
              name: "JavaScript",
              value: false,
            },
            {
              name: "TypeScript",
              value: true,
            },
          ],
          default: defaults.typescript,
        },
      ])) as any;
    }

    this.type = this.answers.type;
    this.ts = this.answers.typescript;
    this.pjson.name = this.answers.name;

    this.pjson.description = this.answers.description || defaults.description;
    this.pjson.version = this.answers.version || defaults.version;
    this.pjson.engines.node = defaults.engines.node;
    this.pjson.author = this.answers.author || defaults.author;

    this.pjson.keywords = defaults.keywords || [
      "ShipEngine",
      `${this.type} app`,
    ];

    this.pjson.main = this.pJsonMain();
    this.pjson.scripts = {
    }

    if (this.ts) {
      this.pjson.scripts.build = "tsc";
      this.pjson.scripts.watch = "tsc --watch";
      this.pjson.main = "lib/index.js";
      this.pjson.types = "lib/index.ts";
      this.pjson.scripts.start = "node lib/serve.js"
    } else {
      this.pjson.main = "src/index.js";
      this.pjson.scripts.start = "node src/serve.js"
    }
  }

  writing() {
    const copyAllFilesToSource = (templateName: string, fileExtension: string) => {
      const getAllFiles = (template: string, type: string) => {
        const getAllFiles = (filePath: string, arrayOfFiles: string[]) => {
          const fullPath = this.templatePath(filePath);
          const files = readdirSync(fullPath);
          files.forEach((file: string) => {
            if (statSync(fullPath + "/" + file).isDirectory()) {
              arrayOfFiles = getAllFiles(join(filePath, file), arrayOfFiles)
            } else {
              arrayOfFiles.push(join(fullPath, file))
            }
          })
          return arrayOfFiles;
        };
  
        const files = getAllFiles(template, []);
        return files.filter(f => f.endsWith(type));
      }
      const allFiles = getAllFiles(templateName, fileExtension);
  
      const getPaths = (template: string, files: string[]) => {
        return files.map(file => {
          const pathComponents = file.split('\\');
          const indexOfPath = pathComponents.indexOf(template);
          const newPath = [];
          for (let index = indexOfPath + 1; index < pathComponents.length; index++) {
            newPath.push(pathComponents[index]);
          }
          return newPath.join('\\');
        });
      }
  
      const paths = getPaths(templateName, allFiles);
      paths.forEach(filePath => {
        this.fs.copyTpl(
          this.templatePath(templateName, filePath),
          this.destinationPath(join('src', filePath)),
          this
        )
      });
    };
    this.sourceRoot(join(__dirname, "../../../templates"));

    if (this.fs.exists(this.destinationPath("./package.json"))) {
      fixpack(
        this.destinationPath("./package.json"),
        require("@oclif/fixpack/config.json"),
      );
    }

    this.fs.writeJSON(
      this.destinationPath("./package.json"),
      sortPjson(this.pjson),
    );

    this.fs.copyTpl(
      this.templatePath("README.md.ejs"),
      this.destinationPath("README.md"),
      this,
    );

    if (this.ts) {
      this.fs.copyTpl(
        this.templatePath(".npmignore-ts"),
        this.destinationPath(".npmignore"),
        this,
      );
    }
    else {
      this.fs.copyTpl(
        this.templatePath(".npmignore-js"),
        this.destinationPath(".npmignore"),
        this,
      );
    }

    this.fs.copyTpl(
      this.templatePath("assets/icon.svg"),
      this.destinationPath("assets/icon.svg"),
      this
    )
    this.fs.copyTpl(
      this.templatePath("assets/logo.svg"),
      this.destinationPath("assets/logo.svg"),
      this
    )

    if (this.ts) {
      this.fs.copyTpl(
        this.templatePath(`tsconfig.json`),
        this.destinationPath("tsconfig.json"),
        this,
      );
    }

    this.fs.write(this.destinationPath(".gitignore"), this._gitignore());
    switch (this.type) {
      case AppType.Carrier:
        if (!fs.existsSync("src")) {
          copyAllFilesToSource('carrier-api', this.ts ? 'ts' : 'js');
        }
        break;
      case AppType.Order:
        if (!fs.existsSync("src")) {
          copyAllFilesToSource('order-source-api', this.ts ? 'ts' : 'js');
        }
        break;
    }
  }

  async install() {
    const dependencies: string[] = [];
    const devDependencies: string[] = [];
    dependencies.push("@shipengine/connect-runtime");
    switch (this.type) {
      case AppType.Carrier:
        dependencies.push("@shipengine/connect-carrier-api");
        break;
      case AppType.Order:
        dependencies.push("@shipengine/connect-order-source-api");
        break;
    }
    if (this.answers.typescript) {
      devDependencies.push("@types/node");
      devDependencies.push("typescript");
    }

    await this.npmInstall(devDependencies, {
      "save-dev": true,
      ignoreScripts: true,
    });

    await this.npmInstall(dependencies, { save: true });
  }

  end() {
    this.log(`\nCreated ${this.pjson.name} in ${this.destinationRoot()}`);
  }

  get _definitionExt() {
    return this.ts ? "ts" : "js";
  }

  get _codeExt() {
    return this.ts ? "ts" : "js";
  }

  get _uuidv4() {
    return uuidv4();
  }

  get _appName() {
    const name = this.pjson.name.replace("@", "").replace("/", " ");
    return capitalization.titleCase(name);
  }

  private _gitignore(): string {
    const existing = this.fs.exists(this.destinationPath(".gitignore"))
      ? this.fs.read(this.destinationPath(".gitignore")).split("\n")
      : [];
    return (
      _([
        "*-debug.log",
        "*-error.log",
        "node_modules",
        "/tmp",
        "/dist",
        "/.nyc_output",
        ".env.test",
      ])
        .concat(existing)
        .compact()
        .uniq()
        .sort()
        .join("\n") + "\n"
    );
  }

  private pJsonMain() {
    return this.ts ? "src/index.ts" : "src/index.js";
  }
}

export = BetaNew;
