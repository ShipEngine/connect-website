import React from 'react';
import { render } from '@testing-library/react';
import CallOutWithMessage from '../../../components/callout-with-message';

describe('CallOutWithMessage', () => {
  it('renders the given message', () => {
    const { getByText } = render(
      <CallOutWithMessage message={<span>test</span>} />,
    );
    expect(getByText(/test/i).innerHTML).toEqual('test');
  });
});
