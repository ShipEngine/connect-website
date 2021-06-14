import nodemon from 'nodemon';
import BaseCommand from "../base-command";
import { loadApp } from "@shipengine/connect-loader";
import open from 'open';
import { execSync } from "child_process";
import { yellow, green } from 'chalk';

export default class Start extends BaseCommand {
  public static description = "Start the app";

  async run(): Promise<void> {
    try {
      const app = await loadApp(process.cwd());
      if(app.manifest.dependencies['@shipengine/connect-runtime']) {
        console.log(yellow('\n\nYou can now run `npm start` instead of using the connect start.'));
        console.log(green('npm start'));
        execSync("npm start", { stdio: 'inherit' });
        return;
      }
      let script;
      if (app.type === 'order') {
        script = require.resolve('@shipengine/connect-order-source-runtime')
      } else {
        script = require.resolve('@shipengine/connect-shipping-runtime')
      }
      nodemon({
        script,
        env: {
          DX_APP_PATH: process.cwd()
        },
        ext: "js,json,ts,yaml,yml",
        watch: [
          'src/'
        ],
      }).on('start', async () => {
        if (app.type === 'order') {
          await open('http://localhost:3006/docs');
        } else {
          await open('http://localhost:3005/docs');
        }
      })
      .on('restart', files => {
        if (files) {
          console.log(`connect: restarting due to ${files.join(', ')}`);
        }
        console.log('connect: restarting');
      });
    } catch (error) {
      switch (error.code) {
        case "ERR_APP_ERROR":
          return this.error("Error loading your app - please make sure you are in an app directory", {
            exit: 1,
          });
        default:
          return this.error(error, {
            exit: 1,
          });
      }
    }
  }
}
