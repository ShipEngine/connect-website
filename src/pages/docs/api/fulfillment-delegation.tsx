import ApiLayout from "../../../layouts/api/api-layout";
const OpenApiSpecification = require("@shipengine/connect-fulfillment-provider-api/spec");

export default function Carrier() {
  return (
    <ApiLayout
      title="Fulfillment Provider API"
      description="This is the fulfillment provider api"
      createdAt={new Date("02/07/2022")}
      modifiedAt={new Date("02/07/2022")}
      OpenApiSpecification={OpenApiSpecification}
    ></ApiLayout>
  );
}
