
declare module "netrc" {
  interface NetRC {
    (): Record<string, object>;
    save: (netRC: object) => void
    parse: (netRC: string) => object;
    format: (netRC: object) => string;
  } 

  const netrc: NetRC;
  export = netrc;
}
