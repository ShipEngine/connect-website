"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCountryCode = exports.mapPaymentMethod = exports.mapSalesOrderStatus = exports.paymentMethod = exports.paymentStatus = exports.orderStatus = void 0;
const connect_1 = require("@shipengine/connect");
exports.orderStatus = ["payment_needed", "in_transit", "on_hold", "completed", "cancelled"];
exports.paymentStatus = ["payment_needed", "processing", "paid", "failed_payment", "cancelled"];
exports.paymentMethod = ["cash", "cc", "transfer_from_bank"];
function mapSalesOrderStatus(status) {
    const statusMapping = {
        "payment_needed": connect_1.SalesOrderStatus.AwaitingPayment,
        "in_transit": connect_1.SalesOrderStatus.AwaitingShipment,
        "on_hold": connect_1.SalesOrderStatus.OnHold,
        "completed": connect_1.SalesOrderStatus.Completed,
        "cancelled": connect_1.SalesOrderStatus.Cancelled
    };
    return statusMapping[status];
}
exports.mapSalesOrderStatus = mapSalesOrderStatus;
function mapPaymentMethod(status) {
    const statusMapping = {
        "cash": connect_1.PaymentMethod.Cash,
        "cc": connect_1.PaymentMethod.CreditCard,
        "transfer_from_bank": connect_1.PaymentMethod.BankTransfer
    };
    return statusMapping[status];
}
exports.mapPaymentMethod = mapPaymentMethod;
function mapCountryCode(status) {
    const statusMapping = {
        "US": connect_1.Country.UnitedStates,
        "MX": connect_1.Country.Mexico,
        "CA": connect_1.Country.Canada
    };
    return statusMapping[status];
}
exports.mapCountryCode = mapCountryCode;
//# sourceMappingURL=status-and-mappings.js.map