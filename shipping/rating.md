---
title: Rating
---

# Rating

There are two different approaches to implement rating functionality in your app.

## GetRates

The most common approach is to implement the [GetRates](/shipping/reference/operation/GetRates/) method of the Carrier API. The GetRates implementation can do whatever it needs to do to calculate the rate. Usually that means calling out to an HTTP API provided by the carrier. But if the rating logic is simple enough, and does not change too often, it can be implemented directly in the GetRates method.

## Native Rating

An alternate approach is to take advantage of our [Native Rating](/native-rating/) system, which is designed to support scenarios where complex rating logic is needed and an adequate HTTP API is not available.  For example, it can manage multiple rate cards that vary per customer, and vary over time. It requires some extra implementation steps beyond just implementing a single function, but it allows much more control over the logic and data, allowing both to vary based on the customer or the time of the request (to account for rate changes, etc).
