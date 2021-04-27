import { CarrierAppMetadata } from '@shipengine/connect-carrier-api';

import { CarrierOne } from './carrier-1';
import { CarrierTwo } from './carrier-2';

export const Metadata: CarrierAppMetadata = {
  Id: '24c75604-b519-4037-a5e9-75a61103c684',
  Name: 'Carrier App Sample',
  Carriers: [CarrierOne, CarrierTwo],
};
