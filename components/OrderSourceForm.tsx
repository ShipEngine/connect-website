import * as React from "react";
import { Form } from "react-bootstrap";
import { ErrorMessage } from '@hookform/error-message';
import "bootstrap/dist/css/bootstrap.min.css";

const Required = () => {
  return <span style={{ color: "red" }}>*</span>;
};

export const OrderSourceForm = ({ register, errors }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Label>
          Brand Name: <Required />
        </Form.Label>
        <Form.Control
          {...register("name", { required: true, maxLength: 50 })}
        />
        <Form.Text className="text-muted">
          The branded name for this order source Example: 'Shopify', 'eBay',
          'Amazon Canada'.
        </Form.Text>
      </Form.Group>
    </Form>
  );
};

export const GetCode = (values): string => {
  return `{
      Id: '3440a3bf-cd22-494f-ad02-500b6cdcedb8',
      Name: '${values.name || ""}',
      SendEmail: ${true},
      CanRefresh: false,
      CanConfigureTimeZone: false,
      CanConfirmShipments: false,
      CanLeaveFeedback: true,
      HasCustomMappings: false,
      HasCustomStatuses: false,
      HasInventoryLevels: true,
      AccountConnection: {
          Name: 'Brand One Connection',
          ConnectionFormSchema,
      },
      Images: {
          Logo: join(__dirname, '../../assets/brand-one/logo.svg'),
          Icon: join(__dirname, '../../assets/brand-one/icon.svg'),
      },
      SupportedPackingSlipTemplateVersions: [PackingSlipTemplateVersion.ShipStation]
  }
  `;
};
