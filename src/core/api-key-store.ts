import netrc from "netrc";

export enum Domain {
  ShipEngine = "shipengine",
  Apps = "apps"
}

export function get(domain: Domain): string | null {
  const myNetrc = netrc();
  let seNetRC = myNetrc[domain] as { apiKey?: string };

  if (!seNetRC || !seNetRC.apiKey) {
    return null;
  }

  return seNetRC.apiKey;
}

export function set(domain: Domain, apiKey: string): string {
  const myNetrc = netrc();

  Object.assign((myNetrc[domain] = {}), { apiKey });

  netrc.save(myNetrc);

  return apiKey;
}

export function clear(domain: Domain): boolean {
  const myNetrc = netrc();

  Object.assign((myNetrc[domain] = {}), {});

  netrc.save(myNetrc);

  return true;
}
