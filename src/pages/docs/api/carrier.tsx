import { RedocStandalone } from "redoc";
const OpenApiSpecification = require("@shipengine/connect-carrier-api/spec");

export default function CarrierApi() {
  return (
    <RedocStandalone
      spec={OpenApiSpecification}
      options={{
        nativeScrollbars: true,
      }}
    />
  );
}
