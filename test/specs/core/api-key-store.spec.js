"use strict";

const { expect } = require("chai");
const ApiKeyStore = require("../../../lib/core/api-key-store");

describe("ApiKeyStore", () => {
  describe(".set", () => {
    it("sets the given ApiKey", () => {
      const apiKey = "test";
      const setResponse = ApiKeyStore.set(apiKey);
      const getResponse = ApiKeyStore.get();

      expect(setResponse).to.eql(apiKey);
      expect(getResponse).to.eql(apiKey);
    });
  });

  describe(".get", () => {
    it("gets the ApiKey", () => {
      const apiKey = "test";
      const setResponse = ApiKeyStore.set(apiKey);
      const getResponse = ApiKeyStore.get();

      expect(setResponse).to.eql(apiKey);
      expect(getResponse).to.eql(apiKey);
    });

    it("returns an null when the ApiKey is not present", () => {
      ApiKeyStore.clear();
      const getResponse = ApiKeyStore.get();

      expect(getResponse).to.eql(null);
    });
  });

  describe(".clear", () => {
    it("clears the ApiKey", () => {
      const apiKey = "test";
      const setResponse = ApiKeyStore.set(apiKey);
      let getResponse = ApiKeyStore.get();
      const clearResponse = ApiKeyStore.clear();

      expect(setResponse).to.eql(apiKey);
      expect(getResponse).to.eql(apiKey);
      expect(clearResponse).to.eql(true);

      getResponse = ApiKeyStore.get();

      expect(getResponse).to.eql(null);
    });
  });
});
