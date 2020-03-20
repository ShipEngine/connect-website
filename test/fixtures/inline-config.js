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

  services: ["these", "services"],
  packageTypes: ["these", "package", "types"],
  logo: ""
};

module.exports = config;
