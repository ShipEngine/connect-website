// Third Party
import React, { FunctionComponent } from 'react';
import { Collapse, Descriptions, Divider } from 'antd';

// Utils & Types
import { DeliveryService } from '@shipengine/connect-sdk/lib/internal/carriers';

interface Props {
  deliveryServices: readonly DeliveryService[];
}

const DeliveryServicesAccordion: FunctionComponent<Props> = ({
  deliveryServices,
}) => {
  return (
    <Collapse accordion>
      {deliveryServices.map((deliveryService, index) => (
        <Collapse.Panel header={deliveryService.name} key={index}>
          <Descriptions column={2}>
            <Descriptions.Item label='Name'>
              {deliveryService.name}
            </Descriptions.Item>
            <Descriptions.Item label='Description'>
              {deliveryService.description}
            </Descriptions.Item>
            <Descriptions.Item label='Code'>
              {deliveryService.code}
            </Descriptions.Item>
            <Descriptions.Item label='Fulfillment Service'>
              {deliveryService.fulfillmentService}
            </Descriptions.Item>
            <Descriptions.Item label='Service Area'>
              {deliveryService.serviceArea}
            </Descriptions.Item>
            <Descriptions.Item label='Is Consolidation Service'>
              {deliveryService.isConsolidationService.toString()}
            </Descriptions.Item>
            <Descriptions.Item label='Allows Multiple Packages'>
              {deliveryService.allowsMultiplePackages.toString()}
            </Descriptions.Item>
            <Descriptions.Item label='Is Insurable'>
              {deliveryService.isInsurable.toString()}
            </Descriptions.Item>
            <Descriptions.Item label='Is Trackable'>
              {deliveryService.isTrackable.toString()}
            </Descriptions.Item>
            <Descriptions.Item label='Manifest Type'>
              {deliveryService.manifestType}
            </Descriptions.Item>
            <Descriptions.Item label='Supports Returns'>
              {deliveryService.supportsReturns}
            </Descriptions.Item>
            <Descriptions.Item label='Has Sandbox'>
              {deliveryService.hasSandbox.toString()}
            </Descriptions.Item>
            <Descriptions.Item label='Label Formats'>
              {deliveryService.labelFormats.join(', ')}
            </Descriptions.Item>
            <Descriptions.Item label='Label Sizes'>
              {deliveryService.labelSizes.join(', ')}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          Packaging
          <Collapse accordion>
            {deliveryService.packaging.map((p, index) => (
              <Collapse.Panel header={p.name} key={`package-${index}`}>
                <Descriptions column={2}>
                  <Descriptions.Item label='ID'>{p.id}</Descriptions.Item>
                  <Descriptions.Item label='Code'>{p.code}</Descriptions.Item>
                  <Descriptions.Item label='Description'>
                    {p.description}
                  </Descriptions.Item>
                  <Descriptions.Item label='Requires Weight'>
                    {p.requiresWeight.toString()}
                  </Descriptions.Item>
                  <Descriptions.Item label='Requires Dimensions'>
                    {p.requiresDimensions.toString()}
                  </Descriptions.Item>
                </Descriptions>
              </Collapse.Panel>
            ))}
          </Collapse>
          <Divider />
          Delivery Confirmations
          <Collapse accordion>
            {deliveryService.deliveryConfirmations.map(
              (deliveryConfirmation, index) => (
                <Collapse.Panel
                  header={deliveryConfirmation.name}
                  key={`deliveryConfirmation-${index}`}>
                  <Descriptions column={2}>
                    <Descriptions.Item label='ID'>
                      {deliveryConfirmation.id}
                    </Descriptions.Item>
                    <Descriptions.Item label='Code'>
                      {deliveryConfirmation.code}
                    </Descriptions.Item>
                    <Descriptions.Item label='Description'>
                      {deliveryConfirmation.description}
                    </Descriptions.Item>
                    <Descriptions.Item label='Type'>
                      {deliveryConfirmation.type}
                    </Descriptions.Item>
                  </Descriptions>
                </Collapse.Panel>
              ),
            )}
          </Collapse>
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

export default DeliveryServicesAccordion;
