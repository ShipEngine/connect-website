export interface PickupContactDetails {
  /**
   * The email address of the person who will be there for the pickup.
   */
  email: string;
  /**
   * The first name of the person who will be there for the pickup.
   */
  first_name: string;
  /**
   * The last name of the person who will be there for the pickup.
   */
  last_name?: null | string;
  /**
   * The phone number of the person who will be there for the pickup.
   */
  phone_number: string;
  /**
   * The phone extension of the person who will be there for the pickup.
   */
  phone_number_extension?: null | string;
}
