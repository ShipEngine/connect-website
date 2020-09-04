// Third Party
import React, { FunctionComponent } from 'react';
import { JSONSchema7 } from 'json-schema';

// Utils & Types
import { useApp } from '../../contexts/app-context';

// Components
import ConnectForm from './connect-form';
import FullPageSpinner from '../../components/full-page-spinner';
import CalloutWithMessage from '../../components/callout-with-message';

const ConnectMethodScreen: FunctionComponent = () => {
  const { isLoading, isError, app } = useApp();

  if (isLoading) return <FullPageSpinner />;

  if (isError)
    return (
      <CalloutWithMessage
        message={
          <span>
            An error occurred while loading the app. Please check the app logs
            for more information.
          </span>
        }
      />
    );

  return (
    <ConnectForm
      schema={app?.connectionForm.dataSchema as JSONSchema7}
      uiSchema={app?.connectionForm.uiSchema as JSONSchema7}
    />
  );
};

export default ConnectMethodScreen;
