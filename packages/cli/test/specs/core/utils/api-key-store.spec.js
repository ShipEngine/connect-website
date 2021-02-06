"use strict";

const { expect } = require("chai");
const {
  get,
  set,
  clear
} = require("../../../../lib/core/utils/api-key-store");

const key = "test"

describe("api-key-store", () => {
  describe("get", () => {
    it("returns a key when one exist", async () => {
      await set(key);

      let response;
      let errorResponse;
      try {
        response = await get();
      } catch (error) {
        errorResponse = error;
      }
      expect(response).equal(key);
      expect(errorResponse).to.be.undefined;
    });

    it("throws an error when a key does not exist", async () => {
      await clear();

      let response;
      let errorResponse;

      try {
        response = await get()
      } catch (error) {
        errorResponse = error;
      }
      expect(response).to.be.undefined;
      expect(errorResponse.code).equal("ERR_API_KEY_NOT_FOUND")
    });
  });

  describe("set", () => {
    it("sets the given key when one does not already exist", async () => {
      await clear();

      let response;
      let errorResponse;

      try {
        await set(key);
        response = await get();
      } catch (error) {
        errorResponse = error;
      }
      expect(response).equal(key);
      expect(errorResponse).to.be.undefined;
    });

    it("overwrites a previous key if one exist", async () => {
      const secondKey = "test two";

      await clear();
      await set(key);

      let response;
      let errorResponse;

      try {
        await set(secondKey);
        response = await get();
      } catch (error) {
        errorResponse = error;
      }
      expect(response).equal(secondKey);
      expect(errorResponse).to.be.undefined;
    });
  });

  describe("clear", () => {
    it("it clears the current key", async () => {
      await set(key)

      let response;
      let errorResponse;

      try {
        await clear();
        response = await get();
      } catch (error) {
        errorResponse = error;
      }
      expect(response).to.be.undefined;
      expect(errorResponse.code).equal("ERR_API_KEY_NOT_FOUND")
    })
  });
});
