import { loadApp } from "@shipengine/integration-platform-loader";

export async function runAppTests(pathToApp: string) {
  try {
    await loadApp(pathToApp);
  } catch (error) {
    Promise.reject(error);
  }
}
