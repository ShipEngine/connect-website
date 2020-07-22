/* eslint-disable space-before-function-paren */
"use strict";

const { expect } = require("chai");
const callWithTimeoutAndRetries = require("../../../../../lib/core/test-app/runner/call-with-timeout-and-retries")
  .default;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function func1() {
  // test: func completes in time
  await sleep(100);
  return "ok";
}

async function func2() {
  // test: func does not complete in time
  await sleep(300);
  return "ok";
}

async function func3() {
  // test: func throws exception before timeout
  await sleep(100);
  throw new Error("exception in func");
}

async function func4() {
  // test: func would have thrown exception but timeout occurred first
  await sleep(300);
  throw new Error("exception in func");
}

describe("callWithTimeoutAndRetries", () => {
  it("returns the function when it completes in time", async () => {
    let response, errorResponse;
    try {
      response = await callWithTimeoutAndRetries(func1, 200);
    } catch (error) {
      errorResponse = error;
    }

    expect(response).to.be.equal("ok");
    expect(errorResponse).to.be.undefined;
  });

  it("throws a timeout error when the function does not complete in time", async () => {
    let response, errorResponse;
    try {
      response = await callWithTimeoutAndRetries(func2, 200);
    } catch (error) {
      errorResponse = error.message;
    }

    expect(response).to.be.undefined;
    expect(errorResponse).to.be.equal("test timed out after 200ms");
  });

  it("throws a function error when the function throws an error in time", async () => {
    let response, errorResponse;
    try {
      response = await callWithTimeoutAndRetries(func3, 200);
    } catch (error) {
      errorResponse = error.message;
    }

    expect(response).to.be.undefined;
    expect(errorResponse).to.be.equal("exception in func");
  });

  it("throws a timeout error when the function would have thrown an error", async () => {
    let response, errorResponse;
    try {
      response = await callWithTimeoutAndRetries(func4, 200);
    } catch (error) {
      errorResponse = error.message;
    }

    expect(response).to.be.undefined;
    expect(errorResponse).to.be.equal("test timed out after 200ms");
  });
});
