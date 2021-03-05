import { Input } from "@shipengine/connect-sdk/lib/internal";
import * as api from "@shipengine/connect-order-source-api";

export function isoDate(date: string | undefined): Date | undefined {
  if (!date) {
    return;
  }

  return new Date(date);
}

export function mapTimeRange(body: api.SalesOrdersExportRequest): Input.SalesOrderTimeRange {
  if (body.cursor) {
    const parsedCursor = JSON.parse(body.cursor) as Input.SalesOrderTimeRange;

    return parsedCursor;
  } else {
    return {
      // TODO Update the api types to reflect that these dates arrive as strings
      startDateTime: isoDate(body.criteria?.from_date_time as any),
      endDateTime: isoDate(body.criteria?.to_date_time as any),
      fieldMappings: {
        customField1: body.sales_order_field_mappings?.custom_field_1,
        customField2: body.sales_order_field_mappings?.custom_field_2,
        customField3: body.sales_order_field_mappings?.custom_field_3,
      },
    };
  }
}
