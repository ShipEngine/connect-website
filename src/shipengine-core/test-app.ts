import { loadApp } from "@shipengine/integration-platform-loader";

export async function testApp(pathToApp: type) {
  try {
    const app = await loadApp(pathToApp);
    this.log(`Successfully loaded ${app.name} v${app.version}`);
  } catch (error) {
    this.error(error);
  }
}
