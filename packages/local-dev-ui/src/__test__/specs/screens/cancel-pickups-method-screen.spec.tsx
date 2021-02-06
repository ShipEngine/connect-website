import React from 'react';
import { render } from '@testing-library/react';
import CancelPickupsMethodScreen from '../../../screens/cancel-pickups-method-screen';

describe('CancelPickupsMethodScreen', () => {
  it('renders without crashing', () => {
    expect(render(<CancelPickupsMethodScreen />)).toBeTruthy();
  });
});
