// Third Party
import React, { FunctionComponent } from 'react';

// Components
import CalloutWithMessage from '../../components/callout-with-message';

const CreateManifestMethodScreen: FunctionComponent = () => {
  return (
    <CalloutWithMessage
      message={
        <span>
          We are working on something awesome for this page! If you woul like to
          learn more about the <code>createManifest</code> method{' '}
          <a
            href='https://connect.shipengine.com/docs/reference/methods/create-manifest'
            target='_blank'
            rel='noopener noreferrer'>
            you can find the docs here
          </a>
          .
        </span>
      }
    />
  );
};

export default CreateManifestMethodScreen;
