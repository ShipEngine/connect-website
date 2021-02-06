import React from 'react';
import { render } from '@testing-library/react';
import CreateShipmentMethodScreen from '../../../screens/create-shipment-method-screen';

describe('CreateShipmentMethodScreen', () => {
  it('renders without crashing', () => {
    expect(render(<CreateShipmentMethodScreen />)).toBeTruthy();
  });
});
