"use strict";

const bodyParser = require("body-parser");

// import { deserialize } from "./serialize";

module.exports = function buildAPI(sdkApp, server) {
  // server.use(logRequest);
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.get("/", getApp);
  // server.connect && server.put("/connect", connect);

  // server.createShipment && server.put("/createShipment", createShipment);
  // server.cancelShipments && server.put("/cancelShipments", cancelShipments);
  // server.rateShipment && server.put("/rateShipment", rateShipment);
  // server.trackShipment && server.put("/trackShipment", trackShipment);
  // // server.createManifest && server.put("/createManifest", createManifest);
  // server.schedulePickup && server.put("/schedulePickup", schedulePickup);
  // server.cancelPickups && server.put("/cancelPickups", cancelPickups);
  // server.getSalesOrdersByDate &&
  //   server.put("/getSalesOrdersByDate", getSalesOrdersByDate);
  // server.shipmentCreated && server.put("/shipmentCreated", shipmentCreated);
  // server.shipmentCancelled &&
  //   server.put("/shipmentCancelled", shipmentCancelled);

  function getApp(req, res) {
    return res.status(200).json(sdkApp);
  }

  // async function connect(req, res) {
  //   try {
  //     const { transaction, connectionFormData } = deserialize(req.body);
  //     await server.connect!(transaction, connectionFormData);
  //     send(req, res, 200, { transaction });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async function createShipment(req, res) {
  //   try {
  //     let { transaction, shipment } = deserialize(req.body);
  //     shipment = await server.createShipment!(transaction, shipment);
  //     send(req, res, 200, { transaction, shipment });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async function cancelShipments(req, res) {
  //   try {
  //     const { transaction, shipments } = deserialize(req.body);
  //     const outcomes = await server.cancelShipments!(
  //       transaction,
  //       shipments,
  //     );
  //     send(req, res, 200, { transaction, outcomes });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async function rateShipment(req, res) {
  //   try {
  //     const { transaction, shipment } = deserialize(req.body);
  //     const rates = await server.rateShipment!(transaction, shipment);
  //     send(req, res, 200, { transaction, rates });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async function trackShipment(req, res) {
  //   try {
  //     const { transaction, shipment } = deserialize(req.body);
  //     const trackingInfo = await server.trackShipment!(
  //       transaction,
  //       shipment,
  //     );
  //     send(req, res, 200, { transaction, trackingInfo });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async function schedulePickup(req, res) {
  //   try {
  //     let { transaction, pickup } = deserialize(req.body);
  //     pickup = await server.schedulePickup!(transaction, pickup);
  //     send(req, res, 200, { transaction, pickup });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async function cancelPickups(req, res) {
  //   try {
  //     let { transaction, pickups } = deserialize(req.body);
  //     pickups = await server.cancelPickups!(transaction, pickups);
  //     send(req, res, 200, { transaction, pickups });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async function getSeller(req, res) {
  //   try {
  //     let { transaction, seller } = deserialize(req.body);
  //     seller = await app.getSeller(transaction, seller);
  //     send(req, res, 200, { transaction, seller });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async function getSalesOrder(req, res) {
  //   try {
  //     let { transaction, salesOrder } = deserialize(req.body);
  //     salesOrder = await app.getSalesOrder(transaction, salesOrder);
  //     send(req, res, 200, { transaction, salesOrder });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async function getSalesOrdersByDate(req, res) {
  //   try {
  //     const { transaction, range } = deserialize(req.body);
  //     const iterable = app.getSalesOrdersByDate(transaction, range);

  //     const salesOrders = [];
  //     for await (const salesOrder of iterable) {
  //       salesOrders.push(salesOrder);
  //     }

  //     send(req, res, 200, { transaction, salesOrders });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async function shipmentCreated(req, res) {
  //   try {
  //     const { transaction, shipment } = deserialize(req.body);
  //     await app.shipmentCreated(transaction, shipment);
  //     send(req, res, 200, { transaction });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async function shipmentCancelled(req, res) {
  //   try {
  //     const { transaction, shipment } = deserialize(req.body);
  //     await app.shipmentCancelled(transaction, shipment);
  //     send(req, res, 200, { transaction });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // function logRequest(req, res) {
  //   console.log(`${req.method} ${req.url}`);
  //   next();
  // }

  // function onNoMatch(req, res) {
  //   send(req, res, 404, {
  //     error: `${app.name} does not implement ${req.path}`,
  //   });
  // }

  // function onError(err, req, res) {
  //   if (err.code === "ERR_INVALID_INPUT") {
  //     send(req, res, 400, {
  //       error: err.message,
  //       code: err.code,
  //       stack: err.stack.split("\n"),
  //     });
  //   } else {
  //     send(req, res, 500, {
  //       error: err.message,
  //       code: err.code || "E_SERVER_ERROR",
  //       stack: err.stack.split("\n"),
  //     });
  //   }
  // }

  // function send(req, res, statusCode, obj) {
  //   console.log(`${req.method} ${req.path} => HTTP ${statusCode}`);
  //   const json = JSON.stringify(serialize(obj), null, 2);
  //   sendType(res, statusCode, json);
  // }
};
