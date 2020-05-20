const { expect } = require("chai");

const generateCarrierTests = function generateCarrierTests(tests, methodToCall) {
  // Check if the user specified a test number to run.
  const onlyTestNumber = process.env["TEST-NUMBER"];

  for (let i = 0; i < tests.length; i++) {
    let generatedTest = tests[i];
    if (!onlyTestNumber || (onlyTestNumber && i === Number(onlyTestNumber) - 1)) {
      it(generatedTest[2], async () => {
        // TODO: error message is not formatted very well, make it more readable for the end user.
        await expect(app.carrier[methodToCall](generatedTest[0], generatedTest[1])).to.not.be.rejected;
      });
    }
  }
}

module.exports = generateCarrierTests;