---
title: Tracking
---

# Tracking
Most carriers provide a way to check on the delivery status of a shipment.
The ShipEngine Connect platform provides flexibility to adapt to the various
approaches carriers use to expose this information.

## Single item API
If a carrier provides tracking information via an HTTP API, you should implement
the Track function in your app. It will accept various identifiers (like
`tracking_number`) for a single shipment, and your implementation should return
the tracking information for that shipment. This Track function will be invoked
when a user requests tracking information via a ShipEngine API.

## Bulk import

> Bulk import requires an app to be built for v4+ of Connect. See [Upgrade v2 to v4](/getting-started/v2-v4-upgrade/)

If a carrier provides tracking information via a bulk export mechanism, you can
implement the [ImportTrackingEvents](../reference/operation/ImportTrackingEvents/)
function. It will be invoked on a regular schedule by the ShipEngine platform.
By default, a separate call to the function will be made for each connection to your carrier.
However, if data for all users is included in a single download, you can
specify that the function is only invoked once per scheduled time
[customizing the scheduled job](../../getting-started/scheduled-jobs/).
When a separate call is made for each connection, the credentials associated
with the connection will be passed as input to the function. In most cases, the
credentials will include information needed to connect to an FTP server to
download files, but the actual implementation can vary depending on what the
carrier provides. You may need to add fields to your registration form or
settings form to collect additional data from shippers.
When you override `ScheduledFunction`, you have explicit control over what data
is sent as input to the `ImportTrackingEvents` function.

Your function must implement a javascript [AsyncGenerator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator).
The function should download the bulk tracking file provided by the carrier,
parse it, transform each event from the file into an ImportedTrackingEvent, and
yield each individual event via the generator.

Since functions run in an environment with constrained resources (minimal
memory and filesystem storage), and tracking files can be large, it is
recommended that you process the file and yield events as you stream it from the
source. There are javascript stream parsing libraries available for many common
formats like CSV, JSON, and XML.


An example TypeScript implementation:

```typescript
import { ImportTrackingEventsRequest, ImportedTrackingEvent, StandardizedStatusCodes } from "@shipengine/connect-carrier-api";
export async function* ImportTrackingEvents(request: ImportTrackingEventsRequest): AsyncGenerator<ImportedTrackingEvent> {
  // Obtain normalized events, and yield them one at a time
  yield {
    "tracking_info": {
      "tracking_number": "11111",
      "standardized_status_code": StandardizedStatusCodes.Delivered,
    }
  }
  yield {
    "tracking_info": {
      "tracking_number": "22222",
      "carrier_status_code": "AC",
      "standardized_status_code": StandardizedStatusCodes.Accepted,
    }
  }
}
```

## Precedence
If you implement both the `Track` function and `ImportTrackingEvents` function,
the ShipEngine platform will use the `Track` function to query for updates about
each shipment but if a tracking event is imported by `ImportTrackingEvents`,
 the `Track` function will be disabled for that shipment. The platform will
expect all future updates to that shipment to come from ImportTrackingEvents.
