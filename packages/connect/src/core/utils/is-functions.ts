import { CarrierApp, OrderApp } from '@shipengine/connect-sdk/lib/internal';

import { AppType } from '@shipengine/connect-sdk';

/**
 * Confirm object is a carrier app
 */
export function isCarrierApp(app: CarrierApp | OrderApp): app is CarrierApp {
  if (app.type === AppType.Carrier) {
    return true;
  }
  return false;
}

/**
 * Confirm object is an order app
 */
export function isOrderApp(app: CarrierApp | OrderApp): app is OrderApp {
  if (app.type === AppType.Order) {
    return true;
  }
  return false;
}
