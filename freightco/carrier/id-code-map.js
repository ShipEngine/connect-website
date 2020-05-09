"use strict";

module.exports = {
  /**
   * Maps ShipEngine App UUIDs to the corresponding carrier code that's expected
   * by the carrier's API
   */
  idToCode(uuid) {
    return idCodeMap[uuid];
  },

  /**
   * Maps the carrier's API code to the corresponding ShipEngine App UUID
   */
  codeToID(code) {
    for (let [uuid, c] of Object.entries(idCodeMap)) {
      if (c === code) {
        return uuid;
      }
    }
  },
};

const idCodeMap = {
  "dbcfb3b5-9457-4d82-b614-123aadc96b1e": "SIG",
  "cc10a05a-78eb-11ea-bc55-0242ac130003": "PHOTO",
  "5c59b2b3-49fb-41c6-9e77-e97a75067f36": "RECPT",

  "43fc9d24-6a89-428a-ad34-c614c14170b6": "INTL",
  "2c24a88f-a6ab-4082-9761-674e9280d5f8": "STD",

  "03318192-3e6c-475f-a496-a4f17c1dbcae": "BOX",
  "59ea9801-9377-495d-a71c-71b65ced205f": "PAL",
};
