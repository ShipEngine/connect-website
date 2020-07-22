import { mapFunctions } from './mapping/index';
import { CarrierApp } from '@shipengine/integration-platform-sdk';

export default {
  track: async (dxApp: CarrierApp, body: any) => {
    const response = await mapFunctions.handleTrackingRequest(dxApp, body);
    return response;
  },
  register: async (dxApp: CarrierApp, body: any) => {
    const response = await mapFunctions.handleRegisterRequest(dxApp, body);
    return response;
  },
  getRates: async (dxApp: CarrierApp, body: any) => {
    const response = await mapFunctions.handleGetRatesRequest(dxApp, body);
    return response;
  },
  createLabel: async (dxApp: CarrierApp, body: any) => {
    const response = await mapFunctions.handleCreateLabelRequest(dxApp, body);
    return response;
  },
  voidLabels: async (dxApp: CarrierApp, body: any) => {
    const response = await mapFunctions.handleVoidLabelsRequest(dxApp, body);
    return response;
  },
  schedulePickup: async (dxApp: CarrierApp, body: any) => {
    const response = await mapFunctions.handleSchedulePickupRequest(
      dxApp,
      body
    );
    return response;
  },
  cancelPickup: async (dxApp: CarrierApp, body: any) => {
    const response = await mapFunctions.handleCancelPickupRequest(dxApp, body);
    return response;
  },
};
