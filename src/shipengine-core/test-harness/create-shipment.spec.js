const { before } = require("mocha");
const { expect } = require("chai");

const appLoader = require("@shipengine/integration-platform-loader");

let app;
describe("The create label method", () => {

  before(async () => {
    app = await appLoader.loadApp(process.cwd());
    console.log(app);
  })

  it("hello world", () => {
    expect(true).to.equal(true);
  });

});