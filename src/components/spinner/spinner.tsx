// Third Party
import React, { FunctionComponent } from 'react';

// Styles & Assets
import styles from './spinner.module.scss';

const Spinner: FunctionComponent = () => {
  return <div className={styles.loader}>Loading...</div>;
};

export default Spinner;
