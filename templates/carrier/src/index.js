const createLable = require("./methods/create-label");
const getRates = require("./methods/get-rates");

const app = {
  id: "",
  name: "<%- pjson.name %>",
  description: "<%- pjson.description %>",
  logo: "./logo.svg",
  websiteURL: "",
  createLabel: createLabel,
  getRates: getRates,
  deliveryServices: [],
};

module.exports = app;
