import React from 'react';
import { render } from '@testing-library/react';
import CancelShipmenstMethodScreen from '../../../screens/cancel-shipments-method-screen';

describe('CancelShipmenstMethodScreen', () => {
  it('renders without crashing', () => {
    expect(render(<CancelShipmenstMethodScreen />)).toBeTruthy();
  });
});
