import React from 'react';
import { render } from '@testing-library/react';
import SchedulePickupMethodScreen from '../../../screens/schedule-pickup-method-screen';

describe('SchedulePickupMethodScreen', () => {
  it('renders without crashing', () => {
    expect(render(<SchedulePickupMethodScreen />)).toBeTruthy();
  });
});
