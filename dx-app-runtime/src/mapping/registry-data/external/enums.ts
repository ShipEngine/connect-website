export enum CarrierAttribute {
  ManifestDigital = 'ManifestDigital',
  ManifestPhysical = 'ManifestPhysical',
  Consolidator = 'Consolidator',
  Regional = 'Regional'
}

export enum ShippingServiceAttribute {
  Returns = 'Returns',
  MultiPackage = 'MultiPackage',
  Tracking = 'Tracking',
  ConsolidatorService = 'ConsolidatorService',
  AutomatedTrackingAllowed = 'AutomatedTrackingAllowed',
  ManifestDigital = 'ManifestDigital',
  ManifestPhysical = 'ManifestPhysical'
}

export enum SupportedLabelSize {
  Inches4x6 = 'Inches4x6',
  Inches4x8 = 'Inches4x8'
}

export enum ServiceClass {
  Unspecified = 'Unspecified',
  Ground = 'Ground',
  OneDay = 'OneDay',
  OneDayEarly = 'OneDayEarly',
  OneDayEarlyAm = 'OneDayEarlyAm',
  TwoDay = 'TwoDay',
  TwoDayEarly = 'TwoDayEarly',
  ThreeDay = 'ThreeDay'
}

export enum ServiceGrade {
  Unspecified = 'Unspecified',
  Economy = 'Economy',
  Expedited = 'Expedited',
  Overnight = 'Overnight',
  Standard = 'Standard'
}

export enum RequiredProperty {
  Weight = 'Weight',
  Dimensions = 'Dimensions'
}
