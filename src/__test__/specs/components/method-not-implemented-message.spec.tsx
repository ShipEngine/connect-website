import React from 'react';
import { render } from '@testing-library/react';
import MethodNotImplementedMessage from '../../../components/method-not-implemented-message';

describe('MethodNotImplementedMessage', () => {
  it('renders the given message', () => {
    const { getByText } = render(
      <MethodNotImplementedMessage message={<span>test</span>} />,
    );
    expect(getByText(/test/i).innerHTML).toEqual('test');
  });
});
