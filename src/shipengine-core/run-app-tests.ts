import { loadApp } from "@shipengine/integration-platform-loader";

export async function runAppTests(pathToApp: string) {
  try {
    const app = await loadApp(pathToApp);
    return app;
  } catch (error) {
    return Promise.reject(error);
  }
}
