import ApiLayout from "../../../layouts/api/api-layout";
const OpenApiSpecification = require("@shipengine/connect-order-source-api/spec");

export default function Carrier() {
  return (
    <ApiLayout
      title="Order Source API"
      description="This is the order source api"
      createdAt={new Date("02/07/2022")}
      modifiedAt={new Date("02/07/2022")}
      OpenApiSpecification={OpenApiSpecification}
    ></ApiLayout>
  );
}
