import { RedocStandalone } from "redoc";
const OpenApiSpecification = require("@shipengine/connect-order-source-api/spec");

export default function OrderSourceApi() {
  return (
    <RedocStandalone
      spec={OpenApiSpecification}
      options={{
        nativeScrollbars: true,
      }}
    />
  );
}
