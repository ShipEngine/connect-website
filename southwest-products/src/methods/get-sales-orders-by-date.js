const apiClient = require("../mock-api/client");
const { mapSalesOrderStatus, mapPaymentStatus, mapPaymentMethod } = require("../status-and-mappings");

/**
 * Logs in using the username and password entered on the login form
 */
async function getSalesOrdersByDate(transaction, range) {
  // STEP 1: Validation
  // Add any desired validation here

  // STEP 2: Create the data that the order's API expects
  const data = {
    operation: "retrieve_sales_orders_by_date",
    session_id: transaction.session.id,
    start_date: range.startDateTime,
    end_date: range.endDateTime
  };

  // STEP 3: Call the order source's API
  const response = await apiClient.request({ data });

  // Step 4: Create the output data that ShipEngine expects
  return { salesOrders: formatSalesOrders(response.data) };
}

function formatSalesOrders(salesOrders) {
  return salesOrders.map(salesOrder => {
    return {
      id: salesOrder.id,
      createdDateTime: salesOrder.created_at,
      status: mapSalesOrderStatus(salesOrder.status),
      paymentMethod: mapPaymentMethod(salesOrder.payment.method),
      requestedFulfillments: [
        {
          shipTo: {
            name: salesOrder.address.business_name,
            addressLines: salesOrder.address.lines,
            cityLocality: salesOrder.address.city,
            stateProvince: salesOrder.address.state,
            postalCode: salesOrder.address.postalCode,
            country: mapCountryCode(salesOrder.address.country)
          }
        }
      ],
      buyer: {
        id: salesOrder.buyer.id,
        name: salesOrder.buyer.name
      }
    }
  });
}

module.exports = getSalesOrdersByDate;
