import ConfirmationTypes from './confirmation-type';
import CountryAssociation from './country-association';
export default interface ShippingService {
  ConfirmationTypes?: ConfirmationTypes[] | null;
  ServiceAttributes?:
    | (
        | 'Returns'
        | 'MultiPackage'
        | 'Tracking'
        | 'ConsolidatorService'
        | 'AutomatedTrackingAllowed'
        | 'ManifestDigital'
        | 'ManifestPhysical'
      )[]
    | null;
  SupportedCountries?: CountryAssociation[] | null;
  SupportedLabelSizes?: ('Inches4x6' | 'Inches4x8')[] | null;
  RequiredProperties?: ('Weight' | 'Dimensions')[] | null;
  Grade?: 'Unspecified' | 'Economy' | 'Expedited' | 'Overnight' | 'Standard';
  Class?:
    | 'Unspecified'
    | 'Ground'
    | 'OneDay'
    | 'OneDayEarly'
    | 'OneDayEarlyAm'
    | 'TwoDay'
    | 'TwoDayEarly'
    | 'ThreeDay';
  LabelCode?: string | null;
  International?: boolean | null;
  Code: string;
  Abbreviation?: string | null;
  Name: string;
  Id: string;
}
