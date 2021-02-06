import React from 'react';
import { render } from '@testing-library/react';
import RateShipmentMethodScreen from '../../../screens/rate-shipment-method-screen';

describe('RateShipmentMethodScreen', () => {
  it('renders without crashing', () => {
    expect(render(<RateShipmentMethodScreen />)).toBeTruthy();
  });
});
