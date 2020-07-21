"use strict";

const { expect } = require("chai");
const Runner = require("../../../../../lib/core/test-app/runner").default;
const Suite = require("../../../../../lib/core/test-app/runner/suite").default;
const pojo = require("../../../utils/pojo");
const {
  useTestResults,
} = require("../../../../../lib/core/test-app/runner/test-results");
const app = pojo.carrierApp();

class MockSuite extends Suite {
  constructor(props) {
    super(props);
    this.title = "createShipment_domestic";
  }

  buildTestArg(localConfig) {
    return {
      title: "a mock test",
      methodArgs: true,
      config: localConfig,
    };
  }

  buildTestArgs() {
    if (Array.isArray(this.config)) {
      return this.config.map((config) => {
        return this.buildTestArg(config);
      });
    } else {
      return [this.buildTestArg(this.config)];
    }
  }

  tests() {
    return this.buildTestArgs().map((testArg) => {
      return this.test(
        testArg.title,
        testArg.methodArgs,
        testArg.config,
        () => {
          // eslint-disable-next-line no-self-compare
          expect(testArg.methodArgs).to.equal(true);
        },
      );
    });
  }
}

const options = {
  defaults: {
    debug: false,
    failFast: false,
    retries: 1,
    timeout: 2000,
  },
  staticRootConfig: {},
  cli: {},
  failFast() {
    return (
      this.cli.failFast ||
      this.staticRootConfig.failFast ||
      this.defaults.failFast
    );
  },
};

describe("Runner", () => {
  it("runs test suites", async () => {
    const [testResults, testResultsReducer] = useTestResults();
    const staticConfigTests = {};
    const suiteA = new MockSuite({ app, staticConfigTests, options });
    const suites = [suiteA];
    const results = await new Runner({
      failFast: false,
      suites,
      testResults,
      testResultsReducer,
    }).run();

    expect(results.passed).to.equal(1);
    expect(results.skipped).to.equal(0);
    expect(results.failed).to.equal(0);
  });

  // it("counts the failures", async () => {
  //   const [testResults, testResultsReducer] = useTestResults();
  //   const staticConfigTests = {};
  //   const suiteA = new FailingMockSuite({ app, staticConfigTests, options });
  //   const suites = [suiteA];
  //   const results = await new Runner({
  //     failFast: false,
  //     suites,
  //     testResults,
  //     testResultsReducer,
  //   }).run();

  //   expect(results.passed).to.equal(0);
  //   expect(results.skipped).to.equal(0);
  //   expect(results.failed).to.equal(1);
  // });

  // it("counts the skips", async () => {
  //   const [testResults, testResultsReducer] = useTestResults();
  //   const staticConfigTests = { skip: true };
  //   const suiteA = new MockSuite({ app, staticConfigTests, options });
  //   const suites = [suiteA];
  //   const results = await new Runner({
  //     failFast: false,
  //     suites,
  //     testResults,
  //     testResultsReducer,
  //   }).run();

  //   expect(results.passed).to.equal(0);
  //   expect(results.skipped).to.equal(1);
  //   expect(results.failed).to.equal(0);
  // });

  // it("supports a fail fast option", async () => {
  //   const staticConfigTests = {};
  //   const options = { failFast: false };
  //   const suiteA = new MockSuite({ app, staticConfigTests, options });
  //   const suites = [suiteA];
  //   const results = await new Runner({ suites, options }).run();

  //   expect(results.passed).to.equal(0);
  //   expect(results.skipped).to.equal(0);
  //   expect(results.failed).to.equal(1);
  // });

  // it("supports a debug option", async () => {
  //   const staticConfigTests = {};
  //   const options = { failFast: false };
  //   const suiteA = new MockSuite({ app, staticConfigTests, options });
  //   const suites = [suiteA];
  //   const results = await new Runner({ suites, options }).run();

  //   expect(results.passed).to.equal(1);
  //   expect(results.skipped).to.equal(0);
  //   expect(results.failed).to.equal(1);
  // });

  // it("supports an expectedErrorMessage option", async () => {
  //   const staticConfigTests = {};
  //   const options = { failFast: false };
  //   const suiteA = new MockSuite({ app, staticConfigTests, options });
  //   const suites = [suiteA];
  //   const results = await new Runner({ suites, options }).run();

  //   expect(results.passed).to.equal(1);
  //   expect(results.skipped).to.equal(0);
  //   expect(results.failed).to.equal(1);
  // });

  // it("supports a grep option");
});
