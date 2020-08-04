import React from 'react';
import { render } from '@testing-library/react';
import ConnectMethodScreen from '../../../screens/connect-method-screen';

describe('ConnectMethodScreen', () => {
  it('renders without crashing', () => {
    expect(render(<ConnectMethodScreen />)).toBeTruthy();
  });
});
