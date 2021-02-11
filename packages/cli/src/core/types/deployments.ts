export enum DeploymentStatus {
  Queued = "queued",
  Building = "building",
  Deploying = "deploying",
  Running = "running",
  Terminated = "terminated",
  Error = "error",
}

export interface Deployment {
  package: {
    name: string;
    version: string | null;
  };
  deployId: string;
  status: DeploymentStatus;
  createdAt: string;
  updatedAt: string;
  errors: Record<string, unknown>[];
}
