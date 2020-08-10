import nodemon from "nodemon";
import path from "path";
// import { spawn } from "child_process";
import chalk from "chalk";

const startServerScript = path.join(__dirname, "./start-app/server.js");
// const startClientScript = path.join(__dirname, "./start-app/client.js");

function banner() {
  return chalk.blueBright(`
         .;i1:                      .iii,
        1GLtt;                      ,ttfGL.
       :8t             .,..             ;81
       ;8i         ,,  iiii. .,.        ,0t
       ;81       ,i1i;;iiii;;i1i:       ,8t
       :81       .;iii1iiii1iiii.       :8t
      .18i     .::;iii:.  .:iiii,,.     ,GL.
     .L8f      :111iii      ;iii11;      i0G,
      .10;     .,,;iii:.  .:iiii::,     ,GC,
       :81       .;iii1iiii1iii;.       :8f
       ;81       ,i1i;;iiii;;i1i:       :0f
       ;8i         ,.  ;1ii. .,.        ,0f
       :8t             .,,.             ;8f
        tGf11:                      ,t1fGL,
         .;i1:                      .1ii:
`);
}

export default function startApp({
  cwd,
  port,
}: {
  cwd: string;
  port: number;
}): void {
  // TODO - consider if this should set the NODE_ENV
  process.on("SIGINT", process.exit);
  process.on("SIGTERM", process.exit);

  console.log(banner());

  // const clientServer = spawn(
  //   "node",
  //   [startClientScript, clientPort.toString()],
  //   { cwd },
  // );

  // clientServer.stdout.on("data", function (data) {
  //   console.log(chalk.green(data.toString()));
  // });

  nodemon({
    watch: [cwd],
    script: startServerScript,
    args: [cwd, port.toString()],
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
