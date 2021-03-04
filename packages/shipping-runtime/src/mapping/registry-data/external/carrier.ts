import AccountModals from './account-modals';
import PackageType from './package-type';
import ShippingService from './shipping-service';
import ShippingOption from './shipping-option';
import CountryAssociation from './country-association';
import ConfirmationType from './confirmation-type';

export default interface Carrier {
	AccountModals?: AccountModals | null;
	PackageTypes?: PackageType[] | null;
	ShippingServices?: ShippingService[] | null;
	ShippingOptions?: ShippingOption[] | null;
	DefaultSupportedCountries?: CountryAssociation[] | null;
	DefaultLabelSizes?: ('Inches4x6' | 'Inches4x8')[] | null;
	LabelFormats?: ('PDF' | 'ZPL' | 'PNG')[] | null;
	DefaultConfirmationTypes?: ConfirmationType[] | null;
	CarrierAttributes?:
		| ('ManifestDigital' | 'ManifestPhysical' | 'Consolidator' | 'Regional')[]
		| null;
	TrackingUrl?: string | null;
	CarrierUrl?: string | null;
	Description?: string | null;
	Name: string;
	Id: string;
}
