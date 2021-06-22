import { Input } from '@shipengine/connect-sdk/lib/internal';
import * as api from '@shipengine/connect-order-source-api';
import { mapCountry } from '../input';

export function mapAddress(
  address: api.Address | undefined,
): Input.AddressWithContactInfoAndPickupLocation | undefined {
  if (!address) {
    return;
  }

  const addressLines = [
    address.address_line_1,
    address.address_line_2,
    address.address_line_3,
  ].filter((a) => a) as string[];

  const pickupLocation: Input.PickupLocation | undefined = address.pickup_location
    ? {
        relayId: address.pickup_location.relay_id,
        carrierId: address.pickup_location.carrier_id,
      }
    : undefined;

  return {
    name: address.name || '',
    addressLines,
    cityLocality: address.city || '',
    postalCode: address.postal_code,
    stateProvince: address.state_province || '',
    country: mapCountry(address.country_code),
    pickupLocation,
  };
}

export function mapNotificationItem(
  item: api.ShipmentNotificationItem,
): Input.SalesOrderPackageItem {
  let product;
  if (item.product_id) {
    product = {
      id: item.product_id,
    };
  }

  return {
    salesOrderItem: {
      // TODO Should this be required in OrderSourceAPI?
      id: item.line_item_id!,
      sku: item.sku,
      identifiers: {},
    },
    quantity: {
      value: item.quantity,
    },
    product,
  };
}

export function mapShippingCode(code: string | undefined): string | undefined {
  if (!code) {
    return;
  }

  return code.toLocaleLowerCase().replace(' ', '_');
}

export function mapNotification(notification: api.ShipmentNotification): Input.SalesOrderShipment {
  const contents: Input.SalesOrderPackageItem[] = notification.items?.map(mapNotificationItem);

  return {
    salesOrder: {
      id: notification.order_id,
      identifiers: {},
    },
    // TODO Should this be required in OrderSourceAPI?
    shipTo: mapAddress(notification.ship_to)!,
    shipDateTime: notification.ship_date ?? new Date(),
    trackingNumber: notification.tracking_number,
    contents,
    identifiers: {},
    trackingURL: notification.tracking_url,
    carrierCode: mapShippingCode(notification.carrier_code),
    carrierServiceCode: mapShippingCode(notification.carrier_service_code),
    shipFrom: mapAddress(notification.ship_from),
  };
}
