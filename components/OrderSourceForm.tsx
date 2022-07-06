import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { ErrorMessage } from "@hookform/error-message";
import { v4 as uuid } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";

const Required = () => {
  return <span style={{ color: "red" }}>*</span>;
};

const getDefaultValues = () => {
  return {
    id: uuid(),
    name: "Order Source Name",
    apiCode: "order_source_name",
    sendEmail: false,
    canConfigureTimeZone: false,
    canLeaveFeedback: false,
    hasCustomMappings: false,
    hasCustomStatuses: false,
    hasInventoryLevels: false,
    packingSlipTemplate: false,
  };
};

export const OrderSourceForm = ({ register, errors, setValue, reset }) => {
  useEffect(() => {
    reset(getDefaultValues())
  }, []);

  const handleReset = () => {
    reset(getDefaultValues());
  };
  return (
    <Form>
      <Form.Group className="pt-4">
        <Form.Control readOnly={true} {...register("id")} />
      </Form.Group>
      <Form.Group className="pt-4">
        <Form.Label>
          Brand Name: <Required />
        </Form.Label>
        <Form.Control
          {...register("name", {
            required: "This field is required",
            maxLength: {
              value: 50,
              message: "The max length is 50",
            },
          })}
        />
        <Form.Text className="text-muted">
          The branded name for this order source Example: 'Shopify', 'eBay',
          'Amazon Canada'.
        </Form.Text>
        <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }) => (
            <p>
              <i className="text-danger">{message}</i>
            </p>
          )}
        />
      </Form.Group>
      <Form.Group className="pt-4">
        <Form.Label>
          Api Code: <Required />
        </Form.Label>
        <Form.Control
          {...register("apiCode", {
            required: "This field is required",
            pattern: {
                value: /^[a-z][a-z0-9_]*[a-z]$/,
                message: "Must be all lower case letters, numbers, and snake_cased"
            },
            maxLength: {
              value: 50,
              message: "The max length is 50",
            },
          })}
        />
        <Form.Text className="text-muted">
         Api Code used by ShipEngine customers for this order source @example "shopify", "ebay", "amazon_ca".
        </Form.Text>
        <ErrorMessage
          errors={errors}
          name="apiCode"
          render={({ message }) => (
            <p>
              <i className="text-danger">{message}</i>
            </p>
          )}
        />
      </Form.Group>
      <Form.Group className="pt-4">
        <Form.Check label={"Send Email"} {...register("sendEmail")} />
        <Form.Text className="text-muted">
          Indicates whether or not our system is allowed to send emails to
          customers.
        </Form.Text>
      </Form.Group>
      <Form.Group className="pt-4">
        <Form.Check label={"Can Configure TimeZone"} {...register("canConfigureTimeZone")} />
        <Form.Text className="text-muted">
         Indicates whether or not a user is allowed to configure their own timezone.
        </Form.Text>
      </Form.Group>
      <Form.Group className="pt-4">
        <Form.Check
          label={"Has Custom Mappings"}
          {...register("hasCustomMappings")}
        />
        <Form.Text className="text-muted">
          Indicates whether or not this marketplace allows custom mappings.
        </Form.Text>
      </Form.Group>
      <Form.Group className="pt-4">
        <Form.Check
          label={"Can Leave Feedback"}
          {...register("canLeaveFeedback")}
        />
        <Form.Text className="text-muted">
          Indicates whether or not the order source allows sellers to leave
          feedback on customers.
        </Form.Text>
      </Form.Group>
      <Form.Group className="pt-4">
        <Form.Check
          label={"Supports ShipStation Packing Slip Templates"}
          {...register("packingSlipTemplate")}
        />
      </Form.Group>
      <Button className="mt-5" variant="outline-dark" onClick={handleReset}>
        Generate New
      </Button>
    </Form>
  );
};

export const GetCode = (values): string => {
  return `{
      Id: '${values.id}',
      Name: '${values.name}',
      ApiCode: '${values.apiCode}'
      SendEmail: ${values.sendEmail},
      CanConfigureTimeZone: ${values.canConfigureTimeZone},
      CanLeaveFeedback: ${values.canLeaveFeedback},
      HasCustomMappings: ${values.hasCustomMappings},
      HasCustomStatuses: ${values.hasCustomStatuses},
      HasInventoryLevels: ${values.hasInventoryLevels},
      AccountConnection: {
          Name: '${values.name || "Order Source Name"} Connection',
          ConnectionFormSchema,
      },
      Images: {
          Logo: join(__dirname, '../../assets/{TODO: FILL ME IN}/logo.svg'),
          Icon: join(__dirname, '../../assets/{TODO: FILL ME IN/icon.svg'),
      },
      SupportedPackingSlipTemplateVersions: ${ values.packingSlipTemplate ? `[
        PackingSlipTemplateVersion.ShipStation
      ]` : '[]'}
  }
  `;
};
