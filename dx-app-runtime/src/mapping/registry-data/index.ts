import ExternalSpec from './external/external-spec';
import CarrierSpecification from './external/carrier';
import ConfirmationType, {
  ConfirmationTypeType,
} from './external/confirmation-type';
import DiagnosticRoutes from './external/diagnostic-routes';
import ShippingServiceSpecification from './external/shipping-service';
import ProviderFunction from './external/function';
import CountryAssociation from './external/country-association';
import {
  CarrierAttribute,
  RequiredProperty,
  ServiceClass,
  ServiceGrade,
  ShippingServiceAttribute,
  SupportedLabelSize,
} from './external/enums';
import {
  Country,
  DeliveryConfirmation,
  DeliveryConfirmationType,
  DeliveryService,
  DeliveryServiceClass,
  DeliveryServiceGrade,
  DocumentFormat,
  DocumentSize,
  ServiceArea,
  ManifestType,
} from '@shipengine/integration-platform-sdk';
import {
  CarrierApp
} from '@shipengine/integration-platform-sdk/lib/internal'
import logger from '../../util/logger';
import ShippingProviderConnector from './external/shipping-provider-connector';
import { InvalidInput } from '../../errors';
import { LabelFormat } from '@ipaas/capi/models';
import { dxToCapiSpecPackageType } from '../../routes/loader-data/package-type';

const defaultDiagnosticRoutes: DiagnosticRoutes = {
  Liveness: 'diagnostics/heartbeat',
  Readiness: 'diagnostics/heartbeat',
  Version: 'diagnostics/version',
};

const mapConnectorModule = (app: CarrierApp): ShippingProviderConnector => {
  return {
    ApiVersion: '1.12',
    ConnectorUrl: 'https://nothing.sslocal.com',
    Functions: mapFunctions(app),
    DiagnosticRoutes: defaultDiagnosticRoutes,
  };
};

const mapFunctions = (app: CarrierApp): ProviderFunction[] => {
  const functions: ProviderFunction[] = [];
  if (typeof app.cancelPickups === 'function') {
    functions.push({
      Name: 'CancelPickup',
      IsSandboxed: false,
    });
  }

  if (typeof app.createShipment === 'function') {
    functions.push({
      Name: 'CreateLabel',
      IsSandboxed: false,
    });
  }

  if (typeof app.createManifest === 'function') {
    functions.push({
      Name: 'CreateManifest',
      IsSandboxed: false,
    });
  }
  if (typeof app.rateShipment === 'function') {
    functions.push({
      Name: 'GetRates',
      IsSandboxed: false,
    });
  }

  if (typeof app.connect === 'function') {
    functions.push({
      Name: 'Register',
      IsSandboxed: false,
    });
  }
  if (typeof app.schedulePickup === 'function') {
    functions.push({
      Name: 'SchedulePickup',
      IsSandboxed: false,
    });
  }
  if (typeof app.trackShipment === 'function') {
    functions.push({
      Name: 'Track',
      IsSandboxed: false,
    });
  }
  if (typeof app.cancelShipments === 'function') {
    functions.push({
      Name: 'VoidLabels',
      IsSandboxed: false,
    });
  }
  return functions;
};

const mapCarrierAttributes = (carrier: CarrierApp): CarrierAttribute[] => {
  const carrierAttributes: CarrierAttribute[] = [];
  if (carrier.manifestType === ManifestType.Digital) {
    carrierAttributes.push(CarrierAttribute.ManifestDigital);
  }
  if (carrier.manifestType === ManifestType.Physical) {
    carrierAttributes.push(CarrierAttribute.ManifestPhysical);
  }
  if (carrier.isConsolidator) {
    carrierAttributes.push(CarrierAttribute.Consolidator);
  }
  if (carrier.serviceArea === ServiceArea.Regional) {
    carrierAttributes.push(CarrierAttribute.Regional);
  }
  return carrierAttributes;
};

const mapCountries = (countries: readonly Country[]): CountryAssociation[] => {
  const countryAssociations: CountryAssociation[] = [];
  countries.forEach((country) => {
    const countryAssociation: CountryAssociation = {
      FromCountry: country.toString(),
    };
    countryAssociations.push(countryAssociation);
  });
  return countryAssociations;
};

const mapShippingServiceAttributes = (
  service: DeliveryService
): ShippingServiceAttribute[] => {
  const shippingServiceAttributes: ShippingServiceAttribute[] = [];
  if (service.supportsReturns) {
    shippingServiceAttributes.push(ShippingServiceAttribute.Returns);
}
  if (service.allowsMultiplePackages) {
    shippingServiceAttributes.push(ShippingServiceAttribute.MultiPackage);
  }
  if (service.isTrackable) {
    shippingServiceAttributes.push(ShippingServiceAttribute.Tracking);
  }
  if (service.isConsolidationService) {
    shippingServiceAttributes.push(
      ShippingServiceAttribute.ConsolidatorService
    );
  }
  if (service.manifestType === ManifestType.Digital) {
    shippingServiceAttributes.push(ShippingServiceAttribute.ManifestDigital);
  }
  if (service.manifestType === ManifestType.Physical) {
    shippingServiceAttributes.push(ShippingServiceAttribute.ManifestPhysical);
  }
  return shippingServiceAttributes;
};
const mapSupportedLabelSize = (
  documentSizes: readonly DocumentSize[]
): SupportedLabelSize[] => {
  const supportedLabelSizes: SupportedLabelSize[] = [];
  documentSizes.forEach((documentSize: DocumentSize) => {
    switch (documentSize) {
      case DocumentSize.Inches4x6:
        supportedLabelSizes.push(SupportedLabelSize.Inches4x6);
        break;
      case DocumentSize.Inches4x8:
      case DocumentSize.Letter: // TODO: Look into whether or not this was the correct way to handle this mapping
        supportedLabelSizes.push(SupportedLabelSize.Inches4x8);
        break;
      case DocumentSize.A4:
      default: {
        throw new InvalidInput(
          `${documentSize} is not a supported document size`
        );
      }
    }
  });
  return supportedLabelSizes;
};

const mapClass = (deliveryServiceClass: DeliveryServiceClass): ServiceClass => {
  switch (deliveryServiceClass) {
    case DeliveryServiceClass.Ground:
      return ServiceClass.Ground;
    case DeliveryServiceClass.OneDay:
      return ServiceClass.OneDay;
    case DeliveryServiceClass.OneDayEarly:
      return ServiceClass.OneDayEarly;
    case DeliveryServiceClass.OneDayEarlyAm:
      return ServiceClass.OneDayEarlyAm;
    case DeliveryServiceClass.TwoDay:
      return ServiceClass.TwoDay;
    case DeliveryServiceClass.TwoDayEarly:
      return ServiceClass.TwoDayEarly;
    case DeliveryServiceClass.ThreeDay:
      return ServiceClass.ThreeDay;
    default:
      return ServiceClass.Unspecified;
  }
};

const mapGrade = (deliveryServiceGrate: DeliveryServiceGrade): ServiceGrade => {
  switch (deliveryServiceGrate) {
    case DeliveryServiceGrade.Economy:
      return ServiceGrade.Economy;
    case DeliveryServiceGrade.Expedited:
      return ServiceGrade.Expedited;
    case DeliveryServiceGrade.Overnight:
      return ServiceGrade.Overnight;
    case DeliveryServiceGrade.Standard:
      return ServiceGrade.Standard;
    default:
      return ServiceGrade.Unspecified;
  }
};

function dxToCapiConfirmationType(
  type: DeliveryConfirmationType
): ConfirmationTypeType {
  switch (type) {
    case DeliveryConfirmationType.Delivery:
      return ConfirmationTypeType.Delivery;
    case DeliveryConfirmationType.Signature:
      return ConfirmationTypeType.Signature;
    case DeliveryConfirmationType.AdultSignature:
      return ConfirmationTypeType.AdultSignature;
    case DeliveryConfirmationType.DirectSignature:
      return ConfirmationTypeType.DirectSignature;
    default:
      logger.info(`defaulting unknown type ${type} to 'none'`);
  }

  return ConfirmationTypeType.None;
}

const mapConfirmationTypes = (
  deliveryConfirmations: readonly DeliveryConfirmation[]
): ConfirmationType[] => {
  const confirmationTypes: ConfirmationType[] = [];
  deliveryConfirmations.forEach((deliveryConfirmation) => {
    const confirmationType: ConfirmationType = {
      Name: deliveryConfirmation.name,
      Type: dxToCapiConfirmationType(deliveryConfirmation.type),
    };
    // TODO: Cannot map confirmation type Id
    // TODO: Cannot map confirmation description
    confirmationTypes.push(confirmationType);
  });
  return confirmationTypes;
};

const mapRequiredProperties = (
  service: DeliveryService
): RequiredProperty[] => {
  const requiredProperties: RequiredProperty[] = [];
  if (service.requiresWeight) {
    requiredProperties.push(RequiredProperty.Weight);
  }
  if (service.requiresDimensions) {
    requiredProperties.push(RequiredProperty.Dimensions);
  }
  return requiredProperties;
};

const isInternationalService = (service: DeliveryService): boolean => {
  return (
    service.serviceArea === ServiceArea.International ||
    service.serviceArea === ServiceArea.Global
  );
};

const mapShippingService = (
  service: DeliveryService
): ShippingServiceSpecification => {
  const shippingService: ShippingServiceSpecification = {
    Id: service.id,
    Name: service.name,
    Abbreviation: service.name?.substring(0, 4), // This is not sent to us, since there is no product layer that can update this, we will initialize it to be a substring
    SupportedCountries: mapCountries(service.countries),
    Code: service.code,
    LabelCode: undefined, // TODO: Update dx spec to use label code.
    ServiceAttributes: mapShippingServiceAttributes(service),
    SupportedLabelSizes: mapSupportedLabelSize(service.labelSizes),
    Class: mapClass(service.class),
    Grade: mapGrade(service.grade),
    ConfirmationTypes: mapConfirmationTypes(service.deliveryConfirmations),
    International: isInternationalService(service),
    RequiredProperties: mapRequiredProperties(service),
  };

  return shippingService;
};

const mapDeliveryServices = (
  services: readonly DeliveryService[]
): ShippingServiceSpecification[] => {
  const shippingServices: ShippingServiceSpecification[] = [];
  services.forEach((service) => {
    shippingServices.push(mapShippingService(service));
  });
  return shippingServices;
};

const mapLabelFormats = (
  documentFormats: ReadonlyArray<DocumentFormat>
): LabelFormat[] => {
  const formats: LabelFormat[] = [];
  documentFormats.forEach((documentFormat) => {
    switch (documentFormat) {
      case DocumentFormat.PDF:
        formats.push(LabelFormat.PDF);
        break;
      case DocumentFormat.ZPL:
        formats.push(LabelFormat.ZPL);
        break;
      case DocumentFormat.PNG:
        formats.push(LabelFormat.PNG);
        break;
    }
  });
  return formats;
};

const dxToCarrierSpecification = (app: CarrierApp): CarrierSpecification => {
  if (!app) {
    throw new InvalidInput('Unable to map null CarrierApp');
  }
  const carrierSpecification: CarrierSpecification = {
    Id: app.id,
    Name: app.name,
    ShippingOptions: [], // This needs to be moved to the service level
    AccountModals: {
      RegistrationFormSchema: {
        formSchema: {
          jsonSchema: app.connectionForm?.dataSchema,
          uiSchema: JSON.stringify(app.connectionForm?.uiSchema),
        },
      },
      SettingsFormSchema: {
        formSchema: {
          jsonSchema: app.settingsForm?.dataSchema,
          uiSchema: JSON.stringify(app.settingsForm?.uiSchema),
        },
      },
    },
    CarrierAttributes: mapCarrierAttributes(app),
    CarrierUrl: app.websiteURL?.toString(),
    TrackingUrl: '', // app.getTrackingURL({id: ''}, {}).toString(), // TODO tracking url
    ShippingServices: app.deliveryServices
      ? mapDeliveryServices(app.deliveryServices)
      : [],
    PackageTypes: app.packaging
      ? dxToCapiSpecPackageType(app.packaging, app.deliveryServices)
      : [],
    LabelFormats: app.labelFormats ? mapLabelFormats(app.labelFormats) : [],
    DefaultLabelSizes: app.labelSizes
      ? mapSupportedLabelSize(app.labelSizes)
      : [],
  };
  return carrierSpecification;
};

export default (app: CarrierApp): ExternalSpec => {
  const provider: ExternalSpec = {
    Id: '', //app-id is provided by DX WebAPI
    Name: app.name,
    Carriers: [dxToCarrierSpecification(app)],
    Connector: mapConnectorModule(app),
  };
  return provider;
};
