import { Deployment } from '../types';

interface ErrorMessage {
  standardized_error_code: string;
  message: string;
}

export default function parseDeploymentErrors(deployment: Deployment): string[] {
  if (!deployment.errors) return [];

  const errorCodeWithMessages = deployment.errors.find((error: Record<string, unknown>) => Reflect.get(error, "code") === "app_definition_upload");

  if (!errorCodeWithMessages) return [];

  const errorWithMessages = Reflect.get(errorCodeWithMessages, "error");

  if (!errorWithMessages) return [];

  const errorMessages = Reflect.get(errorWithMessages, "detailed_errors") as ErrorMessage[];

  if (!errorMessages) return [];

  return errorMessages.map((error: ErrorMessage) => error.message);
}
