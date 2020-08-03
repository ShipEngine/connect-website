---
hidden: true
layout: nunjucks/layouts/object-page.njk
title: DateTime object
name: DateTime

description: An object that represents a date and time in a particular time zone.

documentation: |
  DateTime objects are used throughout the ShipEngine Integration Platform. Your app will almost certainly need to access or return DateTime objects. Examples include the delivery date and time and the date and time of a particular shipment tracking event.

  Each DateTime object has properties for the date/time string as well as a timezone string that holds either the UTC offset (e.g. "+05:30") or [IANA time zone] (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g. "America/Los_Angeles", "Asia/Tokyo").

fields:
  - name: value
    type: string
    required: true
    description: The date and time, without a time zone (e.g. "2005-09-23T17:30:00")

  - name: timeZone
    type: string
    required: true
    description: |
      The time zone represented as either the UTC offset (e.g. "+05:30") or [IANA time zone](https\:\/\/en.wikipedia.org\/wiki\/List_of_tz_database_time_zones) (e.g. "America/Los_Angeles", "Asia/Tokyo")
---


Examples
-------------------------------------------------
Here's an example datetime object that uses the UTC offset for the `timezone`:

```javascript
{
  value: "2020-09-24T17:30:00",
  timezone: "America/Los_Angeles"
}
```

And here's an example that uses the IANA time zone for the timezone.

```javascript
{
  value: "2020-09-24T17:30:00",
  timezone: "+05:30"
}
```
