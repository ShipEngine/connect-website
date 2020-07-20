// import {
//   CarrierApp,
//   Address,
//   DeliveryService,
//   WeightUnit,
//   PickupRequestPOJO,
//   PickupService,
//   PickupShipmentPOJO,
//   PickupPackagePOJO,
// } from "@shipengine/integration-platform-sdk";
// import Suite from "../runner/suite";
// import { buildAddress } from "../factories/address";
// import { SchedulePickupOptions, PickupShipmentConfig, PickupPackageConfig } from "../runner/config";
// import { initializeTimeStamps } from '../../utils/time-stamps';
// import { getPickupServiceByName, getDeliveryServiceByName, findMatchingDeliveryServiceCountries } from './utils';
// import { buildContactInfo } from '../factories/contact-info';

// interface TestArgs {
//   title: string;
//   methodArgs: PickupRequestPOJO;
//   config: any;
// }

// export class SchedulePickup extends Suite {
//   title = "schedulePickup";

//   private pickupService?: PickupService | undefined;
//   private deliveryServices: DeliveryService[] = [];

//   private setPickupService(config: SchedulePickupOptions): void {
//     const carrierApp = this.app as CarrierApp;

//     if (config.pickupServiceName) {

//       this.pickupService = getPickupServiceByName(config.pickupServiceName, carrierApp);

//       if (!this.pickupService)
//         throw new Error(
//           `pickupServiceName: ${config.pickupServiceName} does not exist`,
//         );
//       return;
//     }

//     else {
//       // Currently just select the first available pickup service

//       if (carrierApp.pickupServices.length > 0) {
//         this.pickupService = carrierApp.pickupServices[0];
//       }
//     }
//   }

//   private setDeliveryServices(config: SchedulePickupOptions): void {
//     const carrierApp = this.app as CarrierApp;
//     let deliveryServiceNames: string[] = [];

//     if (Array.isArray(config.shipments)) {
//       deliveryServiceNames = config.shipments.map(shipment => shipment.deliveryServiceName)
//     }
//     else {
//       deliveryServiceNames = [config.shipments.deliveryServiceName];
//     }

//     if (deliveryServiceNames.length !== 0) {
//       for (let name of deliveryServiceNames) {
//         const deliveryService = getDeliveryServiceByName(name, carrierApp);

//         if (deliveryService) {
//           deliveryServiceNames.push(deliveryService.name);
//         }
//         else {
//           throw new Error(`deliveryServiceName: ${name} does not exist`);
//         }
//       }
//     }
//     // get default delivery service
//     else {
//       this.deliveryServices.push(carrierApp.deliveryServices[0]);
//     }
//   }

//   /**
//    * The logic behind the default config generation is that we need to
//    * 1. Check for a pickup service
//    * 2. Check if the user has defined custom shipments because that requires setting a delivery service
//    *    which could be invalid depending on if it's defined correctly or if they share a country between them.
//    * 3. After that it is standard config merging and then generating the request based on that.
//    */

//   buildTestArg(config: SchedulePickupOptions): TestArgs | undefined {
//     const carrierApp = this.app as CarrierApp;

//     this.setPickupService(config);

//     if (!this.pickupService) return undefined;

//     this.setDeliveryServices(config);

//     const countries = findMatchingDeliveryServiceCountries(this.deliveryServices);

//     // generate an address based on the first country that the carrier ships to or from.
//     const defaultCountry = countries.originCountries.find((country) => {
//       if (buildAddress(`${country}-from`)) {
//         return true;
//       }
//     });

//     if (!defaultCountry) return undefined;

//     const defaultAddress = buildAddress(`${defaultCountry}-from`);

//     const { tomorrowEarlyAM, tomorrow } = initializeTimeStamps(defaultAddress.timeZone);

//     // Get first packaging
//     const pickupPackageConfig: PickupPackageConfig = {
//       packagingName: carrierApp.packaging[0].name
//     }

//     const pickupShipment: PickupShipmentConfig = {
//       deliveryServiceName: carrierApp.deliveryServices[0].name,
//       metadata: {},
//       packages: [pickupPackageConfig]
//     }

//     // get default configs in place, merge with user input and then use it to populate the method args call.
//     const defaults: SchedulePickupOptions = {
//       pickupServiceName: this.pickupService.name,
//       timeWindow: {
//         startDateTime: tomorrowEarlyAM,
//         endDateTime: tomorrow
//       },
//       address: defaultAddress,
//       contact: buildContactInfo(`${defaultCountry}-from`),
//       notes: "",
//       shipments: pickupShipment
//     };

//     const whiteListKeys = Object.keys(defaults);

//     // This code is filtering any keys in the config that are not white listed
//     // and merging the values with the defaults above
//     const testParams = Object.keys(config)
//       .filter((key) => whiteListKeys.includes(key))
//       .reduce((obj, key: string) => {
//         Reflect.set(obj, key, Reflect.get(config, key));
//         return obj;
//       }, defaults);

//     const { pickupServiceName, timeWindow, address, contact, notes, shipments } = testParams;


//     let parsedShipments: PickupShipmentPOJO[] = [];
//     if (Array.isArray(shipments)) {
//       parsedShipments = shipments.map((shipment) => {
//         return generatePickupShipment(shipment, carrierApp);
//       });
//     }
//     else {
//       parsedShipments.push(generatePickupShipment(shipments, carrierApp));
//     }

//     let newShipmentPOJO: PickupRequestPOJO = {
//       pickupService: getPickupServiceByName(pickupServiceName, carrierApp) as PickupService,
//       timeWindow,
//       address,
//       contact,
//       notes,
//       shipments: parsedShipments
//     };

//     const title = config.expectedErrorMessage
//       ? `it raises an error when creating a new domestic shipment with ${Object.keys(
//         testParams,
//       )
//         .map(function (k: any) {
//           return parseTitle(testParams, k);
//         })
//         .join(", ")}`
//       : `it creates a new domestic shipment with ${Object.keys(testParams)
//         .map(function (k: any) {
//           return parseTitle(testParams, k);
//         })
//         .join(", ")}`;

//     return {
//       title,
//       methodArgs: newShipmentPOJO,
//       config
//     };
//   }

//   buildTestArgs(): Array<TestArgs | undefined> {
//     if (Array.isArray(this.config)) {
//       return this.config.map((config: SchedulePickupOptions) => {
//         return this.buildTestArg(config);
//       });
//     } else {
//       const config = this.config as SchedulePickupOptions;

//       return [this.buildTestArg(config)];
//     }
//   }

//   tests() {
//     const testArgs = this.buildTestArgs().filter(args => args !== undefined);

//     if (testArgs.length === 0) {
//       return [];
//     }
//     return testArgs.map((testArg) => {
//       return this.test(
//         testArg!.title,
//         testArg!.methodArgs,
//         testArg!.config,
//         async () => {
//           const carrierApp = this.app as CarrierApp;

//           const transaction = await this.transaction(testArg!.config);

//           carrierApp.schedulePickup &&
//             (await carrierApp.schedulePickup(transaction, testArg!.methodArgs));
//         },
//       );
//     });
//   }
// }

// function generatePickupShipment(shipment: PickupShipmentConfig, carrierApp: CarrierApp): PickupShipmentPOJO {

//   const deliveryService = getDeliveryServiceByName(shipment.deliveryServiceName, carrierApp) as DeliveryService;
//   let packages;

//   if (Array.isArray(shipment.packages)) {
//     packages = shipment.packages.map((pkg) => {
//       return generatePackage(pkg, carrierApp);
//     });
//   }
//   else {
//     packages = [generatePackage(shipment.packages, carrierApp)];
//   }

//   return {
//     deliveryService: { id: deliveryService.id },
//     metadata: shipment.metadata,
//     packages
//   }
// }

// function generatePackage(pickupPackageConfig: PickupPackageConfig, carrierApp: CarrierApp): PickupPackagePOJO {

//   return {
//     packaging: { id: getPickupServiceByName(pickupPackageConfig.packagingName, carrierApp)!.id },
//     dimensions: pickupPackageConfig.dimensions,
//     weight: pickupPackageConfig.weight,
//     metadata: pickupPackageConfig.metadata
//   }
// }


// function parseTitle(testParams: SchedulePickupOptions, key: any): string {

//   if (key === "shipFrom" || key === "shipTo") {
//     const address = Reflect.get(testParams, key) as Address;
//     return `${key}: ${address.country}`;
//   }

//   if (key === "weight") {
//     const weight = Reflect.get(testParams, key) as { unit: WeightUnit, value: number }
//     return `weightValue: ${weight.value}, weightUnit: ${weight.unit}`;
//   }

//   return `${key}: ${Reflect.get(testParams, key)}`;
// }