import { RedocStandalone } from "redoc";
import OpenApiSpecification from "@shipengine/connect-carrier-api/spec";

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
