import { CancelPickup, CarrierApp, CreateLabel, CreateManifest, DeliveryService, FilePath, Form, GetRates, GetTracking, GetTrackingUrl, PickupService, RegisterAccount, RequestPickup, VoidLabel } from "@shipengine/ipaas-types";

/**
 * Carrier class that adds helper functions for Carrier integrations.
 */
export class Carrier {

  public type: string;
  public name: string;
  public description?: string;
  public url?: string;
  public logo: FilePath;
  public deliveryServices: DeliveryService[];
  public pickupServices: PickupService[];
  public registrationForm?: Form;
  public settingsForm?: Form;

  public requestPickup?: RequestPickup;
  public cancelPickup?: CancelPickup;
  public createLabel?: CreateLabel;
  public voidLabel?: VoidLabel;
  public getRates?: GetRates;
  public getTrackingUrl?: GetTrackingUrl;
  public getTracking?: GetTracking;
  public createManifest?: CreateManifest;
  public registerAccount?: RegisterAccount;


  public constructor(carrier: CarrierApp) {
    this.type = carrier.type;
    this.name = carrier.name;
    this.logo = carrier.logo;
    this.deliveryServices = carrier.deliveryServices as DeliveryService[];
    this.pickupServices = carrier.pickupServices as PickupService[];

    this.description = carrier.description ? carrier.description : undefined;

    this.url = carrier.url ? carrier.url : undefined;
    this.registrationForm = carrier.registrationForm ? carrier.registrationForm as Form : undefined;
    this.settingsForm = carrier.settingsForm ? carrier.settingsForm as Form : undefined;

    this.requestPickup = carrier.requestPickup ? carrier.requestPickup as RequestPickup : undefined;
    this.cancelPickup = carrier.cancelPickup ? carrier.cancelPickup as CancelPickup : undefined;

    this.createLabel = carrier.createLabel ? carrier.createLabel as CreateLabel : undefined;
    this.voidLabel = carrier.voidLabel ? carrier.voidLabel as VoidLabel : undefined;

    this.getRates = carrier.getRates ? carrier.getRates as GetRates : undefined;
    this.getTrackingUrl = carrier.getTrackingUrl ? carrier.getTrackingUrl as GetTrackingUrl : undefined;
    this.getTracking = carrier.getTracking ? carrier.getTracking as GetTracking : undefined;

    this.createManifest = carrier.createManifest ? carrier.createManifest as CreateManifest : undefined;
    this.registerAccount = carrier.registerAccount ? carrier.registerAccount as RegisterAccount : undefined;
  }
}
