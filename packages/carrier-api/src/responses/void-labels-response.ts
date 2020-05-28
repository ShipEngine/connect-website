import { BaseResponse } from "./base-response";

export interface VoidLabelsResponse extends BaseResponse {
  /**
   * A request to void a particular label.
   */
  void_responses: Array<null | VoidResponse>;
}

export interface VoidResponse {
  /**
   * A list of errors preventing this label from being voided. If no errors are returned the
   * void is considered successful. If any errors are returned the void is considered failed.
   */
  errors?: string[] | null;
  /**
   * User facing text describing the void process. May be left blank to present a default
   * value.
   */
  message?: null | string;
  /**
   * This unique identifier should be related to the void_request_id in the VoidLabelsRequest.
   */
  void_request_id: string;
}
