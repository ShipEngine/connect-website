import React from 'react';
import { render } from '@testing-library/react';
import AppInfoScreen from '../../../screens/app-info-screen';

describe('AppInfoScreen', () => {
  it('renders without crashing', () => {
    expect(render(<AppInfoScreen />)).toBeTruthy();
  });
});
