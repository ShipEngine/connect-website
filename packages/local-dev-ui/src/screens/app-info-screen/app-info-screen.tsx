/* eslint-disable jsx-a11y/anchor-is-valid */
// Third Party
import React, { FunctionComponent } from 'react';
import { Descriptions, Divider, Typography } from 'antd';

// Utils & Types
import { useApp } from '../../contexts/app-context';

// Components
import CalloutWithMessage from '../../components/callout-with-message';
import DeliveryServicesAccordion from './delivery-services-accordion';
import FullPageSpinner from '../../components/full-page-spinner';
import PickupServicesAccordion from './pickup-services-accordion';

const AppInfoScreen: FunctionComponent = () => {
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
      <Descriptions title={app?.name} column={2}>
        <Descriptions.Item label='ID'>{app?.id}</Descriptions.Item>
        <Descriptions.Item label='SDK Version'>
          {app?.sdkVersion}
        </Descriptions.Item>
        <Descriptions.Item label='App Type'>{app?.type}</Descriptions.Item>
        <Descriptions.Item label='Description'>
          <p>{app?.description}</p>
        </Descriptions.Item>
        <Descriptions.Item label='Website'>
          <a href={(app?.websiteURL as unknown) as string}>{app?.websiteURL}</a>
        </Descriptions.Item>
        <Descriptions.Item label='Manifest Locations'>
          {app?.manifestLocations}
        </Descriptions.Item>
        <Descriptions.Item label='Manifest Shipments'>
          {app?.manifestShipments}
        </Descriptions.Item>
        <Descriptions.Item label='Manifest Type'>
          {app?.manifestType}
        </Descriptions.Item>
        <Descriptions.Item label='Supports Returns'>
          {app?.supportsReturns}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Descriptions title={'Manifest (package.json)'} column={2}>
        <Descriptions.Item label='Name'>{app?.manifest.name}</Descriptions.Item>
        <Descriptions.Item label='Version'>
          {app?.manifest.version}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Descriptions title={'Images'} column={2}>
        <Descriptions.Item>
          {app?.logo && (
            <div>
              <h4>logo width: 250px</h4>
              <img
                src={app?.logo}
                style={{ width: '250px' }}
                alt='carrier app icon'
              />
            </div>
          )}
        </Descriptions.Item>
        <Descriptions.Item>
          {app?.logo && (
            <div>
              <h4>logo width: 150px</h4>
              <img
                src={app?.logo}
                style={{ width: '150px' }}
                alt='carrier app icon'
              />
            </div>
          )}
        </Descriptions.Item>
        <Descriptions.Item>
          {app?.logo && (
            <div>
              <h4>logo width: 75px</h4>
              <img
                src={app?.logo}
                style={{ width: '75px' }}
                alt='carrier app icon'
              />
            </div>
          )}
        </Descriptions.Item>
        <Descriptions.Item label='Icon'>
          {app?.icon && (
            <div>
              <img
                src={app?.logo}
                style={{ width: '50px' }}
                alt='carrier app icon'
              />
            </div>
          )}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Typography.Title level={4}>Delivery Services</Typography.Title>

      {app?.deliveryServices && (
        <DeliveryServicesAccordion deliveryServices={app?.deliveryServices} />
      )}

      <Divider />

      <Typography.Title level={4}>Pickup Services</Typography.Title>

      {app?.pickupServices && (
        <PickupServicesAccordion pickupServices={app?.pickupServices} />
      )}
    </>
  );
};

export default AppInfoScreen;
