---
hidden: true
title: rateShipment
description: rateShipment

Params:
  fields:

    - name: session
      type: object
      description: |

        An object containing session information needed to make calls to your backend API or service, such as
        a username and password or an auth token.

        The data included in this object depends on your service. You will need to
        provide the information your methods need to make calls without calling your [`connect`](./../reference/methods/connect.md)
        method.
      default: |

        An empty `session` unless you provide a `connectArgs` property.

    - name: connectArgs
      type: object
      description: |

        An object containing properties with the same names as those your defined in
        your [connection form](./../reference/forms.md#connection-form-examples). These will be used to call your
        [`connect`](./../reference/methods/connect.md) to obtain a valid `session` object before calling other methods in the test.

      default: |

        An empty `session` unless you provide a `session` property.

    - name: expectedErrorMessage
      type: string
      description: The error message that is expected when running this test.
        </br> </br>

        This property is useful in negative test cases.
        For example, you may wish to provide invalid weights and verify that the expected error message is returned.
      default: None

    - name: deliveryServiceName
      type: string
      description: |

         The name of the [delivery service](./../reference/delivery-service.md) you wish to use in this request.
      default: The name of the first domestic delivery service defined for your app.

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

        The properties and their default values are listed below. Note that these are the default values used when no `weight` parameter is specified.

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


    - name: packagingName
      type: string
      description: |

        The name of the [packaging](./../reference/packaging.md) to use for this shipment.
      default: |

        The name of the first packaging defined for the specified delivery service.
---

{% from "nunjucks/imports/reference.njk" import testParamDetails %}

## `rateShipment`
The following parameters are available for use in the `rateShipment` test. You may specify one
or more of these parameters in your `connect.config.js` file or allow the test to use the default values.

{{testParamDetails(Params.fields)}}

## Example

This is an example of using the `connect-config.js` file to customize the `rateShipment` test.

This example provides values for all parameters and uses the global `connectArgs` parameter for authentication.

```javascript
module.exports = {
  connectArgs: {
    account_email: 'user@example.com',
    account_password: 'u0G#^08Ue1G!jX$mkc1',
    agree_to_eula: true,
  },
  tests: {
    rateShipment: [
      deliveryServiceName: `Next Day Air`,
      shipFrom: {
	    name: 'John Doe',
	    phoneNumber: '111-111-1111',
        company: 'Example Corp.',
	    addressLines: [
         '4009 Marathon Blvd',
         'Suite 300'
		],
		cityLocality: 'Austin',
		stateProvince: 'TX',
		postalCode: '78756',
		country: 'US',
		isResidential: false
		},
	  shipTo: {
	    name: 'Amanda Miller',
		phoneNumber': '555-555-5555',
		addressLines: [
		  '525 S Winchester Blvd'
		],
		cityLocality: 'San Jose',
		stateProvince: 'CA',
		postalCode: '95128',
		country: 'US',
		isResidential: true
	  },
      weight: {
        value: 10,
        unit: 'lb',
      },
      shipDateTime: '2020-04-15T12:00:00-05:00',
      packagingName: 'Package'
    }
  ]
};
```




