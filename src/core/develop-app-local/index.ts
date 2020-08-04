import nodemon from "nodemon";
import path from "path";
import { Worker } from "worker_threads";

const serverWorkerScript = path.join(__dirname, "./server.js");
const clientWorkerScript = path.join(__dirname, "./client.js");

export default async function developAppLocal(
  cwd: string,
  port = 3000,
): Promise<void> {
  // TODO - consider if this should set the NODE_ENV
  process.on("SIGINT", process.exit);
  process.on("SIGTERM", process.exit);

  const clientPort = port;
  const serverPort = port + 1;

  const clientWorker = new Worker(clientWorkerScript, {
    workerData: { port: clientPort },
  });

  clientWorker.on("message", (msg) => {
    console.log(msg);
  });

  nodemon({
    watch: [cwd],
    script: serverWorkerScript,
    args: [cwd, serverPort.toString()],
  });

  nodemon
    .on("start", function () {
      console.log("App has started");
    })
    .on("quit", process.exit)
    .on("restart", function (files: any) {
      console.log("App restarted due to: ", files);
    });
}
