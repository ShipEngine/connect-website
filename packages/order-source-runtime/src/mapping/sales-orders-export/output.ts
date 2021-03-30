import { Output } from "@shipengine/connect-sdk/lib/internal";
import { RequestedFulfillmentExtensions as OutputRequestedFulfillmentExtensions } from "@shipengine/connect-sdk/lib/public/orders/requested-fulfillment";
import { mapAddress, mapName, ignoreEmpty } from "../output";
import * as api from "@shipengine/connect-order-source-api";
import logger from "../../util/logger";

// TODO I can't find the internal export for these
import {
  ChargeType,
  PaymentStatus,
  NoteType,
  DocumentType,
  DocumentFormat,
  LengthUnit,
  WeightUnit,
} from "@shipengine/connect-sdk";

export function mapProductDetails(
  identifiers?: Output.Identifiers
): api.ProductDetail[] | undefined {
  if (!identifiers) {
    return undefined;
  }

  return Object.keys(identifiers).map((key) => {
    return {
      name: key,
      value: identifiers[key],
    };
  });
}

export function mapItem(item: Output.SalesOrderItem): api.SalesOrderItem {
  const mappedItem: api.SalesOrderItem = {
    line_item_id: item.id,
    description: item.description,
    quantity: item.quantity.value,
    unit_price: item.unitPrice.value,
    product: {
      name: item.name,
      product_id: item.product.id,
      identifiers: {
        sku: item.product.sku,
        asin: item.product.asin,
        upc: item.product.upc,
        fulfillment_sku: item.product.fulfillmentSku,
        isbn: item.product.isbn,
        inventory_id: item.product.inventoryID,
      },
      details: mapProductDetails(item.product?.details),
      urls: {
        thumbnail_url: item.thumbnailURL?.toString(),
      },
    },
    item_url: item.itemURL?.toString(),
  };

  //this is unit weight not total items weight
  if (item.unitWeight) {
    mappedItem.product!.weight = {
      unit: mapWeightUnit(item.unitWeight.unit),
      value: item.unitWeight.value,
    };
  }

  if (item.product.dimensions) {
    mappedItem.product!.dimensions = {
      length: item.product.dimensions.length,
      width: item.product.dimensions.width,
      height: item.product.dimensions.height,
      unit:
        item.product.dimensions.unit === LengthUnit.Inches
          ? api.DimensionsUnit.Inch
          : api.DimensionsUnit.Centimeter,
    };
  }

  return mappedItem;
}

export function mapWeightUnit(unit?: WeightUnit): api.WeightUnit {
  switch (unit) {
    case WeightUnit.Grams:
      return api.WeightUnit.Gram;
    case WeightUnit.Kilograms:
      return api.WeightUnit.Kilogram;
    case WeightUnit.Ounces:
      return api.WeightUnit.Ounce;
    case WeightUnit.Pounds:
      return api.WeightUnit.Pound;
    default:
      return api.WeightUnit.Ounce;
  }
}

export function mapDocument(doc: Output.Document): api.Document {
  let format;
  switch (doc.format) {
    case DocumentFormat.PDF:
      format = api.DocumentFormat.Pdf;
      break;
    case DocumentFormat.PNG:
      format = api.DocumentFormat.Png;
      break;
    case DocumentFormat.ZPL:
      format = api.DocumentFormat.Zpl;
      break;
  }

  const type = [];
  switch (doc.type) {
    case DocumentType.CustomsForm:
      type.push(api.DocumentType.CustomsForm);
      break;
    case DocumentType.Label:
      type.push(api.DocumentType.Label);
      break;
    // Are these the same, but we gave them different names? Or do our enums not match?
    case DocumentType.ScanForm:
      type.push(api.DocumentType.CommercialInvoice);
      break;
  }

  return {
    type,
    format,
    data: doc.data.toString("base64"),
  };
}

export function mapShippingPreferences(
  pref: Output.ShippingPreferences | undefined
): api.ShippingPreferences | undefined {
  if (!pref) {
    return;
  }

  // TODO: pref.deliveryConfirmationType
  return {
    deliver_by_date: pref.deliverByDate?.toISOString(),
    ship_by_date: pref.shipByDate?.toISOString(),
    shipping_service: pref.requestedShippingService,
    has_alcohol: pref.containsAlcohol,
    saturday_delivery: pref.saturdayDelivery,
    insured_value: pref.insuredValue?.value,
    is_premium_program: pref.isPremiumProgram,
    premium_program_name: pref.premiumProgramName,
    documents: (pref.documents || []).map((doc) => mapDocument(doc)),
  };
}

export function mapFulfillmentExtensions(
  extensions: OutputRequestedFulfillmentExtensions | undefined
): api.RequestedFulfillmentExtensions {
  return {
    custom_field_1: extensions?.customField1,
    custom_field_2: extensions?.customField2,
    custom_field_3: extensions?.customField3,
  };
}

export function mapRequestedFulfillment(
  fill: Output.RequestedFulfillment
): api.RequestedFulfillment {
  return {
    ship_to: mapAddress(fill.shipTo)!,
    items: fill.items.map(mapItem),
    shipping_preferences: mapShippingPreferences(fill.shippingPreferences),
    extensions: mapFulfillmentExtensions(fill.extensions),
  };
}

export function mapBuyer(buyer: Output.Buyer): api.Buyer {
  return {
    buyer_id: buyer.id,
    name: mapName(buyer.name),
    phone: buyer.phoneNumber,
    email: buyer.email,
  };
}

// The SDK sends this as an Address without contact info, it needs special mapping
export function mapBillTo(buyer: Output.Buyer): api.BillTo | undefined {
  if (!buyer.address) {
    return;
  }

  const [address_line_1, address_line_2, address_line_3, ...others] = buyer.address.addressLines;

  let residential_indicator: string | undefined;
  if (buyer.address.isResidential !== undefined) {
    residential_indicator = buyer.address.isResidential ? "R" : "C";
  }

  return {
    name: mapName(buyer.name),
    address_line_1,
    address_line_2,
    address_line_3,
    residential_indicator,
    city: buyer.address.cityLocality,
    state_province: buyer.address.stateProvince,
    postal_code: buyer.address.postalCode,
    country_code: buyer.address.country,
    company: buyer.address.company,
    email: buyer.email,
    phone: buyer.phoneNumber,
  };
}

export function mapPaymentStatus(status: PaymentStatus): api.PaymentStatus {
  switch (status) {
    case PaymentStatus.AwaitingPayment:
      return api.PaymentStatus.AwaitingPayment;
    case PaymentStatus.Paid:
      return api.PaymentStatus.Paid;
    case PaymentStatus.PaymentCancelled:
      return api.PaymentStatus.PaymentCancelled;
    case PaymentStatus.PaymentFailed:
      return api.PaymentStatus.PaymentFailed;
    case PaymentStatus.PaymentInProcess:
      return api.PaymentStatus.PaymentInProcess;
    case PaymentStatus.Other:
    default:
      return api.PaymentStatus.Other;
  }
}

export function mapPayment(order: Output.SalesOrder): api.Payment {
  const shipping_charges: api.Charge[] = [];
  const taxes: api.Charge[] = [];
  const adjustments: api.Charge[] = [];

  for (const charge of order.charges) {
    const mappedCharge: api.Charge = {
      amount: charge.amount.value,
      description: charge.name,
    };

    switch (charge.type) {
      case ChargeType.Tax:
        taxes.push(mappedCharge);
        break;
      case ChargeType.Shipping:
      case ChargeType.DeliveryConfirmation:
      case ChargeType.Duty:
      case ChargeType.Fuel:
      case ChargeType.LocationFee:
      case ChargeType.Fee:
      case ChargeType.Handling:
      case ChargeType.Pickup:
      case ChargeType.Oversize:
        shipping_charges.push(mappedCharge);
        break;
      default:
        adjustments.push(mappedCharge);
    }
  }

  return {
    payment_status: mapPaymentStatus(order.paymentStatus),
    payment_method: order.paymentMethod,
    amount_paid: order.paymentAmount?.value,
    shipping_charges,
    taxes,
    adjustments,
  };
}

export function mapNoteType(noteType: NoteType): api.NoteType {
  switch (noteType) {
    case NoteType.MessageFromBuyer:
      return api.NoteType.NotesFromBuyer;
    case NoteType.MessageToBuyer:
      return api.NoteType.NotesToBuyer;
    case NoteType.GiftMessage:
      return api.NoteType.GiftMessage;
    case NoteType.Internal:
    default:
      return api.NoteType.InternalNotes;
  }
}

export function mapNote(note: Output.Note): api.Note {
  return {
    type: mapNoteType(note.type),
    text: note.text,
  };
}

export function mapSalesOrderStatus(status: Output.SalesOrderStatus): api.SalesOrderStatus {
  switch (status) {
    case Output.SalesOrderStatus.AwaitingPayment:
      return api.SalesOrderStatus.AwaitingPayment;
    case Output.SalesOrderStatus.Cancelled:
      return api.SalesOrderStatus.Cancelled;
    case Output.SalesOrderStatus.Completed:
      return api.SalesOrderStatus.Completed;
    case Output.SalesOrderStatus.OnHold:
      return api.SalesOrderStatus.OnHold;
    case Output.SalesOrderStatus.AwaitingShipment:
    default:
      return api.SalesOrderStatus.AwaitingShipment;
  }
}

export function getSingleCurrency(order: Output.SalesOrder): string {
  // We're going to check the line item currencies first because they're the most likely to exist
  for (const fill of order.requestedFulfillments) {
    for (const item of fill.items) {
      if (item.unitPrice.currency) {
        return item.unitPrice.currency;
      }
    }
  }

  // If we didn't pick up a currency from the line items, use the currency on totalCharges
  // We don't need to provide a fallback, because totalCharges.currency already defaults to USD
  return order.totalCharges.currency;
}

export function mapSalesOrder(order: Output.SalesOrder): api.SalesOrder {
  logger.debug("Mapping order", order);

  return {
    order_id: order.id,
    order_number: ignoreEmpty(order.orderNumber),
    status: mapSalesOrderStatus(order.status),
    requested_fulfillments: order.requestedFulfillments.map(mapRequestedFulfillment),
    buyer: mapBuyer(order.buyer),
    bill_to: mapBillTo(order.buyer),
    currency: getSingleCurrency(order),
    payment: mapPayment(order),
    order_url: order.orderURL?.toString(),
    notes: order.notes.map(mapNote),
    integration_context: JSON.stringify(order.metadata),
    created_date_time: order.createdDateTime.toISOString(),
  };
}
