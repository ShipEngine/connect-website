import { RedocStandalone } from "redoc";
import OpenApiSpecification from "@shipengine/connect-order-source-api/spec";

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
