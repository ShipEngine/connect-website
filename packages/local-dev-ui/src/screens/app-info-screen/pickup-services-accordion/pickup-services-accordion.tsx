// Third Party
import React, { FunctionComponent } from 'react';
import { Collapse, Descriptions } from 'antd';

// Utils & Types
import { PickupService } from '@shipengine/connect-sdk/lib/internal/carriers';

interface Props {
  pickupServices: readonly PickupService[];
}

const PickupServicesAccordion: FunctionComponent<Props> = ({
  pickupServices,
}) => {
  return (
    <Collapse accordion>
      {pickupServices.map((pickupService, index) => (
        <Collapse.Panel header={pickupService.name} key={index}>
          <Descriptions column={2}>
            <Descriptions.Item label='Name'>
              {pickupService.name}
            </Descriptions.Item>
            <Descriptions.Item label='Description'>
              {pickupService.description}
            </Descriptions.Item>
            <Descriptions.Item label='Code'>
              {pickupService.code}
            </Descriptions.Item>
          </Descriptions>
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

export default PickupServicesAccordion;
