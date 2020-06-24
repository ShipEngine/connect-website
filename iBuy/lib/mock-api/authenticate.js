"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
/**
 * This is a mock implementation of a carrier's API that authenticates a user and initiates a session
 */
function authenticate(request) {
    let { account_id, account_password } = request;
    return {
        id: Buffer.from(`${account_id}${account_password}${Math.random()}`).toString("base64"),
        ip: request.origin,
        created: new Date().toISOString(),
        language: request.headers["Accept-Language"] || "en-US",
    };
}
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map