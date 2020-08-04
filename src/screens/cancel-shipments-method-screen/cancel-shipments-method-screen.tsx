// Third Party
import React, { FunctionComponent } from 'react';

// Components
import MethodNotImplementedMessage from '../../components/method-not-implemented-message';

const CancelShipmenstMethodScreen: FunctionComponent = () => {
  return (
    <MethodNotImplementedMessage
      message={
        <span>
          Your app does not implement the <code>cancelShipments</code> method.{' '}
          <a
            href='https://shipenginestag.wpengine.com/docs/integration-platform/reference/methods/cancel-shipments/'
            target='_blank'
            rel='noopener noreferrer'>
            Read the documentation
          </a>{' '}
          to learn how to implement it.
        </span>
      }
    />
  );
};

export default CancelShipmenstMethodScreen;
