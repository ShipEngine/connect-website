/* eslint-disable space-before-function-paren */
"use strict";

const { expect } = require("chai");
const callWithTimeout = require("../../../../../lib/core/test-app/runner/call-with-timeout")
  .default;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function func1() {
  // test: func completes in time
  await sleep(100);
}

async function func2() {
  // test: func does not complete in time
  await sleep(300);
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

describe("callWithTimeout", () => {
  it("returns the function when it completes in time", async () => {
    let response, errorResponse;
    try {
      response = callWithTimeout(func1, 200);
    } catch (error) {
      errorResponse = error;
    }

    expect(response).to.be.ok;
    expect(errorResponse).to.be.undefined;
  });

  it("throws an error when the function does not complete in time", () => {
    let response, errorResponse;
    try {
      response = callWithTimeout(func2, 200);
    } catch (error) {
      errorResponse = error.message;
    }

    expect(response).to.be.undefined;
    expect(errorResponse).to.be.equal("test timeout");
  });
});
