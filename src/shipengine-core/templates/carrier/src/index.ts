
/**
 * This is the base IPaaS config object that is required for your IPaaS integration.
 */
export const config = {

  type: "order-source",

  getOrders() {

    const orderPayload = {
      page: 1,
      pages: 1,
      orders: []
    }

    return orderPayload;
  },

  services: [],
  packageType: [],
  logo: ""
}
