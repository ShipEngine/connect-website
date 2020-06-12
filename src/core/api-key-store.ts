import netrc from "netrc";

function key(): string {
  // if (process.env.NODE_ENV === "test") {
  //   return "shipenginetest.com";
  // } else {
  //   return "shipengine.com";
  // }
  return "shipengine.com";
}

export function get(): string | null {
  const myNetrc = netrc();
  let seNetRC = myNetrc[key()] as { apiKey?: string };

  if (!seNetRC || !seNetRC.apiKey) {
    return null;
  }

  return seNetRC.apiKey;
}

export function set(apiKey: string): string {
  const myNetrc = netrc();

  Object.assign((myNetrc[key()] = {}), { apiKey });

  netrc.save(myNetrc);

  return apiKey;
}

export function clear(): boolean {
  const myNetrc = netrc();

  Object.assign((myNetrc[key()] = {}), {});

  netrc.save(myNetrc);

  return true;
}
