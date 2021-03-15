import nodemon from 'nodemon';
import BaseCommand from "../base-command";
import { loadApp } from "@shipengine/connect-loader";

export default class Start extends BaseCommand {
  public static description = "Start the app";

  async run(): Promise<void> {
    try {
      const app = await loadApp(process.cwd())
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
      }).on('restart', files => {
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
