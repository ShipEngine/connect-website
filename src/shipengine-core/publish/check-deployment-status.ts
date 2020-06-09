import APIClient from '../../api-client';
import { DeploymentStatus } from '../utils/types';
import { promisify } from "util";

const sleep = promisify(setTimeout);

/**
 * Poll for the status of a deployment. It will keep deploying at the desired interval until one of the following status is returned:
 * - terminated
 * - running
 * - error
 */
export async function checkDeploymentStatus(appName: string, deploymentID: string, apiClient: APIClient): Promise<DeploymentStatus> {

  let status = DeploymentStatus.Queued;

  while ((status === DeploymentStatus.Queued) || (status === DeploymentStatus.Building) || (status === DeploymentStatus.Deploying)) {
    const statusObj = await apiClient.getDeploymentStatus(appName, deploymentID);
    status = statusObj.status;
    await sleep(5000);
  }

  return status;
}