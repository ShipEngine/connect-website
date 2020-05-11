import { loadApp } from "@shipengine/integration-platform-loader";

export async function testApp(pathToApp: string) {
  try {
    const app = await loadApp(pathToApp);
    console.log(`Successfully loaded ${app.name} v${app.version}`);
  } catch (error) {
    console.error(error);
  }
}
