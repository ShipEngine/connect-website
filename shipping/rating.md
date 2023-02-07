---
title: Rating
---

# Rating

There are two ways a carrier can provide rates for a shipment. The simplest way is to implement the [GetRates](/shipping/reference/operation/GetRates/) method of the Carrier API app. This method can be used to make a request to the carrier's rating API, if it has one, or to calculate rates locally. This approach works well when the rating logic and data will not change often. If the data does change often, or if separate rate cards are needed for different customers, it can be challenging to manage using this method.

In that scenario, the carrier can use the alternate method of providing rates which is to use the [Native Rating](/native-rating/) system. It is not as simple to set up, but it allows much more control over the logic and data and can be customized per seller.
