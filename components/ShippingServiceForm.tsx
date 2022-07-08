import React, { useEffect } from "react";
import {
  FormBuilder,
  wrapInSingleQuotes,
  required,
  snakeCase,
  maxLength,
  validationRules,
} from "./FormBuilder";
import { v4 as uuid } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";

const getDefaultValues = () => {
  return {
    id: uuid(),
    name: "Shipping Service",
    apiCode: "carrier_shipping_service",
    abbreviation: "service",
    code: "ss",
    international: false,
    labelCode: "ss",
    class: "Unspecified",
    grade: "Unspecified",
    requiredProperties: [],
    supportedLabelSizes: [],
    supportedCountries: [],
    serviceAttributes: [],
    confirmationTypes: [],
  };
};

export const ShippingServiceForm = ({ register, errors, setValue, reset }) => {
  useEffect(() => {
    reset(getDefaultValues());
  }, []);
  var form = new FormBuilder(register, errors);

  const handleReset = () => {
    reset(getDefaultValues());
  };
  return form
    .withFieldClass("mt-3")
    .withTextField("Id", "id", true, "This is a description of the Id")
    .withTextField(
      "Service Name",
      "name",
      false,
      "The name of this shipping service ex: 'Overnight Guarantee'",
      validationRules(required, maxLength(80))
    )
    .withTextField(
      "Api Code",
      "apiCode",
      false,
      "The identifier for this shipping service to be used in API calls.",
      validationRules(required, snakeCase, maxLength(50))
    )
    .withTextField(
      "Abbreviation",
      "abbreviation",
      false,
      "This is an abbreviation of the name if necessary.",
      validationRules(maxLength(20))
    )
    .withTextField(
      "Service Code",
      "code",
      false,
      "This is the code that will be sent to requests, this should be the samecode the carrier's api would expect.",
      validationRules(required, maxLength(50))
    )
    .withSwitch(
      "Is International",
      "international",
      "Indicates whether or not this service is for international or domestic use."
    )
    .withTextField(
      "Label Code",
      "labelCode",
      false,
      "The label code associated with this shipping service.",
      validationRules(maxLength(50))
    )
    .withMultiSelect(
      "Supported Label Sizes",
      "supportedLabelSizes",
      [
        {
          text: "4x6 Inches",
          value: "Inches4x6",
        },
        {
          text: "4x8 Inches",
          value: "Inches4x8",
        },
      ],
      "A list of label sizes supported by this service."
    )
    .withSelect(
      "Service Grade",
      "grade",
      ["Unspecified", "Economy", "Expedited", "Overnight", "Standard"],
      "The grade of the service."
    )
    .withSelect(
      "Service Class",
      "class",
      [
        "Unspecified",
        "Ground",
        "OneDay",
        "OneDayEarly",
        "OneDayEarlyAm",
        "TwoDay",
        "TwoDayEarly",
        "ThreeDay",
      ],
      "The class of service."
    )
    .withMultiSelect(
      "Required Properties",
      "requiredProperties",
      ["Weight", "Dimensions"],
      "The class of service."
    )
    .withMultiSelect(
      "Service Attributes",
      "serviceAttributes",
      [
        "Returns",
        "MultiPackage",
        "Tracking",
        "ConsolidatorService",
        "AutomatedTrackingAllowed",
        "ManifestDigital",
        "ManifestPhysical",
        "SameDayService",
        "Tip",
        "DeliveryWindow",
        "PickupOnLabelCreation",
      ],
      "A list of attributes about this service."
    )
    .withButton("Generate New", "outline-dark", handleReset)
    .render();
};

export const GetCode = (values): string => {
  return `{
      Id: '${values.id}',
      Name: '${values.name}',
      ApiCode: '${values.apiCode}'
      Abbreviation: '${values.abbreviation}',
      Code: '${values.code}',
      International: ${values.international},
      LabelCode: '${values.labelCode}',
      Class: '${values.class}',
      Grade: '${values.grade}',
      RequiredProperties: [${values.requiredProperties?.map(
        wrapInSingleQuotes
      )}],
      SupportedLabelSizes: [${values.supportedLabelSizes?.map(
        wrapInSingleQuotes
      )}],
      SupportedCountries: [],
      ServiceAttributes: [${values.serviceAttributes?.map(wrapInSingleQuotes)}],
      ConfirmationTypes: [],
  }
  `;
};
