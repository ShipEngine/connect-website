// Third Party
import React, { FunctionComponent } from 'react';
import { JSONSchema7 } from 'json-schema';
import { Alert } from 'antd'

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
    <>
      <Alert
        message="Help"
        description={<span>View the <a href="https://connect.shipengine.com/docs/reference/forms" target="_blank" rel="noopener noreferrer">docs</a> to learn more about connect forms.</span>}
        type="info"
        closable
        style={{ margin: '5px' }}
      />
      <ConnectForm
        connectSchema={app?.connectionForm.dataSchema as JSONSchema7}
        connectUiSchema={app?.connectionForm.uiSchema as JSONSchema7}
        settingsSchema={app?.settingsForm?.dataSchema as JSONSchema7}
        settingsUiSchema={app?.settingsForm?.uiSchema as JSONSchema7}
      />
    </>
  );
};

export default ConnectMethodScreen;
