import { mapFunctions } from "./mapping/index";
import { CarrierApp } from "@shipengine/integration-platform-sdk";
import { getBasicAuthFromHeader } from "./basic-auth";

export default {
  track: async (dxApp: CarrierApp, body: any, headers: any) => {
    const auth = getBasicAuthFromHeader(headers.Authorization);
    const response = await mapFunctions.handleTrackingRequest(
      dxApp,
      body,
      auth
    );
    return response;
  },
  register: async (dxApp: CarrierApp, body: any) => {
    const response = await mapFunctions.handleRegisterRequest(dxApp, body);
    return response;
  },
  getRates: async (dxApp: CarrierApp, body: any, headers: any) => {
    const auth = getBasicAuthFromHeader(headers.Authorization);
    const response = await mapFunctions.handleGetRatesRequest(
      dxApp,
      body,
      auth
    );
    return response;
  },
  createLabel: async (dxApp: CarrierApp, body: any, headers: any) => {
    const auth = getBasicAuthFromHeader(headers.Authorization);
    const response = await mapFunctions.handleCreateLabelRequest(
      dxApp,
      body,
      auth
    );
    return response;
  },
  voidLabels: async (dxApp: CarrierApp, body: any, headers: any) => {
    const auth = getBasicAuthFromHeader(headers.Authorization);
    const response = await mapFunctions.handleVoidLabelsRequest(
      dxApp,
      body,
      auth
    );
    return response;
  },
  schedulePickup: async (dxApp: CarrierApp, body: any, headers: any) => {
    const auth = getBasicAuthFromHeader(headers.Authorization);
    const response = await mapFunctions.handleSchedulePickupRequest(
      dxApp,
      body,
      auth
    );
    return response;
  },
  cancelPickup: async (dxApp: CarrierApp, body: any, headers: any) => {
    const auth = getBasicAuthFromHeader(headers.Authorization);
    const response = await mapFunctions.handleCancelPickupRequest(
      dxApp,
      body,
      auth
    );
    return response;
  },
};
