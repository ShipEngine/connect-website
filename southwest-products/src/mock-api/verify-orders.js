/**
 * This is a mock implementation of a carrier's API that generates a label for a shipment
 */
function verifyOrders(request) {

  return request.sales_order_ids.map((sales_order_id) => {

    const response = {
      sales_order_id: sales_order_id,
      succeeded: Math.random() >= 0.1
    };

    if(!response.succeeded) {
      response.reason_for_failure = "Unable to process order id";
    }

    return response;
  });
}

module.exports = {
  verifyOrders
}
