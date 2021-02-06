import nodemon from "nodemon";
import path from "path";
import chalk from "chalk";
import cliBanner from './utils/cli-banner';
import { spawn } from 'cross-spawn';

const startServerScript = path.join(__dirname, "./start-app/server.js");
const startClientScript = path.join(__dirname, "./start-app/client.js");

export default function startApp({
  cwd,
  port,
}: {
  cwd: string;
  port: number;
}): void {
  process.on("SIGINT", process.exit);
  process.on("SIGTERM", process.exit);

  console.log(cliBanner());

  const serverPort = port;
  const clientPort = port + 1;

  const clientServer = spawn(
    "node",
    [startClientScript, clientPort.toString(), serverPort.toString()],
    { cwd },
  );

  clientServer.stderr.on("data", function (data) {
    console.log(data.toString());
  });


  clientServer.stdout.on("data", function (data) {
    console.log(chalk.green(data.toString()));
  });

  nodemon({
    watch: [cwd],
    ext: "js,ts,json,yaml,yml,png,jpg,jpeg,PNG,JPG,JPEG,svg,SVG",
    script: startServerScript,
    args: [cwd, serverPort.toString()],
  });

  nodemon
    .on("start", function () {
      // console.log("App has started");
    })
    .on("restart", function () {
      console.log(chalk.blueBright("File changes detected! Reloading app..."));
    })
    .on("quit", process.exit);
}
