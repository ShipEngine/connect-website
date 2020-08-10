---
hidden: true
title: createShipment_insurance
description: createShipment_insurance

Params:
  fields:
    - name: deliveryServiceName
      type: string
      description: |

         The name of the [delivery service](./../reference/delivery-service.md) you wish to use in this request.
      default: The name of the first domestic delivery service defined for your app.

    - name: label
      type: object
      description: An object representing the details of the label to be produced by this method.
      default: |

        The properties and their default values are listed below.

        Note that these are the default values used when no `label` parameter is specified.

        If a `label` parameter is specified, it must contain values for all required properties.

    - name: label.size
      type: string
      required: true
      description: |

        The size of the label. Valid values include the following:
         * `A4`- A4 sized paper ( 8.27 inches x 11.69 inches)
         * `letter` - Letter sized paper (8.5 inches by 11 inches)
         * `4x6` - Paper sized 4 inches by 6 inches
         * `4x8` - Paper sized 4 inches by 8 inches
      default: |

        The first `labelSize` found for the specified [delivery service](./../reference/delivery-service.md).

    - name: label.format
      type: string
      required: true
      description: |

        The format for the label. Valid values include the following:
        * `pdf` - Portable Document Format (PDF)
        * `zpl` - Zebra Printer Label (ZPL)
        * `png` - Portable Graphics Format (PNG)
      default: |

        The first `labelFormat` found for the specified [delivery service](./../reference/delivery-service.md).

    - name: label.referenceFields
      type: string[]
      required: false
      description: |
        Some carriers provide general-purpose fields on their labels for custom text.
        This is sometimes used for messages, like "Thank you for shopping with us!",
        or may be used to store reference data, such as account numbers, warehouse codes, etc.

        The exact location on the label depends on the carrier, as does the allowed number of fields
        and the maximum length of each field. If more fields are specified than are supported by the
        carrier, then the extra fields should be ignored. Likewise, if a field length exceeds the
        carrier's maximum length, then it should be truncated. The *actual* values that are used
        should be returned, so the caller can detect any differences.

        NOTE: These fields should NOT be used to set *named* fields on the label,
        such as "RMA Number" or "Order ID". Those should be set using the correspond
        properties of the shipment.
      default: None

    - name: shipFrom
      type: |

        [AddressWithContactInfo](./../reference/address.md)

      description: |

        The address to ship _from_ in the test. Be sure to include the additional contact info properties.
      default: |

        A valid domestic address based on the `originCountries` and `destinationCountries` of the delivery service.

        Note that this is the default value used when no `shipFrom` parameter is specified.

        If a `shipFrom` parameter is specified, it must contain values for all required properties.
      required: true

    - name: shipTo
      type: |

        [AddressWithContactInfo](./../reference/address.md)

      description: |

        The address to ship _to_ in the test. Be sure to include the additional contact info properties.
      default: |

        A valid domestic address based on the `originCountries` and `destinationCountries` of the delivery service.

        Note that this is the default value used when no `shipTo` parameter is specified.

        If a `shipTo` parameter is specified, it must contain values for all required properties.

      required: true

    - name: weight
      type: object
      description: The weight to use for the shipment.
      default: |

        The properties and their default values are listed below.

        Note that these are the default values used when no `weight` parameter is specified.

        If a `weight` parameter is specified, it must contain values for all required properties.

    - name: weight.unit
      type: string
      description: |

        The unit of measure for this weight. Valid values include the following:
        * `g` - grams
        * `oz` - ounces
        * `kg` - kilograms
        * `lb` - pounds

      default: |

        `lb`

    - name: weight.value
      type: number
      description: The value for this weight.
      default: |

        `50`

    - name: shipDateTime
      type: |

       [DateTime](./../reference/date-time.md), </br>
       [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), </br>
       or a string representing the date and time in [ISO](https://www.w3.org/TR/NOTE-datetime) format.

      description: The date/time that the package is expected to ship. This is not guaranteed to be in the future.
      default: |

        The following date at `noon` in the local time zone.

    - name: deliveryConfirmationName
      type: string
      description: |

        The name of the [delivery confirmation](./../reference/delivery-confirmation.md) to use for this shipment.
      default: |

        The name of the first delivery confirmation defined for the specified delivery service, or `undefined` if no
        delivery confirmations are supported for the selected delivery service.

    - name: packagingName
      type: string
      description: |

        The name of the [packaging](./../reference/packaging.md) to use for this shipment.
      default: The name of the first packaging defined for the specified delivery service.

    - name: packageInsuredValue
      type: object
      description: An object representing the insured value for the package.
      default: |

        The properties and their default values are listed below.

        Note that these are the default values used when no `packageInsuredValue` parameter is specified.

        If a `packageInsuredValue` parameter is specified, it must contain values for all required properties.

    - name: packageInsuredValue.value
      type: number
      description: The value of the insured amount.
      default: |

        `50`

    - name: packageInsuredValue.currency
      type: string
      description: The currency for the insured amount.
      default: |

        `USD`



---

{% from "nunjucks/imports/reference.njk" import testParamDetails %}

### `createShipment_insurance` Parameters
The following parameters are available for use in the `createShipment_insurance` test. You may specify one
or more of these parameters in your `shipengine.config` file or allow the test to use the default values.

{{testParamDetails(Params.fields)}}



