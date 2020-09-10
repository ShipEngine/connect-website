import APIClient from "../api-client";
import { Deployment, DeploymentStatus, ConnectApp } from "../types";
import { promisify } from "util";
import * as readline from "readline";
import { green } from "chalk";
import cli from "cli-ux";

const sleep = promisify(setTimeout);

function writeDeploymentInfo(deployment: Deployment, count: number) {
  cli.action.stop();

  if (count > 0) {
    readline.moveCursor(process.stdout, 0, -1);
  }
  readline.clearScreenDown(process.stdout);
  cli.action.start(
    `watching app name: ${green(deployment.package.name)}, status: ${green(
      deployment.status,
    )}`,
  );
}

/**
 * Poll for the status of a deployment. It will keep deploying at the desired interval until one of the following status is returned:
 * - terminated
 * - running
 * - error
 */
export async function watchDeployment(
  deployment: Deployment,
  app: ConnectApp,
  client: APIClient,
): Promise<Deployment> {
  let watchDeployment = deployment;
  let count = 0;

  while (
    watchDeployment.status === DeploymentStatus.Queued ||
    watchDeployment.status === DeploymentStatus.Building ||
    watchDeployment.status === DeploymentStatus.Deploying
  ) {
    const updatedDeployment = await client.deployments.getById({
      deployId: deployment.deployId,
      appId: app.id,
    });
    writeDeploymentInfo(updatedDeployment, count);
    count++;
    watchDeployment = updatedDeployment;
    await sleep(5000);
  }

  return watchDeployment;
}
