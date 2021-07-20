import { SdkAppTypes } from '../types';
import * as path from 'path';
import Generator = require('yeoman-generator');

class InfraNew extends Generator {
  path: string;

  // Prompted fields used for templating
  appName!: string;

  type!: string;

  beta!: boolean;

  organization!: string;

  image!: string;

  repo!: string;

  hasBuild!: boolean;

  constructor(args: any, opts: any) {
    super(args, opts);

    this.path = opts.path;
  }

  async prompting(): Promise<void> {
    if (this.path) {
      this.destinationRoot(path.resolve(this.path));
      process.chdir(this.destinationRoot());
    }
    const currentDir = path.resolve().split(path.sep).pop();
    const integrationsDir = path
      .resolve()
      .split(path.sep)
      .find((part) => part.includes('integrations-'));
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of this integration?',
        default: currentDir,
      },
      {
        type: 'list',
        name: 'type',
        message: 'What type of integration is this?',
        choices: [
          {
            name: 'Carrier',
            value: 'shipping',
          },
          {
            name: 'Freight',
            value: 'freight',
          },
          {
            name: 'Order',
            value: 'ecommerce',
          },
        ],
      },
      {
        type: 'input',
        name: 'repo',
        message: 'Which GitHub repo is this for?',
        default: integrationsDir,
      },
    ]);

    this.appName = answers.name;
    this.type = answers.type;

    const integrationsRegex = /integrations-(.*)/;
    const matches = answers.repo.match(integrationsRegex);
    if (matches?.length >= 2) {
      switch (matches[1]) {
        case 'ecommerce':
        case 'shipping':
        case 'freight':
        case 'fulfillment':
          // These internal repos use a different prefix
          this.organization = 'ips';
          break;
        default:
          this.organization = matches[1];
          break;
      }
    } else {
      // If we end up here something went wrong, but we can catch it in code review
      this.organization = answers.repo;
    }

    if (this.type === 'shipping') {
      this.image =
        '813448775391.dkr.ecr.us-east-1.amazonaws.com/ipaas-dip-functions:shipping-dx-base-latest';
    } else if (this.type === 'ecommerce') {
      this.image =
        '813448775391.dkr.ecr.us-east-1.amazonaws.com/ipaas-dip-functions:order-source-dx-base-latest';
    }

    if (this.organization === 'ips') {
      this.repo = `integrations-${this.type}`;
    } else {
      this.repo = `integrations-${this.organization}`;
    }

    const pjson: any = this.fs.readJSON('package.json', {});
    this.hasBuild = !!pjson.scripts?.build;
    const dependencies = Object.keys({
      ...pjson.dependencies,
      ...pjson.devDependencies,
    });
    this.beta = dependencies.includes('@shipengine/connect-runtime');
  }

  writing() {
    this.sourceRoot(path.join(__dirname, '../../../templates/infra'));

    const filesToCopy = [
      {
        src: 'helm/templates/_helpers.tpl',
        dest: `../../infra/helm/${this.appName}/templates/_helpers.tpl`,
      },
      {
        src: 'helm/templates/configmap.yaml',
        dest: `../../infra/helm/${this.appName}/templates/configmap.yaml`,
      },
      {
        src: 'helm/templates/deployment.yaml',
        dest: `../../infra/helm/${this.appName}/templates/deployment.yaml`,
      },
      {
        src: 'helm/templates/hpa.yaml',
        dest: `../../infra/helm/${this.appName}/templates/hpa.yaml`,
      },
      {
        src: 'helm/templates/ingress.yaml',
        dest: `../../infra/helm/${this.appName}/templates/ingress.yaml`,
      },
      {
        src: 'helm/templates/secret.yaml',
        dest: `../../infra/helm/${this.appName}/templates/secret.yaml`,
      },
      {
        src: 'helm/templates/service.yaml',
        dest: `../../infra/helm/${this.appName}/templates/service.yaml`,
      },
      {
        src: 'helm/Chart.yaml.ejs',
        dest: `../../infra/helm/${this.appName}/Chart.yaml`,
      },
      {
        src: 'helm/values-dev.yaml.ejs',
        dest: `../../infra/helm/${this.appName}/values-dev.yaml`,
      },
      {
        src: 'helm/values-intg.yaml.ejs',
        dest: `../../infra/helm/${this.appName}/values-intg.yaml`,
      },
      {
        src: 'helm/values-prod.yaml.ejs',
        dest: `../../infra/helm/${this.appName}/values-prod.yaml`,
      },
      {
        src: 'helm/values-stage.yaml.ejs',
        dest: `../../infra/helm/${this.appName}/values-stage.yaml`,
      },
      {
        src: 'helm/values.yaml.ejs',
        dest: `../../infra/helm/${this.appName}/values.yaml`,
      },
      { src: 'Makefile.ejs', dest: 'Makefile' },
      { src: 'dockerignore.ejs', dest: '.dockerignore' },
    ];
    if (this.beta) {
      filesToCopy.push(
        { src: 'Dockerfile.beta.ejs', dest: 'Dockerfile' },
        { src: 'Dockerfile.unittests-beta', dest: 'Dockerfile.unittests' },
      );
    } else {
      filesToCopy.push(
        { src: 'Dockerfile.ejs', dest: 'Dockerfile' },
        { src: 'Dockerfile.unittests', dest: 'Dockerfile.unittests' },
      );
    }

    filesToCopy.forEach((fileToCopy) => {
      this.fs.copyTpl(
        this.templatePath(fileToCopy.src),
        this.destinationPath(fileToCopy.dest),
        this,
      );
    });
  }
}

export = InfraNew;
