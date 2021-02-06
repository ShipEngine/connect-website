import React from 'react';
import { render } from '@testing-library/react';
import TrackShipmentMethodScreen from '../../../screens/track-shipment-method-screen';

describe('TrackShipmentMethodScreen', () => {
  it('renders without crashing', () => {
    expect(render(<TrackShipmentMethodScreen />)).toBeTruthy();
  });
});
