import {
  CarrierApp,
  OrderApp,
} from "@shipengine/connect-sdk/lib/internal";

import { AppType } from "@shipengine/connect-sdk";

export function isCarrierApp(app: CarrierApp | OrderApp): app is CarrierApp {
  if (app.type === AppType.Carrier) {
    return true;
  }
  return false;
}

export function isOrderApp(app: CarrierApp | OrderApp): app is OrderApp {
  if (app.type === AppType.Order) {
    return true;
  }
  return false;
}
