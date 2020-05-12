/**
 * Maps ShipEngine App UUIDs to the corresponding carrier code that's expected
 * by the carrier's API
 */
export function idToCode(uuid: string): string {
  return idCodeMap[uuid];
}


/**
 * Maps the carrier's API code to the corresponding ShipEngine App UUID
 */
export function codeToID(code: string): string {
  for (let [uuid, c] of Object.entries(idCodeMap)) {
    if (c === code) {
      return uuid;
    }
  }
}


const idCodeMap = {
  "2c24a88f-a6ab-4082-9761-674e9280d5f8": "DOMECO",
  "43fc9d24-6a89-428a-ad34-c614c14170b6": "DOMSTD",
  "17669004-c971-4349-a81e-a82d80066f30": "INTECO",
  "f4bf9040-a84c-4761-a2f4-fb1a2b42e905": "INTPRI",
  "8b69c0ff-9017-4e89-82dd-0dbfab691047": "SAMEDY",

  "03318192-3e6c-475f-a496-a4f17c1dbcae": "BOX",
  "59ea9801-9377-495d-a71c-71b65ced205f": "ENV",
  "c8d127db-cc09-4114-90c2-fd76b8d54497": "BAG",
  "c1ae2353-2d82-40e6-bf75-e08b85c869c3": "FXENV",
  "0472ad7d-2dae-4d8c-ad50-616c4fbec3e0": "FXPAK",
  "58ae31a7-b42e-444e-9d41-aae0e3536658": "FXSM",
  "b71ad26d-cdbb-4def-a0ce-9953f1017782": "FXMD",
  "48f9b7e2-d81a-41b8-93b3-bff14568f173": "FXLG",
  "46e4edf0-b97a-47e0-b257-f11fe14c560d": "FXTB",
  "f5d7bfdf-14a1-49b7-9ed2-c531017af7e2": "UPSSM",
  "05a111b4-4ef5-41f3-a2ca-99155884126a": "UPSMD",
  "5b992d91-2ca5-447b-beab-72f67d512101": "UPSLG",
  "91c72ac9-c44a-4fd7-98b8-746a9fc75436": "UPSXL",

  "dbcfb3b5-9457-4d82-b614-123aadc96b1e": "SIG",
  "50d8ae35-96cc-4101-8cfe-cd375e3326db": "ASIG",
  "2d3f09c4-27f9-4260-952a-d290c32f600b": "RSIG",
  "cc10a05a-78eb-11ea-bc55-0242ac130003": "PHOTO",
  "5c59b2b3-49fb-41c6-9e77-e97a75067f36": "RECPT",

  "27483200-72b4-11ea-bc55-0242ac130003": "DROPOFF",
  "1658e89d-ee1c-4963-a3bc-b31810556e5a": "SAMEDAY",
  "0ba63044-91b9-4952-a7f2-e54a60ddde36": "NEXTDAY",
  "a41d8fe5-02dd-4171-8498-6ba91f0c326d": "FLEXPIK",
};
