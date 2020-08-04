import React from 'react';
import { render } from '@testing-library/react';
import FullPageSpinner from '../../../components/full-page-spinner';

describe('FullPageSpinner', () => {
  it('renders without crashing', () => {
    expect(render(<FullPageSpinner />)).toBeTruthy();
  });
});
