import { Money } from ".";

export interface Quote {
  carrier: {
    quote: {
      id: string;
      /**
       * Quote effective information if supported by the carrier
       */
      effective?: {
        /**
         * Date Format: YYYY-MM-DD
         */
        date?: string;
      };
      /**
       * Quote expiration information if supported by the carrier
       */
      expiration?: {
        /**
         * Date Format: YYYY-MM-DD
         */
        date?: string;
      };
    };
    /**
     * Optional message supplied by the carrier about the quote
     */
    message?: string;
  };
  transit: {
    pickup: {
      /**
       * Date Format: YYYY-MM-DD
       */
      date: string;
    };
    delivery: {
      estimated: {
        days?: number;
      };
    };
  };
  charges: {
    type: "total" | "discount" | "accessorial" | "container" | "uncategorized";
    description?: string;
    amount: Money;
  }[];
}
