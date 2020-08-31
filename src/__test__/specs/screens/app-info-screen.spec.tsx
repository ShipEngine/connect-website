/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/no-test-prefixes */

import React from 'react';
import { render } from '@testing-library/react';
import AppInfoScreen from '../../../screens/app-info-screen';

xdescribe('AppInfoScreen', () => {
  it('renders without crashing', () => {
    expect(render(<AppInfoScreen />)).toBeTruthy();
  });
});
