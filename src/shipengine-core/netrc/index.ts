import netrc from "netrc";
import cli from "cli-ux";

export function getAPIKey(): string | undefined {
  const myNetrc = netrc();
  let seNetRC = myNetrc["shipengine.com"] as { apiKey?: string };

  if(!seNetRC) {
    return undefined;
  }
  
  return seNetRC.apiKey;
}

export async function promptUserForAPIKey(): Promise<string> {
  const apiKey = await cli.prompt("Please enter your ShipEngine API Key.") as string;

  return apiKey;
}

export function setAPIKey(apiKey: string): void {
  const myNetrc = netrc();

  Object.assign(myNetrc["shipengine.com"] = {}, { apiKey })

  netrc.save(myNetrc);
}