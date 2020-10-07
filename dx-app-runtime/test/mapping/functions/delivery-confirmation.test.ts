import { Confirmation } from "@ipaas/capi";
import { DeliveryConfirmationType } from "@shipengine/connect-sdk";
import { mapConfirmation } from '../../../src/mapping/functions/delivery-confirmation';


describe('Delivery Confirmation', () => {
    describe('when the confirmation type is undefined', () => {
        it('it maps to undefined', () => expect(mapConfirmation(undefined)).toBe(undefined));
    });

    describe('when the confirmation type is null', () => {
        it('it maps to undefined', () => expect(mapConfirmation(null)).toBe(undefined));
    });

    describe('when the confirmation type is an unsupported type', () => {
        it('it maps to undefined', () => expect(mapConfirmation('garbage' as Confirmation)).toBe(undefined));
    });
    
    describe('when the confirmation type is a supported value', () => {
        it('it maps properly for None', () => expect(mapConfirmation(Confirmation.None)).toBe(DeliveryConfirmationType.None));
        it('it maps properly for AdultSignature', () => expect(mapConfirmation(Confirmation.AdultSignature)).toBe(DeliveryConfirmationType.AdultSignature));
        it('it maps properly for Delivery', () => expect(mapConfirmation(Confirmation.Delivery)).toBe(DeliveryConfirmationType.Delivery));
        it('it maps properly for DirectSignature', () => expect(mapConfirmation(Confirmation.DirectSignature)).toBe(DeliveryConfirmationType.DirectSignature));
        it('it maps properly for Signature', () => expect(mapConfirmation(Confirmation.Signature)).toBe(DeliveryConfirmationType.Signature));
    })
})