/** @description Package details */
export interface PackageType {
  Id: string;
  Name: string;
  CarrierPackageTypeCode: string;
  Description?: string;
  Abbreviation?: string;
  PackageAttributes: PackageAttribute[];
  RequiredToShip?: ('Weight' | 'Dimensions')[];
}

export enum PackageAttribute {
  International = 'International',
  Domestic = 'Domestic',
  Consolidator = 'Consolidator',
}
