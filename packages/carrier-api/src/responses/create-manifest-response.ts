import { BaseResponse } from "./base-response";
import { Manifest } from "../models";

/** @description Basic structure for a response to create a manifest */
export interface CreateManifestResponse extends BaseResponse {
  transaction_id: string;
  manifests?: Manifest[];
}
