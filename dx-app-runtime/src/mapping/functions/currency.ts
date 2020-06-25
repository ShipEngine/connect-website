import {
  Currency,
  MonetaryValuePOJO,
} from "@shipengine/integration-platform-sdk";
import { Currency as capiCurrency } from "@ipaas/capi/models";

const capiToDxCurrencyCode = (
  currencyCode: string | null | undefined
): Currency => {
  if (!currencyCode) {
    return Currency.UnitedStatesDollar;
  }
  switch (currencyCode.toUpperCase().trim()) {
    case "AUD":
      return Currency.AustralianDollar;
    case "EUR":
      return Currency.Euro;
    case "CAD":
      return Currency.CanadianDollar;
    case "GBP":
      return Currency.GreatBritishPound;
    case "NZD":
      return Currency.NewZealandDollar;
    default:
      return Currency.UnitedStatesDollar;
  }
};

const capiToDxMonetaryValue = (
  currency: capiCurrency | undefined
): MonetaryValuePOJO => {
  if (!currency) {
    return {
      currency: Currency.UnitedStatesDollar,
      value: 0,
    };
  }
  return {
    currency: capiToDxCurrencyCode(currency.currency),
    value: currency.amount,
  };
};

export { capiToDxMonetaryValue, capiToDxCurrencyCode };
