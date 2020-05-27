export default interface PackageType {
  Id: string;
  Name: string;
  CarrierPackageTypeCode: string;
  Description?: string | null;
  Abbreviation?: string | null;
  PackageAttributes?: ('International' | 'Domestic' | 'Consolidator')[] | null;
  RequiredToShip?: ('Weight' | 'Dimensions')[] | null;
}
