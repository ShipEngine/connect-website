import { Packaging, ServiceArea } from '@shipengine/integration-platform-sdk';
import PackageType, {
  PackageAttribute
} from '../../mapping/registry-data/external/package-type';
import {
  MappingError,
  ValidationError
} from '../../mapping/registry-data/errors';
import { RequiredProperty } from '../../mapping/registry-data/external/enums';
import { DeliveryService } from '@shipengine/integration-platform-sdk/lib/public/carriers/delivery-service';

const serviceAreaToPackageAttribute = (
  serviceArea: ServiceArea
): PackageAttribute => {
  switch (serviceArea) {
    case ServiceArea.Regional:
    case ServiceArea.Domestic:
      return PackageAttribute.Domestic;
      break;
    case ServiceArea.International:
    case ServiceArea.Global:
      return PackageAttribute.International;
      break;
    default:
      throw new MappingError(
        `unknown service area ${serviceArea}`,
        {
          fieldName: 'ServiceArea',
          value: serviceArea
        },
        'PackageAttribute'
      );
  }
};

const resolvePackageAttributes = (
  packaging: Packaging,
  services: ReadonlyArray<DeliveryService>
): PackageAttribute[] => {
  const packagingId = packaging.id;

  const distinctServiceAreas = [
    ...new Set(
      services
        .filter(service =>
          service.packaging.some(pkg => pkg.id === packagingId)
        )
        .map(service => service.serviceArea)
        .filter(area => area) as ServiceArea[]
    )
  ];

  return distinctServiceAreas.map(serviceAreaToPackageAttribute);
};

const dxToCapiSpecPackageType = (
  packaging: readonly Packaging[],
  services: ReadonlyArray<DeliveryService>
): PackageType[] => {
  const packageTypes: PackageType[] = [];
  packaging.forEach(dxPackage => {
    if (dxPackage.name.toLowerCase() === 'package') {
      throw new ValidationError(
        `PackageId ${dxPackage.id} can not be named ${dxPackage.name}`,
        'Packaging.Name',
        dxPackage.name
      );
    }

    const packageAttributes = resolvePackageAttributes(dxPackage, services);
    if (!packageAttributes || packageAttributes.length === 0) {
      throw new ValidationError(
        `Could not resolve package attribute (domestic/int'l) for PackageId ${dxPackage.id}`,
        'Packaging',
        dxPackage.id
      );
    }

    const packageType: PackageType = {
      Abbreviation: dxPackage.name, //TODO: DX does not have package abbreviation concept
      Id: dxPackage.id,
      Name: dxPackage.name,
      CarrierPackageTypeCode: dxPackage.id,
      Description: dxPackage.description,
      PackageAttributes: resolvePackageAttributes(dxPackage, services)
    };
    packageType.RequiredToShip = [];
    if (dxPackage.requiresDimensions) {
      packageType.RequiredToShip.push(RequiredProperty.Dimensions);
    }
    if (dxPackage.requiresWeight) {
      packageType.RequiredToShip.push(RequiredProperty.Weight);
    }
    packageTypes.push(packageType);
  });
  return packageTypes;
};
export { dxToCapiSpecPackageType };
