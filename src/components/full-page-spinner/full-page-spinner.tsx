// Third Party
import React, { FunctionComponent } from 'react';
import { Spin } from 'antd';

// Styles & Assets
import styles from './full-page-spinner.module.scss';

const FullPageSpinner: FunctionComponent = () => {
  return (
    <div className={styles.center}>
      <Spin size='large' />
    </div>
  );
};

export default FullPageSpinner;
