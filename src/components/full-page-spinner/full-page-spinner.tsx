// Third Party
import React, { FunctionComponent } from 'react';

// Components
import Spinner from '../spinner';

// Styles & Assets
import styles from './full-page-spinner.module.scss';

const FullPageSpinner: FunctionComponent = () => {
  return (
    <div className={styles.center}>
      <Spinner />
    </div>
  );
};

export default FullPageSpinner;
