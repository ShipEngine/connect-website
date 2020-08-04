import React from 'react';
import { render } from '@testing-library/react';
import Spinner from '../../../components/spinner';

describe('Spinner', () => {
  it('renders without crashing', () => {
    expect(render(<Spinner />)).toBeTruthy();
  });
});
