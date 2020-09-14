"use strict";

const { expect } = require("chai");
const parseDeploymentErrors = require("../../../../lib/core/utils/parse-deployment-errors").default;

describe("parseDeploymentErrors", () => {
  it("returns an array of error messages when when errors exist on the deployment", () => {
    const deployment = {
      "errors": [
        {
          "code": "app_definition_upload",
          "error": {
            "detailed_errors": [
              {
                "standardized_error_code": "validation_error",
                "message": "From Country supported country `AN` must be valid ISO 3166-1 alpha-2 code",
                "details": null
              },
              {
                "standardized_error_code": "validation_error",
                "message": "The length of 'PackageType `Colis standard international` Abbreviation' must be 20 characters or fewer. You entered 28 characters.",
                "details": null
              },
              {
                "standardized_error_code": "validation_error",
                "message": "The length of 'PackageType `Colis standard domestique` Abbreviation' must be 20 characters or fewer. You entered 25 characters.",
                "details": null
              },
              {
                "standardized_error_code": "validation_error",
                "message": "Provider `ShipEngine Chronopost` Carrier `ShipEngine Chronopost` is missing SettingsFormSchema.JsonSchema",
                "details": null
              },
              {
                "standardized_error_code": "validation_error",
                "message": "Provider `ShipEngine Chronopost` Carrier `ShipEngine Chronopost` has invalid json schema for SettingsFormSchema.JsonSchema",
                "details": null
              }
            ]
          }
        }
      ],
      "deployId": "10",
      "package": {
        "name": "shipengine-chronopost-1.0.1.tgz",
        "version": "1.0.1"
      },
      "createdAt": "2020-09-10T18:52:33.744Z",
      "updatedAt": "2020-09-10T19:31:14.161Z",
      "status": "error"
    }

    expect(parseDeploymentErrors(deployment)).to.be.eql([
      "From Country supported country `AN` must be valid ISO 3166-1 alpha-2 code",
      "The length of 'PackageType `Colis standard international` Abbreviation' must be 20 characters or fewer. You entered 28 characters.",
      "The length of 'PackageType `Colis standard domestique` Abbreviation' must be 20 characters or fewer. You entered 25 characters.",
      "Provider `ShipEngine Chronopost` Carrier `ShipEngine Chronopost` is missing SettingsFormSchema.JsonSchema",
      "Provider `ShipEngine Chronopost` Carrier `ShipEngine Chronopost` has invalid json schema for SettingsFormSchema.JsonSchema",
    ]);
  });

  it("returns an empty array when errors do not exist on the deployment", () => {
    const deployment = {
      "deployId": "10",
      "package": {
        "name": "shipengine-chronopost-1.0.1.tgz",
        "version": "1.0.1"
      },
      "createdAt": "2020-09-10T18:52:33.744Z",
      "updatedAt": "2020-09-10T19:31:14.161Z",
      "status": "error"
    }

    expect(parseDeploymentErrors(deployment)).to.be.eql([]);
  });
});
