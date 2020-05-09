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
  "cc10a05a-78eb-11ea-bc55-0242ac130003": "SIG-A",
  "5c59b2b3-49fb-41c6-9e77-e97a75067f36": "SIG-R",

  "43fc9d24-6a89-428a-ad34-c614c14170b6": "ECO",
  "2c24a88f-a6ab-4082-9761-674e9280d5f8": "STD",
  "8b69c0ff-9017-4e89-82dd-0dbfab691047": "ON",

  "03318192-3e6c-475f-a496-a4f17c1dbcae": "PAK",
  "59ea9801-9377-495d-a71c-71b65ced205f": "PAL",
};
