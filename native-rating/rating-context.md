---
title: Rating Context
---

# Rating Context

```TypeScript
import { Logger } from "winston";
import { GetVariables } from "./get-variables";
import { GetRates } from "./get-rates";
import { GetZone } from "./get-zone";

/** Rates request context */
export interface RatingContext {
  /** Function to get rates for given keys */
  getRates: GetRates;

  /** Function to get variables for given keys */
  getVariables: GetVariables;

  /** Function to get zone for given keys */
  getZone: GetZone;

  /** Logger that implementers can use */
  log: Logger;
};
```
