"use strict";

const { expect } = require("chai");
const ApiKeyStore = require("../../../lib/core/api-key-store");

describe("ApiKeyStore", () => {
  describe(".set 'apps' domain", () => {
    it("sets the given ApiKey", () => {
      const apiKey = "test";
      const setResponse = ApiKeyStore.set("apps", apiKey);
      const getResponse = ApiKeyStore.get("apps");

      expect(setResponse).to.eql(apiKey);
      expect(getResponse).to.eql(apiKey);
    });
  });

  describe(".set 'shipengine' domain", () => {
    it("sets the given ApiKey", () => {
      const apiKey = "test";
      const setResponse = ApiKeyStore.set("shipengine", apiKey);
      const getResponse = ApiKeyStore.get("shipengine");

      expect(setResponse).to.eql(apiKey);
      expect(getResponse).to.eql(apiKey);
    });
  });

  describe(".get 'apps' domain", () => {
    it("gets the ApiKey", () => {
      const apiKey = "test";
      const setResponse = ApiKeyStore.set("apps", apiKey);
      const getResponse = ApiKeyStore.get("apps");

      expect(setResponse).to.eql(apiKey);
      expect(getResponse).to.eql(apiKey);
    });

    it("returns an null when the ApiKey is not present", () => {
      ApiKeyStore.clear("apps");
      const getResponse = ApiKeyStore.get("apps");

      expect(getResponse).to.eql(null);
    });
  });

  describe(".get 'shipengine' domain", () => {
    it("gets the ApiKey", () => {
      const apiKey = "test";
      const setResponse = ApiKeyStore.set("shipengine", apiKey);
      const getResponse = ApiKeyStore.get("shipengine");

      expect(setResponse).to.eql(apiKey);
      expect(getResponse).to.eql(apiKey);
    });

    it("returns an null when the ApiKey is not present", () => {
      ApiKeyStore.clear("shipengine");
      const getResponse = ApiKeyStore.get("shipengine");

      expect(getResponse).to.eql(null);
    });
  });

  describe(".clear 'apps' domain", () => {
    it("clears the ApiKey", () => {
      const apiKey = "test";
      const setResponse = ApiKeyStore.set("apps", apiKey);
      let getResponse = ApiKeyStore.get("apps");
      const clearResponse = ApiKeyStore.clear("apps");

      expect(setResponse).to.eql(apiKey);
      expect(getResponse).to.eql(apiKey);
      expect(clearResponse).to.eql(true);

      getResponse = ApiKeyStore.get("apps");

      expect(getResponse).to.eql(null);
    });
  });

  describe(".clear 'shipengine' domain", () => {
    it("clears the ApiKey", () => {
      const apiKey = "test";
      const setResponse = ApiKeyStore.set("shipengine", apiKey);
      let getResponse = ApiKeyStore.get("shipengine");
      const clearResponse = ApiKeyStore.clear("shipengine");

      expect(setResponse).to.eql(apiKey);
      expect(getResponse).to.eql(apiKey);
      expect(clearResponse).to.eql(true);

      getResponse = ApiKeyStore.get("shipengine");

      expect(getResponse).to.eql(null);
    });
  });
});
