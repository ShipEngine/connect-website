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
If a carrier provides tracking information via a bulk export mechanism, you can
implement the ImportTrackingEvents function. It will be invoked on a regular
schedule by the ShipEngine platform, and a separate call will be made on behalf
of each seller who has a connection to your carrier. The input does not contain
any shipment identifiers - only the credentials associated with the connection
to the carrier. In most cases, the credentials will include information needed
to connect to an FTP server to download files, but the actual implementation
can vary depending on what the carrier provides and you may need to add fields
to your registration form or settings form to collect additional data from
sellers. Your function will be a javascript AsyncGenerator. It should download
the bulk tracking file provided by the carrier, parse it, transform each event
from the file into an ImportedTrackingEvent, and yield them via the generator.
Since functions run in an environment with constrained resources (minimal
memory and filesystem storage), and tracking files can be large, it is
recommended that you process the file as you stream it from the source.
There are javascript stream parsing libraries available for many common formats
like CSV, JSON, and XML.

## Both
If you implement both the `Track` function and `ImportTrackingEvents` function,
the ShipEngine platform will use the `Track` function to query for updates about
each shipment but if a tracking event is imported by `ImportTrackingEvents`,
 the `Track` function will be disabled for that shipment. The platform will
expect all future updates to that shipment to come from ImportTrackingEvents.
