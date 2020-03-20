"use strict";

const config = {

  type: "order-source",

  getOrders () {

    const orderPayload = {
      page: 1,
      pages: 1,
      orders: []
    };

    return orderPayload;
  },

  updateOrder () {

  },

  services: "nested/services.yaml",
  packageTypes: "nested/package-types.yaml",
  logo: ""
};

module.exports = config;
