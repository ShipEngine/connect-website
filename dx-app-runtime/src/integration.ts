import {mapFunctions} from "./mapping/index"
import {CarrierApp} from "@shipengine/integration-platform-sdk";
import { getBasicAuthFromHeader } from './basic-auth';

export default {
  track: async (dxApp: CarrierApp, body: any, headers: any) => {
    const auth = getBasicAuthFromHeader(headers.authorization);
    const response = await mapFunctions.handleTrackingRequest(dxApp, body, auth);
    return response;
  },
  register: async (dxApp: CarrierApp, body: any) => {
    const response = await mapFunctions.handleRegisterRequest(dxApp, body);
    return response;
  },
  getRates: async (dxApp: CarrierApp, body: any, headers: any) => {
    const auth = getBasicAuthFromHeader(headers.authorization);
    const response = await mapFunctions.handleGetRatesRequest(dxApp, body, auth);
    return response;
  }
}
