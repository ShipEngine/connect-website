import React, { useEffect } from "react";
import { FormBuilder } from "./FormBuilder";
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
    .withFieldClass("pt-3")
    .withTextField("Id", "id", true, "This is a description of the Id")
    .withTextField(
      "Service Name",
      "name",
      false,
      "The name of this shipping service ex: 'Overnight Guarantee'",
      {
        required: "This field is required",
        maxLength: { value: 80, message: "The max length is 80" },
      }
    )
    .withTextField(
      "Api Code",
      "apiCode",
      false,
      "The identifier for this shipping service to be used in API calls.",
      {
        required: "This field is required",
        pattern: {
          value: /^[a-z][a-z0-9_]*[a-z]$/,
          message: "Must be all lower case letters, numbers, and snake_cased",
        },
        maxLength: {
          value: 50,
          message: "The max length is 50",
        },
      }
    )
    .withTextField(
      "Abbreviation",
      "abbreviation",
      false,
      "This is an abbreviation of the name if necessary.",
      {
        maxLength: {
          value: 20,
          message: "The max length is 20",
        },
      }
    )
    .withTextField(
      "Service Code",
      "code",
      false,
      "This is the code that will be sent to requests, this should be the samecode the carrier's api would expect.",
      {
        required: "This field is required",
        maxLength: {
          value: 50,
          message: "The max length is 50",
        },
      }
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
      {
        maxLength: {
          value: 50,
          message: "The max length is 50",
        },
      }
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
    .withButton('Generate New', 'outline-dark', handleReset)
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
      Class: 'Unspecified',
      Grade: 'Unspecified',
      RequiredProperties: [],
      SupportedLabelSizes: [${values.supportedLabelSizes?.map(
        (ls) => `'${ls}'`
      )}],
      SupportedCountries: [],
      ServiceAttributes: [],
      ConfirmationTypes: [],
  }
  `;
};
