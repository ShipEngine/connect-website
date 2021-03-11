export enum EnvironmentType {
  dev = "development",
  stage = "staging",
  prod = "production"
}

export type ConfigurationKey = {
  name: string;
  value: string;
  environmentType: EnvironmentType;
}
