// Third Party
import React, { FunctionComponent } from 'react';
import { Empty } from 'antd';

// Styles & Assets
import logo from '../../assets/svgs/logo.svg';

interface Props {
  message: JSX.Element;
}

const MethodNotImplementedMessage: FunctionComponent<Props> = ({ message }) => {
  return (
    <Empty
      image={logo}
      imageStyle={{
        height: 100,
      }}
      description={message}
    />
  );
};

export default MethodNotImplementedMessage;
