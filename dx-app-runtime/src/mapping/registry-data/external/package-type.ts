export default interface PackageType {
  Id: string;
  Name: string;
  CarrierPackageTypeCode: string;
  Description?: string | null;
  Abbreviation?: string | null;
  PackageAttributes: PackageAttribute[];
  RequiredToShip?: ('Weight' | 'Dimensions')[] | null;
}

export enum PackageAttribute {
  International = "International",
  Domestic = "Domestic",
  Consolidator = "Consolidator"
}
