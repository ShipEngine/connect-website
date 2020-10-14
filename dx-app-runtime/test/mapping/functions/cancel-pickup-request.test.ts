import { AddressResidentialIndicator, CancellationReason, Identifier } from '@ipaas/capi';
import { PickupCancellationReason } from '@shipengine/connect';
import { mapCancelPickupRequest, mapCancellationReason, identifierReducer } from '../../../src/mapping/functions/';

const expectedCancellationMappingResults: any[][] = [
  [undefined, PickupCancellationReason.Other],
  ['', PickupCancellationReason.Other],
  ['garbage', PickupCancellationReason.Other],
  [CancellationReason.CarrierFailedPickup, PickupCancellationReason.CarrierFailedPickup],
  [CancellationReason.CostTooHigh, PickupCancellationReason.Price],
  [CancellationReason.NotReady, PickupCancellationReason.NotReady],
  [CancellationReason.ServiceTooSlow, PickupCancellationReason.Schedule],
]

const fullyFormedRequest = {
  "transaction_id": "4008bc7b-6ffb-42ac-b987-15a85751e178",
  "metadata": {},
  "confirmation": {
    "confirmation_id": "CONFIRMATION_12345",
    "alternate_identifiers": [
      {
        "type": "PICKUP_CODE",
        "value": "ABC123"
      }
    ],
    "shipment_identifiers": [
      {
        "tracking_number": "TRACK1234",
        "alternate_identifiers": [
          {
            "type": "SHIPMENT_ID",
            "value": "12345"
          }
        ]
      }
    ]
  },
  "location": {
    "pickup_address": {
      "name": "John Doe",
      "first_name": "John",
      "last_name": "Doe",
      "email": "email@email.com",
      "phone_number": "555-555-5555",
      "company_name": "Shipstation",
      "address_lines": [
        "800 N Lamar Blvd",
        "#220"
      ],
      "city_locality": "Austin",
      "state_province": "TX",
      "postal_code": "78756",
      "country_code": "US",
      "address_residential_indicator": AddressResidentialIndicator.Commercial,
      "is_eu": false
    },
    "location_notes": "Kendra Scott building, second floor. Parking Validated.",
    "pickup_options": {}
  },
  "cancellation_details": {
    "reason": CancellationReason.CostTooHigh,
    "cancellation_options": {},
    "remarks": "I can't pay that much for a pickup."
  },
  "contact": {
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jdoe@email.com",
    "phone_number": "555-666-5555",
    "phone_number_extension": ""
  },
  "pickup_details": {
    "pickup_service_code": "",
    "shipments": [
      {
        "tracking_number": "cd03c247-8d06-4f08-925b-2f0d2b5dff49",
        "alternative_identifiers": [],
        "service_code": "03",
        "packages": [
          {
            "tracking_number": "cd03c247-8d06-4f08-925b-2f0d2b5dff49",
            "alternative_identifiers": [],
            "dimensions": {
              "length": 5,
              "width": 6,
              "height": 10
            },
            "package_code": "01",
            "weight": 50000
          },
          {
            "tracking_number": "cd03c247-8d06-4f08-925b-2f0d2b5dff49",
            "alternative_identifiers": [],
            "dimensions": {
              "length": 5,
              "width": 6,
              "height": 10
            },
            "package_code": "01",
            "weight": 80000
          }
        ],
        "advanced_options": {}
      },
      {
        "tracking_number": "eae6d3bc-f9dd-4237-aa04-53452791107b",
        "alternative_identifiers": [],
        "service_code": "04",
        "packages": [
          {
            "tracking_number": "eae6d3bc-f9dd-4237-aa04-53452791107b",
            "alternative_identifiers": [],
            "dimensions": {
              "length": 5,
              "width": 6,
              "height": 10
            },
            "package_code": "01",
            "weight": 50000
          },
          {
            "tracking_number": "eae6d3bc-f9dd-4237-aa04-53452791107b",
            "alternative_identifiers": [],
            "dimensions": {
              "length": 5,
              "width": 6,
              "height": 10
            },
            "package_code": "01",
            "weight": 10000
          },
          {
            "tracking_number": "eae6d3bc-f9dd-4237-aa04-53452791107b",
            "alternative_identifiers": [],
            "dimensions": {
              "length": 5,
              "width": 6,
              "height": 10
            },
            "package_code": "01",
            "weight": 10000
          }
        ],
        "advanced_options": {}
      },
      {
        "tracking_number": "eae6d3bc-f9dd-4237-aa04-53452791107b",
        "alternative_identifiers": [],
        "service_code": "03",
        "packages": [
          {
            "tracking_number": "eae6d3bc-f9dd-4237-aa04-53452791107b",
            "alternative_identifiers": [],
            "dimensions": {
              "length": 5,
              "width": 6,
              "height": 10
            },
            "package_code": "01",
            "weight": 50000
          },
          {
            "tracking_number": "eae6d3bc-f9dd-4237-aa04-53452791107b",
            "alternative_identifiers": [],
            "dimensions": {
              "length": 5,
              "width": 6,
              "height": 10
            },
            "package_code": "01",
            "weight": 10000
          },
          {
            "tracking_number": "eae6d3bc-f9dd-4237-aa04-53452791107b",
            "alternative_identifiers": [],
            "dimensions": {
              "length": 5,
              "width": 6,
              "height": 10
            },
            "package_code": "01",
            "weight": 10000
          }
        ],
        "advanced_options": {}
      }
    ]
  },
  "pickup_windows": [
    {
      "time_zone_iana": "America/Chicago",
      "pickup_date": "2019-10-11T21:21:46.261Z",
      "start_time": "2019-10-11T21:21:46.261Z",
      "end_time": "2019-10-11T21:21:46.261Z"
    }
  ],
  "custom_properties": {
    "SERVICE_AREA": "AUS"
  }
};

const fullyFormedExpectedMapping = {
  "address": {
    "addressLines": [
      "800 N Lamar Blvd",
      "#220",
    ],
    "cityLocality": "Austin",
    "company": "Shipstation",
    "country": "US",
    "email": "email@email.com",
    "isResidential": false,
    "name": "John Doe",
    "phoneNumber": "555-555-5555",
    "postalCode": "78756",
    "stateProvince": "TX",
  },
  "cancellationID": "4008bc7b-6ffb-42ac-b987-15a85751e178",
  "contact": {
    "email": "jdoe@email.com",
    "name": "Jane Doe",
    "phoneNumber": "555-666-5555",
  },
  "id": "CONFIRMATION_12345",
  "identifiers": {
    "PICKUP_CODE": "ABC123",
  },
  "metadata": {
    "SERVICE_AREA": "AUS",
  },
  "notes": [
    {
      "text": "I can't pay that much for a pickup.",
      "type": "internal",
    },
  ],
  "pickupService": "",
  "reason": "price",
  "shipments": [
    {
      "deliveryService": "03",
      "packages": [
        {
          "dimensions": {
            "height": 10,
            "length": 5,
            "unit": "cm",
            "width": 6,
          },
          "identifiers": undefined,
          "packaging": "01",
          "trackingNumber": "cd03c247-8d06-4f08-925b-2f0d2b5dff49",
          "weight": {
            "unit": "g",
            "value": 50000,
          },
        },
        {
          "dimensions": {
            "height": 10,
            "length": 5,
            "unit": "cm",
            "width": 6,
          },
          "identifiers": undefined,
          "packaging": "01",
          "trackingNumber": "cd03c247-8d06-4f08-925b-2f0d2b5dff49",
          "weight": {
            "unit": "g",
            "value": 80000,
          },
        },
      ],
      "trackingNumber": "cd03c247-8d06-4f08-925b-2f0d2b5dff49",
    },
    {
      "deliveryService": "04",
      "packages": [
        {
          "dimensions": {
            "height": 10,
            "length": 5,
            "unit": "cm",
            "width": 6,
          },
          "identifiers": undefined,
          "packaging": "01",
          "trackingNumber": "eae6d3bc-f9dd-4237-aa04-53452791107b",
          "weight": {
            "unit": "g",
            "value": 50000,
          },
        },
        {
          "dimensions": {
            "height": 10,
            "length": 5,
            "unit": "cm",
            "width": 6,
          },
          "identifiers": undefined,
          "packaging": "01",
          "trackingNumber": "eae6d3bc-f9dd-4237-aa04-53452791107b",
          "weight": {
            "unit": "g",
            "value": 10000,
          },
        },
        {
          "dimensions": {
            "height": 10,
            "length": 5,
            "unit": "cm",
            "width": 6,
          },
          "identifiers": undefined,
          "packaging": "01",
          "trackingNumber": "eae6d3bc-f9dd-4237-aa04-53452791107b",
          "weight": {
            "unit": "g",
            "value": 10000,
          },
        },
      ],
      "trackingNumber": "eae6d3bc-f9dd-4237-aa04-53452791107b",
    },
    {
      "deliveryService": "03",
      "packages": [
        {
          "dimensions": {
            "height": 10,
            "length": 5,
            "unit": "cm",
            "width": 6,
          },
          "identifiers": undefined,
          "packaging": "01",
          "trackingNumber": "eae6d3bc-f9dd-4237-aa04-53452791107b",
          "weight": {
            "unit": "g",
            "value": 50000,
          },
        },
        {
          "dimensions": {
            "height": 10,
            "length": 5,
            "unit": "cm",
            "width": 6,
          },
          "identifiers": undefined,
          "packaging": "01",
          "trackingNumber": "eae6d3bc-f9dd-4237-aa04-53452791107b",
          "weight": {
            "unit": "g",
            "value": 10000,
          },
        },
        {
          "dimensions": {
            "height": 10,
            "length": 5,
            "unit": "cm",
            "width": 6,
          },
          "identifiers": undefined,
          "packaging": "01",
          "trackingNumber": "eae6d3bc-f9dd-4237-aa04-53452791107b",
          "weight": {
            "unit": "g",
            "value": 10000,
          },
        },
      ],
      "trackingNumber": "eae6d3bc-f9dd-4237-aa04-53452791107b",
    },
  ],
  "timeWindows": [
    {
      "endDateTime": {
        "timeZone": "America/Chicago",
        "value": "2019-10-11T21:21:46",
      },
      "startDateTime": {
        "timeZone": "America/Chicago",
        "value": "2019-10-11T21:21:46",
      },
    },
  ],
};

describe('Cancel Pickup Request', () => {
  describe('Mapping Cancellation Reasons', () => {
    test.each(expectedCancellationMappingResults)('mapCancellationReason(%s) maps to %s', (reason, expected) => {
      expect(mapCancellationReason(reason)).toEqual(expected);
    });
  });

  describe('Mapping Cancel Pickup Request', () => {
    describe('when given only a transaction id', () => {
      const request = mapCancelPickupRequest({
        transaction_id: 'transaction'
      });
      it('the transaction id is set as the cancellation id', () => expect(request.cancellationID).toEqual('transaction'));
      it('the confirmation id is set to an empty string', () => expect(request.id).toEqual(''));
      it('the pickup service is set to an empty string', () => expect(request.pickupService).toEqual(''));
    });

    describe('when given a fully formed cancel pickup request', () => {
      it('maps correctly', () => expect(mapCancelPickupRequest(fullyFormedRequest)).toEqual(fullyFormedExpectedMapping));
    })
  });

  describe('Identifier Reducer', () => {
    describe('when the identifiers are fully formed', () => {
      const identifiers: Identifier[] = [
        {
          type: 'item1',
          value: 'value1'
        },
        {
          type: 'item2',
          value: 'value2'
        },
        {
          type: 'item3',
          value: 'value3'
        }
      ];
      const results = identifiers.reduce(identifierReducer, {});
      it('it properly reduces an array of identifiers into the appropriate object', () => expect(results).toEqual({ item1: 'value1', item2: 'value2', item3: 'value3' }));
    });
    describe('when the identifiers are missing a field', () => {
      const identifiers: Identifier[] = [
        {
          type: 'item1',
          value: ''
        },
        {
          type: '',
          value: 'value2'
        },
        {
          type: 'item3',
          value: 'value3'
        }
      ];
      const results = identifiers.reduce(identifierReducer, {});
      it('it properly reduces an array of identifiers into the appropriate object', () => expect(results).toEqual({ item3: 'value3' }));
    });
  });
})