import { RedocStandalone } from "redoc";
import spec from "@shipengine/connect-order-source-api/spec.yaml";

export default function CarrierApi() {
  return (
    <RedocStandalone
      spec={spec}
      options={{
        nativeScrollbars: true,
      }}
    />
  );
}
