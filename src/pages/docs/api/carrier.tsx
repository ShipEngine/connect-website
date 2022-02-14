import ApiLayout from "../../../layouts/api/api-layout";
const OpenApiSpecification = require("@shipengine/connect-carrier-api/spec");

export default function Carrier() {
  return (
    <ApiLayout
      title="Carrier API"
      description="This is the carrier api"
      createdAt={new Date("02/07/2022")}
      modifiedAt={new Date("02/07/2022")}
      OpenApiSpecification={OpenApiSpecification}
    ></ApiLayout>
  );
}
