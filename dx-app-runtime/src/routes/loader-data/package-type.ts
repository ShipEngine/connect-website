import {
	Packaging,
	ServiceArea,
	ValidationError,
} from '@shipengine/connect-sdk';
import PackageType, {
	PackageAttribute,
} from '../../mapping/registry-data/external/package-type';
import { RequiredProperty } from '../../mapping/registry-data/external/enums';
import { DeliveryService } from '@shipengine/connect-sdk/lib/public/carriers/delivery-service';

const serviceAreaToPackageAttribute = (
	serviceArea: ServiceArea,
): PackageAttribute => {
	switch (serviceArea) {
		case ServiceArea.Regional:
		case ServiceArea.Domestic:
			return PackageAttribute.Domestic;
		case ServiceArea.International:
		case ServiceArea.Global:
			return PackageAttribute.International;
		default:
			throw new ValidationError(`Unsupported service area ${serviceArea}`);
	}
};

const resolvePackageAttributes = (
	packaging: Packaging,
	services: ReadonlyArray<DeliveryService>,
): PackageAttribute[] => {
	const packagingId = packaging.id;

	const distinctServiceAreas = [
		...new Set(
			services
				.filter((service) =>
					service.packaging.some((pkg) => pkg.id === packagingId),
				)
				.map((service) => service.serviceArea)
				.filter((area) => area) as ServiceArea[],
		),
	];

	return distinctServiceAreas.map(serviceAreaToPackageAttribute);
};

const getAbbreviation = (name: string) : string => {
	if(name.length < 20) {
		return name;
	}
	return name.substr(0, 20);
}

const dxToCapiSpecPackageType = (
	packaging: readonly Packaging[],
	services: ReadonlyArray<DeliveryService>,
): PackageType[] => {
	const packageTypes: PackageType[] = [];
	packaging.forEach((dxPackage) => {
		if (dxPackage.name.toLowerCase() === 'package') {
			throw new ValidationError(
				`PackageId ${dxPackage.id} can not be named ${dxPackage.name}`,
			);
		}

		const packageAttributes = resolvePackageAttributes(dxPackage, services);
		if (!packageAttributes || packageAttributes.length === 0) {
			throw new ValidationError(
				`Could not resolve package attribute (domestic/int'l) for PackageId ${dxPackage.id}`,
			);
		}

		const packageType: PackageType = {
			Abbreviation: getAbbreviation(dxPackage.name),
			Id: dxPackage.id,
			Name: dxPackage.name,
			CarrierPackageTypeCode: dxPackage.id,
			Description: dxPackage.description,
			PackageAttributes: resolvePackageAttributes(dxPackage, services),
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
