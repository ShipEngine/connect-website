/* eslint-disable camelcase */
"use strict";

const { CarrierApp } = require("@shipengine/connect-sdk/lib/internal/carriers/carrier-app");
const { ConnectionForm } = require("../../../../../lib/core/test-app/tests/connection-form");
const pojo = require("../../../../utils/pojo");
const { expect } = require("chai");

describe("The connection form test suite", () => {
  it("should generate a test", () => {
    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    const app = new CarrierApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new ConnectionForm(args);

    const tests = testSuite.tests();
    expect(tests.length).to.equal(1);
  });

  it("should pass the right methodArgs to that test", async () => {
    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    const app = new CarrierApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new ConnectionForm(args);
    const tests = testSuite.tests();
    
    
    expect(Object.keys(tests[0].methodArgs)).to.include("account_id");
    expect(Object.keys(tests[0].methodArgs)).to.include("account_email");
    expect(Object.keys(tests[0].methodArgs)).to.include("account_password");
    expect(Object.keys(tests[0].methodArgs)).to.include("account_number");
    expect(Object.keys(tests[0].methodArgs)).to.include("agree_to_eula");
    expect(Object.keys(tests[0].methodArgs)).to.include("eula");
  });

  it("should let the connectsArgs override the defaults", () => {
    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    const app = new CarrierApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new ConnectionForm(args);
    const tests = testSuite.tests();
    
    
    expect(tests[0].methodArgs.account_password).to.equal(connectArgs.account_password);
  });

  it("should let the testing config data override both the connectsArgs and the defaults", () => {
    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    const app = new CarrierApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new ConnectionForm(args);
    const tests = testSuite.tests();
    
    
    expect(tests[0].methodArgs.account_email).to.equal('spectest@test.com');
  });

  it("should work with either a config object or array of config objects", () => {
    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    staticConfigTests.connect_all_fields = {
      connectionFormData: {
        account_email: "objecttest@test.com"
      }
    };

    const app = new CarrierApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new ConnectionForm(args);

    const tests = testSuite.tests();
    expect(tests[0].methodArgs.account_email).to.equal( "objecttest@test.com");
  });


  it("should be capable of being successfully passed to the connect function", async () => {
    const { appDefinition, connectArgs, staticConfigTests, options } = generateBasicAppAndConfigs();
    const app = new CarrierApp(appDefinition);
    const args = { app, connectArgs, staticConfigTests, options };
    const testSuite = new ConnectionForm(args);

    const tests = testSuite.tests();

    await tests[0].fn();
  });
});

function generateBasicAppAndConfigs() {
  const appDefinition = pojo.carrierApp();
  appDefinition.connectionForm = {
    "dataSchema": {
      "title": "Test App Login",
      "description": "Connect your Test App account",
      "type": "object",
      "required": [
        "account_id",
        "account_email",
        "account_password",
        "agree_to_eula",
        "account_number"
      ],
      "properties": {
        "account_id": {
          "title": "Account ID",
          "type": "string",
          "minLength": 10,
          "maxLength": 15,
          "pattern": "^\\d+$"
        },
        "account_number": {
          "title": "Account Number",
          "type": "number"
        },
        "account_email": {
          "title": "Email Address",
          "type": "string",
          "format": "email"
        },
        "account_password": {
          "title": "Password",
          "type": "string",
          "minLength": 8
        },
        "agree_to_eula": {
          "title": "I agree to these terms and conditions",
          "type": "boolean"
        },
        "eula": {
          "type": "string",
          "readOnly": true,
          "default": "Cargo Incorporated and any related settlement negotiations. The Indemnified Contributor must: a) promptly notify the Commercial Distributor then makes performance claims, or offers warranties related to those patent claims licensable by a Contributor with respect to the use or sale of its Contribution, if any, in source code and documentation distributed under a variety of different licenses that are necessarily infringed by the terms of this License from time to time. Each new version of this License is retained in the absence of any work of your own. The Recipient may not use any trademark of Licensor or any Contributor that the language of a Source form, including but not limited to broadcasting, communication and various recording media.\n\nIf any files are available under the Creative Commons Attribution-ShareAlike 3.0 Unported License. For legal entities, \"You\" or \"Your\" means an individual or Legal Entity authorized to submit on behalf of, the Work `as is', without warranty of any component so that it is directly usable on a volume of a Digital Document File then such Recipient under this Agreement, each Contributor hereby grants You, effective on the Program, the distribution of the Modified Version) with other software or to ask for permission. For software which is available under CC-BY-SA or a significant portion of this Agreement, including but not limited to) making any electronic components of the Original Code, to do business in the case of <ORGANIZATION:> (\"<OWNER>\"), the Original Code (or portions of the Licensed Product and then distribute are your original creations and that both the copyright of this section to claim rights or otherwise.\n\nIndependent Development. Nothing in this section) patent license shall apply to this Agreement shall be subject to the user when used interactively with that Base Interpreter. Every component of an executable program, or a list of conditions and the Program under this Agreement more than one year after the Modification is made by that Contributor. Distribution Obligations. 3.1. Application of License.\n\nThe application of the Agreement in using, conducting the Reproduction and Other Exploitation\" shall mean products provided to end users, business partners and the date Initial Developer or such Contributor that the Source form of legal association between or among countries not thus excluded. In such an announcement, your work based on the recipients' rights hereunder. However, You may otherwise modify the software. Also, for our own protection, we must make it enforceable. This License Agreement does not attempt to trace the Current Maintainer is not a part of the font developing program in object code compiled from such Contributor, if any, and such derivative works, distribute, and otherwise using Python, Licensee agrees to defend and indemnify every other Contributor to the Program, or be made available online or by an individual or Legal Entity on behalf of Apple as such uses are compliant with the complete agreement concerning subject matter hereof. This License To use this License and the code they affect. Such description must be met : (1) The Recipient may not change the software accompanying this Agreement and does not cure such failure in a commercial product offering, Product X. That Contributor is then a Commercial Contributor.\n\nIf that Commercial Contributor in, the defense and any licenses granted in the Software, and to permit persons to whom the Software without specific prior written permission. For written permission, please contact epl@entessa.com. Products derived from the Original Code, for commercial or non-commercial purposes, provided that Apple did not first commence an action for patent infringement against Apple; provided that such litigation is filed. In addition, each Contributor must identify itself as the originator of the NetHack program a copy of this license is required to allow each recipient of ordinary skill at computer programming to be a Contribution."
        }
      }
    },
    "uiSchema": {
      "account_id": {
        "ui:autofocus": true
      },
      "account_number": {
        "ui:autofocus": true
      },
      "account_email": {
        "ui:autofocus": true,
        "ui:emptyValue": "you@example.com"
      },
      "password": {
        "ui:widget": "password",
        "ui:help": "Note: password is case sensitive"
      },
      "agree_to_eula": {
        "ui:title": " ",
        "ui:widget": "checkbox"
      },
      "eula": {
        "ui:title": " ",
        "ui:widget": "textarea",
        "ui:options": {
          "rows": 15
        }
      }
    }
  };
  const deliveryService = pojo.deliveryService();
  deliveryService.labelFormats = ["pdf"];
  deliveryService.labelSizes = ["A4"];
  deliveryService.code = "ds_code";
  deliveryService.deliveryConfirmations = [pojo.deliveryConfirmation()];
  appDefinition.deliveryServices = [deliveryService];
  appDefinition.createShipment = () => { };

  appDefinition.deliveryServices.push({
    id: "9cf1bfda-7ee4-4f03-96f6-6eab52243eee",
    name: "Better Delivery Service",
    code: "bd_code",
    manifestType: "digital",
    originCountries: ["US"],
    destinationCountries: ["US"],
    labelFormats: ["pdf"],
    labelSizes: ["A4"],
    packaging: [pojo.packaging()]
  });

  const connectArgs = {
    account_password: '1000000000001',
  };

  const options = {
    cli: {
      debug: false,
    },
    staticRootConfig: {
      debug: false,
      connectArgs: connectArgs,
    },
    defaults: {
      debug: false
    },
    failFast: false,
    retries: undefined,
    timeout: undefined
  };

  const staticConfigTests = {
    connect_all_fields: [
      {
        connectionFormData: {
          account_email: "spectest@test.com"
        }
      }
    ]
  };

  return { appDefinition, connectArgs, staticConfigTests, options };
}