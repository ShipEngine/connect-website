import React from 'react';
import { render } from '@testing-library/react';
import CreateManifestMethodScreen from '../../../screens/create-manifest-method-screen';

describe('CreateManifestMethodScreen', () => {
  it('renders without crashing', () => {
    expect(render(<CreateManifestMethodScreen />)).toBeTruthy();
  });
});
