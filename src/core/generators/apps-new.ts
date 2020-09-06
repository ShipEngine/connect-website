import capitalization from "@shipengine/capitalization";
import { AppType } from "@shipengine/connect-sdk";
import * as fs from "fs";
import _ from "lodash";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { SdkAppTypes } from "../types";
import Generator = require("yeoman-generator");

const fixpack = require("@oclif/fixpack");
const sortPjson = require("sort-pjson");

const isWindows = process.platform === "win32";

type DefinitionTypes = "pojo" | "json" | "yaml";

class AppsNew extends Generator {
  args!: { [k: string]: string };

  type: SdkAppTypes;

  path: string;

  pjson: any;

  githubUser: string | undefined;

  answers!: {
    name: string;
    scope: string;
    type: SdkAppTypes;
    description: string;
    version: string;
    github: { repo: string; user: string };
    author: string;
    license: string;
    typescript: boolean;
    definitions: DefinitionTypes;
    vscode: boolean;
  };

  ts!: boolean;

  definitions!: DefinitionTypes;

  constructor(args: any, opts: any) {
    super(args, opts);

    this.path = opts.path;
    this.type = AppType.Carrier;
  }

  async prompting(): Promise<void> {
    if (this.path) {
      this.destinationRoot(path.resolve(this.path));
      process.chdir(this.destinationRoot());
    }

    try {
      this.githubUser = await this.user.github.username();
    } catch {
      this.githubUser = undefined;
    }

    this.pjson = {
      scripts: {},
      engines: {},
      devDependencies: {},
      dependencies: {},
      ...this.fs.readJSON("package.json", {}) as object,
    };

    const scopePresentInName = (name: string): boolean => {
      return !!name.match(/^@[a-z0-9-*~][a-z0-9-*._~]*/);
    };

    const defaults = {
      name: this.determineAppname().replace(/ /g, "-"),
      scope: undefined,
      type: "carrier",
      version: "0.0.0",
      license: "ISC",
      author: this.githubUser
        ? `${this.user.git.name()} @${this.githubUser}`
        : this.user.git.name(),
      dependencies: {},
      ...this.pjson,
      engines: {
        node: ">=12.8.0",
        ...this.pjson.engines,
      },
      typescript: false,
      definitions: "yaml",
      vscode: true,
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
          type: "input",
          name: "scope",
          message: "npm package scope (e.g. @your-company-name)",
          default: defaults.scope,
          when: (answers: any) => {
            return !scopePresentInName(answers.name);
          },
          validate: (value: string) => {
            const re = /^@[a-z0-9-~][a-z0-9-._~]*$/;
            const pass = value.match(re);

            if (pass) {
              return true;
            }

            return "please enter a valid npm scope (ex: @your-company-name)";
          },
        },
        {
          type: "list",
          name: "type",
          message: "what type of app are you building",
          choices: [
            { name: "carrier ", value: "carrier" },
            { name: "order source", value: "order" },
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
              name: "Javascript",
              value: false,
            },
            {
              name: "TypeScript",
              value: true,
            },
          ],
          default: defaults.typescript,
        },
        {
          type: "list",
          name: "definitions",
          message: "app definitions file type",
          choices: [
            {
              name: "yaml",
              value: "yaml",
            },
            {
              name: "json",
              value: "json",
            },
            {
              name: "pojo (TypeScript or Javascript objects)",
              value: "pojo",
            },
          ],

          default: defaults.definitions,
        },
        {
          type: "confirm",
          name: "vscode",
          message: "are you using vscode",
          default: defaults.vscode,
        },
      ]));
    }

    this.type = this.answers.type;
    this.ts = this.answers.typescript;
    this.definitions = this.answers.definitions;

    if (scopePresentInName(this.answers.name)) {
      this.pjson.name = this.answers.name || defaults.name;
    } else {
      this.pjson.name = `${this.answers.scope || defaults.scope}/${
        this.answers.name || defaults.name
        }`;
    }

    this.pjson.description = this.answers.description || defaults.description;
    this.pjson.version = this.answers.version || defaults.version;
    this.pjson.engines.node = defaults.engines.node;
    this.pjson.author = this.answers.author || defaults.author;
    this.pjson.license = defaults.license;

    this.pjson.keywords = defaults.keywords || [
      "ShipEngine",
      `${this.type} app`,
    ];

    this.pjson.main = this.pJsonMain();
    this.pjson.scripts = {
      start: "connect start",
      test: "connect test"
    }

    if (this.ts) {
      this.pjson.scripts.build = "tsc";
      this.pjson.scripts.watch = "tsc --watch";
      this.pjson.scripts.postbuild = "copyfiles -u 1 src/**/!\\(*.ts\\) lib; copyfiles -u 1 src/!\\(*.ts\\) lib";
      this.pjson.main = `lib/index.${this._definitionExt === "ts" ? "js" : this._definitionExt}`;
    }
  }

  writing() {
    this.sourceRoot(path.join(__dirname, "../../../templates"));

    if (this.answers.vscode) {
      this.fs.copyTpl(
        this.templatePath("vscode/launch.json"),
        this.destinationPath(".vscode/launch.json"),
        this,
      );
    }


    this.fs.copyTpl(
      this.templatePath("connect.config.js"),
      this.destinationPath("connect.config.js"),
      this,
    );

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
      this.templatePath("editorconfig"),
      this.destinationPath(".editorconfig"),
      this,
    );

    this.fs.copyTpl(
      this.templatePath("connect.config.js"),
      this.destinationPath("connect.config.js"),
      this,
    );

    this.fs.copyTpl(
      this.templatePath("README.md.ejs"),
      this.destinationPath("README.md"),
      this,
    );

    if(this.ts) {
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

    if (this.pjson.license === "ISC") {
      this.fs.copyTpl(
        this.templatePath("LICENSE"),
        this.destinationPath("LICENSE"),
        this,
      );
    }

    this.fs.write(this.destinationPath(".gitignore"), this._gitignore());

    switch (this.type) {
      case AppType.Carrier:
        if (!fs.existsSync("src")) {
          this.fs.copyTpl(
            this.templatePath(`carrier/index.${this._definitionExt}`),
            this.destinationPath(`src/index.${this._definitionExt}`),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(
              `carrier/definitions/example-delivery-service.${this._definitionExt}`,
            ),
            this.destinationPath(
              `src/definitions/example-delivery-service.${this._definitionExt}`,
            ),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(
              `carrier/definitions/example-delivery-confirmation.${this._definitionExt}`,
            ),
            this.destinationPath(
              `src/definitions/example-delivery-confirmation.${this._definitionExt}`,
            ),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(
              `carrier/definitions/example-packaging.${this._definitionExt}`,
            ),
            this.destinationPath(
              `src/definitions/example-packaging.${this._definitionExt}`,
            ),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(`carrier/forms/connect.${this._definitionExt}`),
            this.destinationPath(`src/forms/connect.${this._definitionExt}`),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(`carrier/forms/settings.${this._definitionExt}`),
            this.destinationPath(`src/forms/settings.${this._definitionExt}`),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(`carrier/methods/connect.${this._codeExt}`),
            this.destinationPath(`src/methods/connect.${this._codeExt}`),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(
              `carrier/methods/cancel-shipments.${this._codeExt}`,
            ),
            this.destinationPath(
              `src/methods/cancel-shipments.${this._codeExt}`,
            ),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(
              `carrier/methods/create-manifest.${this._codeExt}`,
            ),
            this.destinationPath(
              `src/methods/create-manifest.${this._codeExt}`,
            ),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(
              `carrier/methods/track-shipment.${this._codeExt}`,
            ),
            this.destinationPath(`src/methods/track-shipment.${this._codeExt}`),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(
              `carrier/methods/cancel-pickups.${this._codeExt}`,
            ),
            this.destinationPath(`src/methods/cancel-pickups.${this._codeExt}`),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(`carrier/methods/connect.${this._codeExt}`),
            this.destinationPath(`src/methods/connect.${this._codeExt}`),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(
              `carrier/methods/create-shipment.${this._codeExt}`,
            ),
            this.destinationPath(
              `src/methods/create-shipment.${this._codeExt}`,
            ),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(`carrier/methods/rate-shipment.${this._codeExt}`),
            this.destinationPath(`src/methods/rate-shipment.${this._codeExt}`),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(
              `carrier/methods/schedule-pickup.${this._codeExt}`,
            ),
            this.destinationPath(
              `src/methods/schedule-pickup.${this._codeExt}`,
            ),
            this,
          );

          this.fs.copyTpl(
            this.templatePath("logo.svg"),
            this.destinationPath("src/logo.svg"),
            this,
          );

          if (this.ts) {
            this.fs.copyTpl(
              this.templatePath(`carrier/methods/session.ts`),
              this.destinationPath(`src/methods/session.ts`),
              this,
            );

            this.fs.copyTpl(
              this.templatePath(`tsconfig.json`),
              this.destinationPath("tsconfig.json"),
              this,
            );
          }
        }
        break;
      case AppType.Order:
        if (!fs.existsSync("src")) {
          this.fs.copyTpl(
            this.templatePath(`order-source/index.${this._definitionExt}`),
            this.destinationPath(`src/index.${this._definitionExt}`),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(
              `order-source/forms/connect.${this._definitionExt}`,
            ),
            this.destinationPath(`src/forms/connect.${this._definitionExt}`),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(
              `order-source/forms/settings.${this._definitionExt}`,
            ),
            this.destinationPath(`src/forms/settings.${this._definitionExt}`),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(`order-source/methods/connect.${this._codeExt}`),
            this.destinationPath(`src/methods/connect.${this._codeExt}`),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(
              `order-source/methods/get-sales-order-by-date.${this._codeExt}`,
            ),
            this.destinationPath(
              `src/methods/get-sales-order-by-date.${this._codeExt}`,
            ),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(
              `order-source/methods/acknowledge-orders.${this._codeExt}`,
            ),
            this.destinationPath(
              `src/methods/acknowledge-orders.${this._codeExt}`,
            ),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(
              `order-source/methods/shipment-created.${this._codeExt}`,
            ),
            this.destinationPath(
              `src/methods/shipment-created.${this._codeExt}`,
            ),
            this,
          );

          if (this.ts) {
            this.fs.copyTpl(
              this.templatePath(`order-source/methods/session.ts`),
              this.destinationPath(`src/methods/session.ts`),
              this,
            );

            this.fs.copyTpl(
              this.templatePath(`tsconfig.json`),
              this.destinationPath(`tsconfig.json`),
              this,
            );
          }
        }
        break;
    }
  }

  async install() {
    const dependencies: string[] = [];
    const devDependencies: string[] = [];

    devDependencies.push("@shipengine/connect");

    if (this.ts) {
      devDependencies.push("@types/node@^13.13.5");
      devDependencies.push("typescript");
      devDependencies.push("copyfiles");
    }

    if (isWindows) devDependencies.push("rimraf");

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
    if (this.definitions === "pojo") {
      return this.ts ? "ts" : "js";
    }
    return this.definitions;
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
        "/package-lock.json",
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
    if (this.definitions === "pojo") {
      return this.ts ? "src/index.ts" : "src/index.js";
    }
    return `src/index.${this.definitions}`;
  }
}

export = AppsNew;
