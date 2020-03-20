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

  services: "services.json",
  packageTypes: "package-types.json",
  logo: ""
};

module.exports = config;
