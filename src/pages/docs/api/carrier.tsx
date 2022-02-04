import { RedocStandalone } from "redoc";
import spec from "@shipengine/connect-carrier-api/spec.json";

export default function CarrierApi() {
  return (
      <RedocStandalone
        spec={spec}
        options={{
          nativeScrollbars: true,
          theme: { colors: { primary: { main: "#162948" } } },
        }}
      />
  );
}
