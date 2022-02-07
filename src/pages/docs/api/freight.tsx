import { RedocStandalone } from "redoc";
const OpenApiSpecification = require("@shipengine/connect-freight-api/spec");

export default function FreightApi() {
  return (
    <RedocStandalone
      spec={OpenApiSpecification}
      options={{
        nativeScrollbars: true,
      }}
    />
  );
}
