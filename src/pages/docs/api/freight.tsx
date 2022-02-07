import { RedocStandalone } from "redoc";
import OpenApiSpecification from "@shipengine/connect-freight-api/spec";

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
