import _ from "lodash";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import Generator = require("yeoman-generator");
import { v4 as uuidv4 } from "uuid";

const fixpack = require("@oclif/fixpack");
const sortPjson = require("sort-pjson");

const isWindows = process.platform === "win32";

let hasYarn = false;

try {
  execSync("yarn -v", { stdio: "ignore" });
  hasYarn = true;
} catch {}

class AppsNew extends Generator {
  args!: { [k: string]: string };

  type: "carrier" | "order source";

  path: string;

  pjson: any;

  githubUser: string | undefined;

  answers!: {
    name: string;
    type: "carrier" | "order source";
    description: string;
    version: string;
    github: { repo: string; user: string };
    author: string;
    license: string;
    pkg: string;
    typescript: boolean;
    definitions: "pojo" | "json" | "yaml";
    eslint: boolean;
  };

  ts!: boolean;

  eslint!: boolean;

  yarn!: boolean;

  definitions!: "pojo" | "json" | "yaml";

  repository?: string;

  constructor(args: any, opts: any) {
    super(args, opts);

    this.path = opts.path;
    this.type = "carrier";
  }

  async prompting() {
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
      ...this.fs.readJSON("package.json", {}),
    };

    let repository = this.destinationRoot().split(path.sep).slice(-2).join("/");

    if (this.githubUser) {
      repository = `${this.githubUser}/${repository.split("/")[1]}`;
    }

    const defaults = {
      name: this.determineAppname().replace(/ /g, "-"),
      type: "carrier",
      version: "0.0.0",
      license: "ISC",
      author: this.githubUser
        ? `${this.user.git.name()} @${this.githubUser}`
        : this.user.git.name(),
      dependencies: {},
      repository,
      ...this.pjson,
      engines: {
        node: ">=8.0.0",
        ...this.pjson.engines,
      },
      pkg: "yarn",
      typescript: true,
      eslint: true,
      definitions: "pojo",
    };

    this.repository = defaults.repository;

    if (this.repository && (this.repository as any).url) {
      this.repository = (this.repository as any).url;
    }

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
        },
        {
          type: "list",
          name: "type",
          message: "what type of app",
          choices: [
            { name: "carrier", value: "carrier" },
            // { name: "order source", value: "order source" },
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
          type: "input",
          name: "license",
          message: "license",
          default: defaults.license,
          when: !this.pjson.license,
        },
        {
          type: "input",
          name: "github.user",
          message:
            "Who is the GitHub owner of repository (https://github.com/OWNER/repo)",
          default: repository.split("/").slice(0, -1).pop(),
          when: !this.pjson.repository,
        },
        {
          type: "input",
          name: "github.repo",
          message:
            "What is the GitHub name of repository (https://github.com/owner/REPO)",
          default: (answers: any) =>
            (this.pjson.repository || answers.name || this.pjson.name)
              .split("/")
              .pop(),
          when: !this.pjson.repository,
        },
        {
          type: "list",
          name: "pkg",
          message: "Select a package manager",
          choices: [
            { name: "npm", value: "npm" },
            { name: "yarn", value: "yarn" },
          ],
          default: () => (this.options.yarn || hasYarn ? 1 : 0),
        },
        {
          type: "confirm",
          name: "typescript",
          message: "TypeScript",
          default: defaults.typescript,
        },
        {
          type: "list",
          name: "definitions",
          message: "App definitions file type",
          choices: [
            {
              name: "pojo (TypeScript or Javascript objects)",
              value: "pojo",
            },
            {
              name: "json",
              value: "json",
            },
            {
              name: "yaml",
              value: "yaml",
            },
          ],
          default: defaults.definitions,
        },
        {
          type: "confirm",
          name: "eslint",
          message: "Use eslint (linter for JavaScript and Typescript)",
          default: defaults.eslint,
        },
      ])) as any;
    }

    this.type = this.answers.type;
    this.ts = this.answers.typescript;
    this.yarn = this.answers.pkg === "yarn";
    this.eslint = this.answers.eslint;
    this.definitions = this.answers.definitions;

    this.pjson.name = this.answers.name || defaults.name;
    this.pjson.description = this.answers.description || defaults.description;
    this.pjson.version = this.answers.version || defaults.version;
    this.pjson.engines.node = defaults.engines.node;
    this.pjson.author = this.answers.author || defaults.author;
    this.pjson.license = this.answers.license || defaults.license;
    this.repository = this.pjson.repository = this.answers.github
      ? `${this.answers.github.user}/${this.answers.github.repo}`
      : defaults.repository;

    this.pjson.keywords = defaults.keywords || [
      "ShipEngine",
      `${this.type} app`,
    ];

    this.pjson.homepage =
      defaults.homepage || `https://github.com/${this.pjson.repository}`;

    this.pjson.bugs =
      defaults.bugs || `https://github.com/${this.pjson.repository}/issues`;

    this.pjson.main = this.pJsonMain();

    if (this.ts) {
      this.pjson.types = defaults.types || "lib/index.d.ts";
    }
  }

  writing() {
    this.sourceRoot(path.join(__dirname, "../../../templates"));

    if (this.ts) {
      this.fs.copyTpl(
        this.templatePath("tsconfig.json"),
        this.destinationPath("tsconfig.json"),
        this,
      );
    }

    if (this.eslint) {
      const eslintignore = this._eslintignore();

      if (eslintignore.trim()) {
        this.fs.write(
          this.destinationPath(".eslintignore"),
          this._eslintignore(),
        );
      }

      if (this.ts) {
        this.fs.copyTpl(
          this.templatePath("eslintrc.typescript"),
          this.destinationPath(".eslintrc"),
          this,
        );
      } else {
        this.fs.copyTpl(
          this.templatePath("eslintrc"),
          this.destinationPath(".eslintrc"),
          this,
        );
      }
    }

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
      this.templatePath("README.md.ejs"),
      this.destinationPath("README.md"),
      this,
    );

    if (this.pjson.license === "ISC") {
      this.fs.copyTpl(
        this.templatePath("LICENSE"),
        this.destinationPath("LICENSE"),
        this,
      );
    }

    this.fs.write(this.destinationPath(".gitignore"), this._gitignore());

    switch (this.type) {
      case "carrier":
        if (!fs.existsSync("src")) {
          this.fs.copyTpl(
            this.templatePath(`carrier/index.${this._definitionExt}`),
            this.destinationPath(`src/index.${this._definitionExt}`),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(`carrier/methods/create-label.${this._codeExt}`),
            this.destinationPath(`src/methods/create-label.${this._codeExt}`),
            this,
          );

          this.fs.copyTpl(
            this.templatePath(`carrier/methods/get-rates.${this._codeExt}`),
            this.destinationPath(`src/methods/get-rates.${this._codeExt}`),
            this,
          );

          this.fs.copyTpl(
            this.templatePath("carrier/logo.svg"),
            this.destinationPath("src/logo.svg"),
            this,
          );
        }
        break;
      case "order source":
        if (!fs.existsSync("src")) {
          this.fs.copyTpl(
            this.templatePath(`order-source/index.${this._definitionExt}`),
            this.destinationPath(`src/index.${this._definitionExt}`),
            this,
          );
        }
        break;
    }
  }

  async install() {
    const dependencies: string[] = [];
    const devDependencies: string[] = [];

    devDependencies.push("@shipengine/integration-platform-sdk@0.0.6");

    if (this.ts) {
      devDependencies.push("@types/node@^13.13.5");
    }

    if (this.eslint) {
      devDependencies.push("eslint@^5.13", "eslint-config-oclif@^3.1");

      if (this.ts) {
        devDependencies.push("eslint-config-oclif-typescript@^0.1");
      }
    }

    if (isWindows) devDependencies.push("rimraf");

    const yarnOpts = {} as any;

    if (process.env.YARN_MUTEX) yarnOpts.mutex = process.env.YARN_MUTEX;
    const install = (deps: string[], opts: object) =>
      this.yarn ? this.yarnInstall(deps, opts) : this.npmInstall(deps, opts);
    const dev = this.yarn ? { dev: true } : { "save-dev": true };
    const save = this.yarn ? {} : { save: true };

    try {
      await install(devDependencies, {
        ...yarnOpts,
        ...dev,
        ignoreScripts: true,
      });
      await install(dependencies, { ...yarnOpts, ...save });
    } catch (error) {
      throw error;
    }
  }

  end() {
    this.log(`\nCreated ${this.pjson.name} in ${this.destinationRoot()}`);
  }

  get _definitionExt() {
    if (this.definitions === "pojo") {
      return this.ts ? "ts" : "js";
    } else {
      return this.definitions;
    }
  }

  get _codeExt() {
    return this.ts ? "ts" : "js";
  }

  get _uuidv4() {
    return uuidv4();
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
        this.yarn ? "/package-lock.json" : "/yarn.lock",
        this.ts && "/lib",
      ])
        .concat(existing)
        .compact()
        .uniq()
        .sort()
        .join("\n") + "\n"
    );
  }

  private _eslintignore(): string {
    const existing = this.fs.exists(this.destinationPath(".eslintignore"))
      ? this.fs.read(this.destinationPath(".eslintignore")).split("\n")
      : [];
    return (
      _([this.ts && "/lib"])
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
    } else {
      return `src/index.${this.definitions}`;
    }
  }
}

export = AppsNew;
