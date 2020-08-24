/* eslint-disable camelcase */

"use strict";

const { expect } = require("chai");
const validateConfig = require("../../../../../lib/core/test-app/runner/validate-config")
  .default;

describe("validateConfig", () => {
  it("accepts a valid config", () => {
    const config = {
      connectArgs: { test: "test" },
      debug: true,
      failFast: false,
      retries: 2,
      session: { test: "test" },
      timeout: 2000,
      tests: {
        createShipment_domestic: {},
        createShipment_international: [],
        createShipment_multi_package: [],
        createShipment_with_insurance: [],
        rateShipment: [],
      },
    };

    const result = validateConfig(config);
    expect(result).to.be.eql(config);
  });

  it("runs all validations", () => {
    const config = { timeout: "invalid", debug: "invalid" };

    let result;
    let errorResult;

    try {
      result = validateConfig(config);
    }
    catch (error) {
      errorResult = error;
    }

    expect(result).to.be.undefined;
    expect(errorResult.details.length).to.be.equal(2);
  });

  it("validates that debug is a boolean", () => {
    const config = { debug: "invalid" };

    let result;
    let errorResult;

    try {
      result = validateConfig(config);
    }
    catch (error) {
      errorResult = error;
    }

    expect(result).to.be.undefined;
    expect(errorResult.message).to.be.equal("debug must be a boolean");
  });

  it("validates that failFast is a boolean", () => {
    const config = { failFast: "invalid" };

    let result;
    let errorResult;

    try {
      result = validateConfig(config);
    }
    catch (error) {
      errorResult = error;
    }

    expect(result).to.be.undefined;
    expect(errorResult.message).to.be.equal("failFast must be a boolean");
  });

  it("validates that retries is a number", () => {
    const config = { retries: "invalid" };

    let result;
    let errorResult;

    try {
      result = validateConfig(config);
    }
    catch (error) {
      errorResult = error;
    }

    expect(result).to.be.undefined;
    expect(errorResult.message).to.be.equal("retries must be a number");
  });

  it("validates that timeout is a timeout", () => {
    const config = { timeout: "invalid" };

    let result;
    let errorResult;

    try {
      result = validateConfig(config);
    }
    catch (error) {
      errorResult = error;
    }

    expect(result).to.be.undefined;
    expect(errorResult.message).to.be.equal("timeout must be a number");
  });

  it("validates that session is an object", () => {
    const config = { session: "invalid" };

    let result;
    let errorResult;

    try {
      result = validateConfig(config);
    }
    catch (error) {
      errorResult = error;
    }

    expect(result).to.be.undefined;
    expect(errorResult.message).to.be.equal("session must be of type object");
  });

  it("validates that connectArgs is an object", () => {
    const config = { connectArgs: "invalid" };

    let result;
    let errorResult;

    try {
      result = validateConfig(config);
    }
    catch (error) {
      errorResult = error;
    }

    expect(result).to.be.undefined;
    expect(errorResult.message).to.be.equal(
      "connectArgs must be of type object",
    );
  });

  it("validates that tests keys", () => {
    const config = { tests: { invalid: "invalid" } };

    let result;
    let errorResult;

    try {
      result = validateConfig(config);
    }
    catch (error) {
      errorResult = error;
    }

    expect(result).to.be.undefined;
    expect(errorResult.message).to.be.equal("tests.invalid is not allowed");
  });

  describe("tests.createShipment_domestic when given an object", () => {
    it("validates that retries is a number", () => {
      const config = {
        tests: {
          createShipment_domestic: {
            retries: "invalid"
          },
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic.retries must be a number");
    });

    it("validates that timeout is a number", () => {
      const config = {
        tests: {
          createShipment_domestic: {
            timeout: "invalid"
          },
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic.timeout must be a number");
    });

    it("validates that skip is a boolean", () => {
      const config = {
        tests: {
          createShipment_domestic: {
            skip: "invalid"
          },
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic.skip must be a boolean");
    });

    it("validates that session is an object", () => {
      const config = {
        tests: {
          createShipment_domestic: {
            session: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic.session must be of type object");
    });

    it("validates that connectArgs is an object", () => {
      const config = {
        tests: {
          createShipment_domestic: {
            connectArgs: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic.connectArgs must be of type object");
    });

    it("validates that deliveryServiceName is a string", () => {
      const config = {
        tests: {
          createShipment_domestic: {
            deliveryServiceName: 123
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic.deliveryServiceName must be a string");
    });

    it("validates that deliveryConfirmationName is a string", () => {
      const config = {
        tests: {
          createShipment_domestic: {
            deliveryConfirmationName: 123
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic.deliveryConfirmationName must be a string");
    });

    it("validates that shipFrom is an address object", () => {
      const config = {
        tests: {
          createShipment_domestic: {
            shipFrom: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic.shipFrom must be of type object");
    });

    it("validates that shipTo is an address object", () => {
      const config = {
        tests: {
          createShipment_domestic: {
            shipTo: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic.shipTo must be of type object");
    });

    it("validates that label is a label object", () => {
      const config = {
        tests: {
          createShipment_domestic: {
            label: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic.label must be of type object");
    });

    it("validates that weight is a weight object", () => {
      const config = {
        tests: {
          createShipment_domestic: {
            weight: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic.weight must be of type object");
    });

    it("validates that shipDateTime is a valid date time string", () => {
      const config = {
        tests: {
          createShipment_domestic: {
            shipDateTime: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic.shipDateTime must be a complete ISO 8601 date/time with a time zone, like 2005-09-23T17:30:00+05:30");
    });
  });

  describe("tests.createShipment_domestic when given an array", () => {
    it("validates that retries is a number", () => {
      const config = {
        tests: {
          createShipment_domestic: [{
            retries: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic[0].retries must be a number");
    });

    it("validates that timeout is a number", () => {
      const config = {
        tests: {
          createShipment_domestic: [{
            timeout: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic[0].timeout must be a number");
    });

    it("validates that skip is a boolean", () => {
      const config = {
        tests: {
          createShipment_domestic: [{
            skip: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic[0].skip must be a boolean");
    });

    it("validates that session is an object", () => {
      const config = {
        tests: {
          createShipment_domestic: [{
            session: "invalid"
          }]
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic[0].session must be of type object");
    });

    it("validates that connectArgs is an object", () => {
      const config = {
        tests: {
          createShipment_domestic: [{
            connectArgs: "invalid"
          }]
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic[0].connectArgs must be of type object");
    });

    it("validates that deliveryServiceName is a string", () => {
      const config = {
        tests: {
          createShipment_domestic: [{
            deliveryServiceName: 123
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic[0].deliveryServiceName must be a string");
    });

    it("validates that deliveryConfirmationName is a string", () => {
      const config = {
        tests: {
          createShipment_domestic: [{
            deliveryConfirmationName: 123
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic[0].deliveryConfirmationName must be a string");
    });

    it("validates that shipFrom is an address object", () => {
      const config = {
        tests: {
          createShipment_domestic: [{
            shipFrom: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic[0].shipFrom must be of type object");
    });

    it("validates that shipTo is an address object", () => {
      const config = {
        tests: {
          createShipment_domestic: [{
            shipTo: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic[0].shipTo must be of type object");
    });

    it("validates that label is a label object", () => {
      const config = {
        tests: {
          createShipment_domestic: [{
            label: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic[0].label must be of type object");
    });

    it("validates that weight is a weight object", () => {
      const config = {
        tests: {
          createShipment_domestic: [{
            weight: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic[0].weight must be of type object");
    });

    it("validates that shipDateTime is a valid date time string", () => {
      const config = {
        tests: {
          createShipment_domestic: [{
            shipDateTime: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_domestic[0].shipDateTime must be a complete ISO 8601 date/time with a time zone, like 2005-09-23T17:30:00+05:30");
    });
  });

  describe("tests.createShipment_international when given an object", () => {
    it("validates that retries is a number", () => {
      const config = {
        tests: {
          createShipment_international: {
            retries: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international.retries must be a number");
    });

    it("validates that timeout is a number", () => {
      const config = {
        tests: {
          createShipment_international: {
            timeout: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international.timeout must be a number");
    });

    it("validates that skip is a boolean", () => {
      const config = {
        tests: {
          createShipment_international: {
            skip: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international.skip must be a boolean");
    });

    it("validates that session is an object", () => {
      const config = {
        tests: {
          createShipment_international: {
            session: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international.session must be of type object");
    });

    it("validates that connectArgs is an object", () => {
      const config = {
        tests: {
          createShipment_international: {
            connectArgs: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international.connectArgs must be of type object");
    });

    it("validates that deliveryServiceName is a string", () => {
      const config = {
        tests: {
          createShipment_international: {
            deliveryServiceName: 123
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international.deliveryServiceName must be a string");
    });

    it("validates that deliveryConfirmationName is a string", () => {
      const config = {
        tests: {
          createShipment_international: {
            deliveryConfirmationName: 123
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international.deliveryConfirmationName must be a string");
    });

    it("validates that shipFrom is an address object", () => {
      const config = {
        tests: {
          createShipment_international: {
            shipFrom: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international.shipFrom must be of type object");
    });

    it("validates that shipTo is an address object", () => {
      const config = {
        tests: {
          createShipment_international: {
            shipTo: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international.shipTo must be of type object");
    });

    it("validates that label is a label object", () => {
      const config = {
        tests: {
          createShipment_international: {
            label: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international.label must be of type object");
    });

    it("validates that weight is a weight object", () => {
      const config = {
        tests: {
          createShipment_international: {
            weight: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international.weight must be of type object");
    });

    it("validates that shipDateTime is a valid date time string", () => {
      const config = {
        tests: {
          createShipment_international: {
            shipDateTime: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international.shipDateTime must be a complete ISO 8601 date/time with a time zone, like 2005-09-23T17:30:00+05:30");
    });
  });

  describe("tests.createShipment_international when given an array", () => {
    it("validates that retries is a number", () => {
      const config = {
        tests: {
          createShipment_international: [{
            retries: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international[0].retries must be a number");
    });

    it("validates that timeout is a number", () => {
      const config = {
        tests: {
          createShipment_international: [{
            timeout: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international[0].timeout must be a number");
    });

    it("validates that skip is a boolean", () => {
      const config = {
        tests: {
          createShipment_international: [{
            skip: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international[0].skip must be a boolean");
    });

    it("validates that session is an object", () => {
      const config = {
        tests: {
          createShipment_international: [{
            session: "invalid"
          }]
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international[0].session must be of type object");
    });

    it("validates that connectArgs is an object", () => {
      const config = {
        tests: {
          createShipment_international: [{
            connectArgs: "invalid"
          }]
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international[0].connectArgs must be of type object");
    });

    it("validates that deliveryServiceName is a string", () => {
      const config = {
        tests: {
          createShipment_international: [{
            deliveryServiceName: 123
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international[0].deliveryServiceName must be a string");
    });

    it("validates that deliveryConfirmationName is a string", () => {
      const config = {
        tests: {
          createShipment_international: [{
            deliveryConfirmationName: 123
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international[0].deliveryConfirmationName must be a string");
    });

    it("validates that shipFrom is an address object", () => {
      const config = {
        tests: {
          createShipment_international: [{
            shipFrom: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international[0].shipFrom must be of type object");
    });

    it("validates that shipTo is an address object", () => {
      const config = {
        tests: {
          createShipment_international: [{
            shipTo: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international[0].shipTo must be of type object");
    });

    it("validates that label is a label object", () => {
      const config = {
        tests: {
          createShipment_international: [{
            label: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international[0].label must be of type object");
    });

    it("validates that weight is a weight object", () => {
      const config = {
        tests: {
          createShipment_international: [{
            weight: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international[0].weight must be of type object");
    });

    it("validates that shipDateTime is a valid date time string", () => {
      const config = {
        tests: {
          createShipment_international: [{
            shipDateTime: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_international[0].shipDateTime must be a complete ISO 8601 date/time with a time zone, like 2005-09-23T17:30:00+05:30");
    });
  });

  describe("tests.createShipment_multi_package when given an object", () => {
    it("validates that retries is a number", () => {
      const config = {
        tests: {
          createShipment_multi_package: {
            retries: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package.retries must be a number");
    });

    it("validates that timeout is a number", () => {
      const config = {
        tests: {
          createShipment_multi_package: {
            timeout: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package.timeout must be a number");
    });

    it("validates that skip is a boolean", () => {
      const config = {
        tests: {
          createShipment_multi_package: {
            skip: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package.skip must be a boolean");
    });

    it("validates that session is an object", () => {
      const config = {
        tests: {
          createShipment_multi_package: {
            session: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package.session must be of type object");
    });

    it("validates that connectArgs is an object", () => {
      const config = {
        tests: {
          createShipment_multi_package: {
            connectArgs: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package.connectArgs must be of type object");
    });

    it("validates that deliveryServiceName is a string", () => {
      const config = {
        tests: {
          createShipment_multi_package: {
            deliveryServiceName: 123
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package.deliveryServiceName must be a string");
    });

    it("validates that deliveryConfirmationName is a string", () => {
      const config = {
        tests: {
          createShipment_multi_package: {
            deliveryConfirmationName: 123
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package.deliveryConfirmationName must be a string");
    });

    it("validates that shipFrom is an address object", () => {
      const config = {
        tests: {
          createShipment_multi_package: {
            shipFrom: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package.shipFrom must be of type object");
    });

    it("validates that shipTo is an address object", () => {
      const config = {
        tests: {
          createShipment_multi_package: {
            shipTo: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package.shipTo must be of type object");
    });

    it("validates that shipDateTime is a valid date time string", () => {
      const config = {
        tests: {
          createShipment_multi_package: {
            shipDateTime: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package.shipDateTime must be a complete ISO 8601 date/time with a time zone, like 2005-09-23T17:30:00+05:30");
    });

    it("validates that packages is an array of valid packages", () => {
      const config = {
        tests: {
          createShipment_multi_package: {
            packages: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package.packages must be an array");
    });
  });

  describe("tests.createShipment_multi_package when given an array", () => {
    it("validates that retries is a number", () => {
      const config = {
        tests: {
          createShipment_multi_package: [{
            retries: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package[0].retries must be a number");
    });

    it("validates that timeout is a number", () => {
      const config = {
        tests: {
          createShipment_multi_package: [{
            timeout: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package[0].timeout must be a number");
    });

    it("validates that skip is a boolean", () => {
      const config = {
        tests: {
          createShipment_multi_package: [{
            skip: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package[0].skip must be a boolean");
    });

    it("validates that session is an object", () => {
      const config = {
        tests: {
          createShipment_multi_package: [{
            session: "invalid"
          }]
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package[0].session must be of type object");
    });

    it("validates that connectArgs is an object", () => {
      const config = {
        tests: {
          createShipment_multi_package: [{
            connectArgs: "invalid"
          }]
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package[0].connectArgs must be of type object");
    });

    it("validates that deliveryServiceName is a string", () => {
      const config = {
        tests: {
          createShipment_multi_package: [{
            deliveryServiceName: 123
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package[0].deliveryServiceName must be a string");
    });

    it("validates that deliveryConfirmationName is a string", () => {
      const config = {
        tests: {
          createShipment_multi_package: [{
            deliveryConfirmationName: 123
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package[0].deliveryConfirmationName must be a string");
    });

    it("validates that shipFrom is an address object", () => {
      const config = {
        tests: {
          createShipment_multi_package: [{
            shipFrom: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package[0].shipFrom must be of type object");
    });

    it("validates that shipTo is an address object", () => {
      const config = {
        tests: {
          createShipment_multi_package: [{
            shipTo: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package[0].shipTo must be of type object");
    });

    it("validates that shipDateTime is a valid date time string", () => {
      const config = {
        tests: {
          createShipment_multi_package: [{
            shipDateTime: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package[0].shipDateTime must be a complete ISO 8601 date/time with a time zone, like 2005-09-23T17:30:00+05:30");
    });

    it("validates that packages is an array of valid packages", () => {
      const config = {
        tests: {
          createShipment_multi_package: [{
            packages: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_multi_package[0].packages must be an array");
    });
  });

  describe("tests.createShipment_with_insurance when given an object", () => {
    it("validates that retries is a number", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            retries: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.retries must be a number");
    });

    it("validates that timeout is a number", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            timeout: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.timeout must be a number");
    });

    it("validates that skip is a boolean", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            skip: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.skip must be a boolean");
    });

    it("validates that session is an object", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            session: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.session must be of type object");
    });

    it("validates that connectArgs is an object", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            connectArgs: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.connectArgs must be of type object");
    });

    it("validates that retries is a number", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            retries: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.retries must be a number");
    });

    it("validates that timeout is a number", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            timeout: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.timeout must be a number");
    });

    it("validates that skip is a boolean", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            skip: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.skip must be a boolean");
    });

    it("validates that session is an object", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            session: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.session must be of type object");
    });

    it("validates that connectArgs is an object", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            connectArgs: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.connectArgs must be of type object");
    });

    it("validates that deliveryServiceName is a string", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            deliveryServiceName: 123
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.deliveryServiceName must be a string");
    });

    it("validates that deliveryConfirmationName is a string", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            deliveryConfirmationName: 123
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.deliveryConfirmationName must be a string");
    });

    it("validates that packagingName is a string", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            packagingName: 123
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.packagingName must be a string");
    });

    it("validates that packageInsuredValue is a string", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            packageInsuredValue: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.packageInsuredValue must be of type object");
    });

    it("validates that shipFrom is an address object", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            shipFrom: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.shipFrom must be of type object");
    });

    it("validates that shipTo is an address object", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            shipTo: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.shipTo must be of type object");
    });

    it("validates that label is a label object", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            label: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.label must be of type object");
    });

    it("validates that weight is a weight object", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            weight: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.weight must be of type object");
    });

    it("validates that shipDateTime is a valid date time string", () => {
      const config = {
        tests: {
          createShipment_with_insurance: {
            shipDateTime: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance.shipDateTime must be a complete ISO 8601 date/time with a time zone, like 2005-09-23T17:30:00+05:30");
    });
  });

  describe("tests.createShipment_with_insurance when given an array", () => {
    it("validates that retries is a number", () => {
      const config = {
        tests: {
          createShipment_with_insurance: [{
            retries: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance[0].retries must be a number");
    });

    it("validates that timeout is a number", () => {
      const config = {
        tests: {
          createShipment_with_insurance: [{
            timeout: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance[0].timeout must be a number");
    });

    it("validates that skip is a boolean", () => {
      const config = {
        tests: {
          createShipment_with_insurance: [{
            skip: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance[0].skip must be a boolean");
    });

    it("validates that session is an object", () => {
      const config = {
        tests: {
          createShipment_with_insurance: [{
            session: "invalid"
          }]
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance[0].session must be of type object");
    });

    it("validates that connectArgs is an object", () => {
      const config = {
        tests: {
          createShipment_with_insurance: [{
            connectArgs: "invalid"
          }]
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance[0].connectArgs must be of type object");
    });

    it("validates that deliveryServiceName is a string", () => {
      const config = {
        tests: {
          createShipment_with_insurance: [{
            deliveryServiceName: 123
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance[0].deliveryServiceName must be a string");
    });

    it("validates that deliveryConfirmationName is a string", () => {
      const config = {
        tests: {
          createShipment_with_insurance: [{
            deliveryConfirmationName: 123
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance[0].deliveryConfirmationName must be a string");
    });

    it("validates that packagingName is a string", () => {
      const config = {
        tests: {
          createShipment_with_insurance: [{
            packagingName: 123
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance[0].packagingName must be a string");
    });

    it("validates that packageInsuredValue is a string", () => {
      const config = {
        tests: {
          createShipment_with_insurance: [{
            packageInsuredValue: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance[0].packageInsuredValue must be of type object");
    });

    it("validates that shipFrom is an address object", () => {
      const config = {
        tests: {
          createShipment_with_insurance: [{
            shipFrom: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance[0].shipFrom must be of type object");
    });

    it("validates that shipTo is an address object", () => {
      const config = {
        tests: {
          createShipment_with_insurance: [{
            shipTo: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance[0].shipTo must be of type object");
    });

    it("validates that label is a label object", () => {
      const config = {
        tests: {
          createShipment_with_insurance: [{
            label: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance[0].label must be of type object");
    });

    it("validates that weight is a weight object", () => {
      const config = {
        tests: {
          createShipment_with_insurance: [{
            weight: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance[0].weight must be of type object");
    });

    it("validates that shipDateTime is a valid date time string", () => {
      const config = {
        tests: {
          createShipment_with_insurance: [{
            shipDateTime: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_with_insurance[0].shipDateTime must be a complete ISO 8601 date/time with a time zone, like 2005-09-23T17:30:00+05:30");
    });
  });

  describe("tests.rateShipment when given an object", () => {
    it("validates that retries is a number", () => {
      const config = {
        tests: {
          rateShipment: {
            retries: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment.retries must be a number");
    });

    it("validates that timeout is a number", () => {
      const config = {
        tests: {
          rateShipment: {
            timeout: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment.timeout must be a number");
    });

    it("validates that skip is a boolean", () => {
      const config = {
        tests: {
          rateShipment: {
            skip: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment.skip must be a boolean");
    });

    it("validates that session is an object", () => {
      const config = {
        tests: {
          rateShipment: {
            session: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment.session must be of type object");
    });

    it("validates that connectArgs is an object", () => {
      const config = {
        tests: {
          rateShipment: {
            connectArgs: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment.connectArgs must be of type object");
    });

    it("validates that deliveryServiceName is a string", () => {
      const config = {
        tests: {
          rateShipment: {
            deliveryServiceName: 123
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment.deliveryServiceName must be a string");
    });

    it("validates that packagingName is a string", () => {
      const config = {
        tests: {
          rateShipment: {
            packagingName: 123
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment.packagingName must be a string");
    });

    it("validates that shipFrom is an address object", () => {
      const config = {
        tests: {
          rateShipment: {
            shipFrom: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment.shipFrom must be of type object");
    });

    it("validates that shipTo is an address object", () => {
      const config = {
        tests: {
          rateShipment: {
            shipTo: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment.shipTo must be of type object");
    });

    it("validates that weight is a weight object", () => {
      const config = {
        tests: {
          rateShipment: {
            weight: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment.weight must be of type object");
    });

    it("validates that shipDateTime is a valid date time string", () => {
      const config = {
        tests: {
          rateShipment: {
            shipDateTime: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment.shipDateTime must be a complete ISO 8601 date/time with a time zone, like 2005-09-23T17:30:00+05:30");
    });
  });

  describe("tests.rateShipment when given an array", () => {
    it("validates that retries is a number", () => {
      const config = {
        tests: {
          rateShipment: [{
            retries: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment[0].retries must be a number");
    });

    it("validates that timeout is a number", () => {
      const config = {
        tests: {
          rateShipment: [{
            timeout: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment[0].timeout must be a number");
    });

    it("validates that skip is a boolean", () => {
      const config = {
        tests: {
          rateShipment: [{
            skip: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment[0].skip must be a boolean");
    });

    it("validates that session is an object", () => {
      const config = {
        tests: {
          rateShipment: [{
            session: "invalid"
          }]
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment[0].session must be of type object");
    });

    it("validates that connectArgs is an object", () => {
      const config = {
        tests: {
          rateShipment: [{
            connectArgs: "invalid"
          }]
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment[0].connectArgs must be of type object");
    });

    it("validates that deliveryServiceName is a string", () => {
      const config = {
        tests: {
          rateShipment: [{
            deliveryServiceName: 123
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment[0].deliveryServiceName must be a string");
    });

    it("validates that packagingName is a string", () => {
      const config = {
        tests: {
          rateShipment: [{
            packagingName: 123
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment[0].packagingName must be a string");
    });

    it("validates that shipFrom is an address object", () => {
      const config = {
        tests: {
          rateShipment: [{
            shipFrom: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment[0].shipFrom must be of type object");
    });

    it("validates that shipTo is an address object", () => {
      const config = {
        tests: {
          rateShipment: [{
            shipTo: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment[0].shipTo must be of type object");
    });

    it("validates that weight is a weight object", () => {
      const config = {
        tests: {
          rateShipment: [{
            weight: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment[0].weight must be of type object");
    });

    it("validates that shipDateTime is a valid date time string", () => {
      const config = {
        tests: {
          rateShipment: [{
            shipDateTime: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.rateShipment[0].shipDateTime must be a complete ISO 8601 date/time with a time zone, like 2005-09-23T17:30:00+05:30");
    });
  });

  describe("tests.cancelShipment when given an object", () => {
    it("validates that retries is a number", () => {
      const config = {
        tests: {
          cancelShipment: {
            retries: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment.retries must be a number");
    });

    it("validates that timeout is a number", () => {
      const config = {
        tests: {
          cancelShipment: {
            timeout: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment.timeout must be a number");
    });

    it("validates that skip is a boolean", () => {
      const config = {
        tests: {
          cancelShipment: {
            skip: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment.skip must be a boolean");
    });

    it("validates that session is an object", () => {
      const config = {
        tests: {
          cancelShipment: {
            session: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment.session must be of type object");
    });

    it("validates that connectArgs is an object", () => {
      const config = {
        tests: {
          cancelShipment: {
            connectArgs: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment.connectArgs must be of type object");
    });

    it("validates that retries is a number", () => {
      const config = {
        tests: {
          cancelShipment: {
            retries: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment.retries must be a number");
    });

    it("validates that timeout is a number", () => {
      const config = {
        tests: {
          cancelShipment: {
            timeout: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment.timeout must be a number");
    });

    it("validates that skip is a boolean", () => {
      const config = {
        tests: {
          cancelShipment: {
            skip: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment.skip must be a boolean");
    });

    it("validates that session is an object", () => {
      const config = {
        tests: {
          cancelShipment: {
            session: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment.session must be of type object");
    });

    it("validates that connectArgs is an object", () => {
      const config = {
        tests: {
          cancelShipment: {
            connectArgs: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment.connectArgs must be of type object");
    });

    it("validates that deliveryServiceName is a string", () => {
      const config = {
        tests: {
          cancelShipment: {
            deliveryServiceName: 123
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment.deliveryServiceName must be a string");
    });

    it("validates that shipFrom is an address object", () => {
      const config = {
        tests: {
          cancelShipment: {
            shipFrom: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment.shipFrom must be of type object");
    });

    it("validates that shipTo is an address object", () => {
      const config = {
        tests: {
          cancelShipment: {
            shipTo: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment.shipTo must be of type object");
    });

    it("validates that weight is a weight object", () => {
      const config = {
        tests: {
          cancelShipment: {
            weight: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment.weight must be of type object");
    });

    it("validates that shipDateTime is a valid date time string", () => {
      const config = {
        tests: {
          cancelShipment: {
            shipDateTime: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment.shipDateTime must be a complete ISO 8601 date/time with a time zone, like 2005-09-23T17:30:00+05:30");
    });
  });

  describe("tests.cancelShipment when given an array", () => {
    it("validates that retries is a number", () => {
      const config = {
        tests: {
          cancelShipment: [{
            retries: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment[0].retries must be a number");
    });

    it("validates that timeout is a number", () => {
      const config = {
        tests: {
          cancelShipment: [{
            timeout: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment[0].timeout must be a number");
    });

    it("validates that skip is a boolean", () => {
      const config = {
        tests: {
          cancelShipment: [{
            skip: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment[0].skip must be a boolean");
    });

    it("validates that session is an object", () => {
      const config = {
        tests: {
          cancelShipment: [{
            session: "invalid"
          }]
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment[0].session must be of type object");
    });

    it("validates that connectArgs is an object", () => {
      const config = {
        tests: {
          cancelShipment: [{
            connectArgs: "invalid"
          }]
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment[0].connectArgs must be of type object");
    });

    it("validates that deliveryServiceName is a string", () => {
      const config = {
        tests: {
          cancelShipment: [{
            deliveryServiceName: 123
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment[0].deliveryServiceName must be a string");
    });

    it("validates that shipFrom is an address object", () => {
      const config = {
        tests: {
          cancelShipment: [{
            shipFrom: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment[0].shipFrom must be of type object");
    });

    it("validates that shipTo is an address object", () => {
      const config = {
        tests: {
          cancelShipment: [{
            shipTo: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment[0].shipTo must be of type object");
    });

    it("validates that weight is a weight object", () => {
      const config = {
        tests: {
          cancelShipment: [{
            weight: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment[0].weight must be of type object");
    });

    it("validates that shipDateTime is a valid date time string", () => {
      const config = {
        tests: {
          cancelShipment: [{
            shipDateTime: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.cancelShipment[0].shipDateTime must be a complete ISO 8601 date/time with a time zone, like 2005-09-23T17:30:00+05:30");
    });
  });

  describe("tests.createShipment_return when given an object", () => {
    it("validates that retries is a number", () => {
      const config = {
        tests: {
          createShipment_return: {
            retries: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return.retries must be a number");
    });

    it("validates that timeout is a number", () => {
      const config = {
        tests: {
          createShipment_return: {
            timeout: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return.timeout must be a number");
    });

    it("validates that skip is a boolean", () => {
      const config = {
        tests: {
          createShipment_return: {
            skip: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return.skip must be a boolean");
    });

    it("validates that session is an object", () => {
      const config = {
        tests: {
          createShipment_return: {
            session: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return.session must be of type object");
    });

    it("validates that connectArgs is an object", () => {
      const config = {
        tests: {
          createShipment_return: {
            connectArgs: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return.connectArgs must be of type object");
    });

    it("validates that retries is a number", () => {
      const config = {
        tests: {
          createShipment_return: {
            retries: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return.retries must be a number");
    });

    it("validates that timeout is a number", () => {
      const config = {
        tests: {
          createShipment_return: {
            timeout: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return.timeout must be a number");
    });

    it("validates that skip is a boolean", () => {
      const config = {
        tests: {
          createShipment_return: {
            skip: "invalid"
          }
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return.skip must be a boolean");
    });

    it("validates that session is an object", () => {
      const config = {
        tests: {
          createShipment_return: {
            session: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return.session must be of type object");
    });

    it("validates that connectArgs is an object", () => {
      const config = {
        tests: {
          createShipment_return: {
            connectArgs: "invalid"
          }
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return.connectArgs must be of type object");
    });

    it("validates that deliveryServiceName is a string", () => {
      const config = {
        tests: {
          createShipment_return: {
            deliveryServiceName: 123
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return.deliveryServiceName must be a string");
    });

    it("validates that deliveryConfirmationName is a string", () => {
      const config = {
        tests: {
          createShipment_return: {
            deliveryConfirmationName: 123
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return.deliveryConfirmationName must be a string");
    });

    it("validates that rmaNumber is a string", () => {
      const config = {
        tests: {
          createShipment_return: {
            rmaNumber: 123
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return.rmaNumber must be a string");
    });

    it("validates that shipFrom is an address object", () => {
      const config = {
        tests: {
          createShipment_return: {
            shipFrom: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return.shipFrom must be of type object");
    });

    it("validates that shipTo is an address object", () => {
      const config = {
        tests: {
          createShipment_return: {
            shipTo: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return.shipTo must be of type object");
    });

    it("validates that label is a label object", () => {
      const config = {
        tests: {
          createShipment_return: {
            label: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return.label must be of type object");
    });

    it("validates that weight is a weight object", () => {
      const config = {
        tests: {
          createShipment_return: {
            weight: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return.weight must be of type object");
    });

    it("validates that shipDateTime is a valid date time string", () => {
      const config = {
        tests: {
          createShipment_return: {
            shipDateTime: "invalid"
          },
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return.shipDateTime must be a complete ISO 8601 date/time with a time zone, like 2005-09-23T17:30:00+05:30");
    });
  });

  describe("tests.createShipment_return when given an array", () => {
    it("validates that retries is a number", () => {
      const config = {
        tests: {
          createShipment_return: [{
            retries: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return[0].retries must be a number");
    });

    it("validates that timeout is a number", () => {
      const config = {
        tests: {
          createShipment_return: [{
            timeout: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return[0].timeout must be a number");
    });

    it("validates that skip is a boolean", () => {
      const config = {
        tests: {
          createShipment_return: [{
            skip: "invalid"
          }]
        },
      };

      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return[0].skip must be a boolean");
    });

    it("validates that session is an object", () => {
      const config = {
        tests: {
          createShipment_return: [{
            session: "invalid"
          }]
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return[0].session must be of type object");
    });

    it("validates that connectArgs is an object", () => {
      const config = {
        tests: {
          createShipment_return: [{
            connectArgs: "invalid"
          }]
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return[0].connectArgs must be of type object");
    });

    it("validates that deliveryServiceName is a string", () => {
      const config = {
        tests: {
          createShipment_return: [{
            deliveryServiceName: 123
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return[0].deliveryServiceName must be a string");
    });

    it("validates that deliveryConfirmationName is a string", () => {
      const config = {
        tests: {
          createShipment_return: [{
            deliveryConfirmationName: 123
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return[0].deliveryConfirmationName must be a string");
    });

    it("validates that rmaNumber is a string", () => {
      const config = {
        tests: {
          createShipment_return: [{
            rmaNumber: 123
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return[0].rmaNumber must be a string");
    });

    it("validates that shipFrom is an address object", () => {
      const config = {
        tests: {
          createShipment_return: [{
            shipFrom: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return[0].shipFrom must be of type object");
    });

    it("validates that shipTo is an address object", () => {
      const config = {
        tests: {
          createShipment_return: [{
            shipTo: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return[0].shipTo must be of type object");
    });

    it("validates that label is a label object", () => {
      const config = {
        tests: {
          createShipment_return: [{
            label: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return[0].label must be of type object");
    });

    it("validates that weight is a weight object", () => {
      const config = {
        tests: {
          createShipment_return: [{
            weight: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return[0].weight must be of type object");
    });

    it("validates that shipDateTime is a valid date time string", () => {
      const config = {
        tests: {
          createShipment_return: [{
            shipDateTime: "invalid"
          }],
        },
      };
      let result;
      let errorResult;

      try {
        result = validateConfig(config);
      }
      catch (error) {
        errorResult = error;
      }

      expect(result).to.be.undefined;
      expect(errorResult.message).to.be.equal("tests.createShipment_return[0].shipDateTime must be a complete ISO 8601 date/time with a time zone, like 2005-09-23T17:30:00+05:30");
    });
  });
});
