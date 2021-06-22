import {
  PickupLocation as IPickupLocation,
  PickupLocationPOJO,
} from '../../../public';
import { hideAndFreeze, _internal } from '../utils';

export class PickupLocation implements IPickupLocation {
  public static readonly [_internal] = {
    label: 'name',
  };

  public readonly relayId: string;
  public readonly carrierId: string;

  public constructor(pojo: PickupLocationPOJO) {
    this.relayId = pojo.relayId || '';
    this.carrierId = pojo.carrierId || '';

    // Make this object immutable
    hideAndFreeze(this);
  }
}
