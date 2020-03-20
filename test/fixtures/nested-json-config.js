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

  services: "nested/services.json",
  packageTypes: "nested/package-types.json",
  logo: ""
};

module.exports = config;
