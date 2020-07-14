"use strict";

const { expect } = require("chai");
const {
  useTestResults,
} = require("../../../../../lib/core/test-app/runner/test-results");

describe("useTestResults", () => {
  describe("passed", () => {
    it("increments passed count", () => {
      const [testResults, testResultsReducer] = useTestResults();
      expect(testResults.passed).to.be.equal(0);
      testResultsReducer("INCREMENT_PASSED");
      expect(testResults.passed).to.be.equal(1);
    });
  });

  describe("skipped", () => {
    it("increments skipped count", () => {
      const [testResults, testResultsReducer] = useTestResults();
      expect(testResults.skipped).to.be.equal(0);
      testResultsReducer("INCREMENT_SKIPPED");
      expect(testResults.skipped).to.be.equal(1);
    });
  });

  describe("failed", () => {
    it("increments failed count", () => {
      const [testResults, testResultsReducer] = useTestResults();
      expect(testResults.failed).to.be.equal(0);
      testResultsReducer("INCREMENT_FAILED");
      expect(testResults.failed).to.be.equal(1);
    });
  });

  describe("hasFailed", () => {
    it("returns false when there are no failures", () => {
      const [testResults, testResultsReducer] = useTestResults();
      expect(testResults.hasFailed()).to.be.equal(false);
      testResultsReducer("INCREMENT_FAILED");
      expect(testResults.failed).to.be.equal(1);
    });

    it("returns true when there are failures", () => {
      const [testResults, testResultsReducer] = useTestResults();
      testResultsReducer("INCREMENT_FAILED");
      expect(testResults.hasFailed()).to.be.equal(true);
    });
  });
});
