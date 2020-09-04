// Third Party
import React, { FunctionComponent } from 'react';

// Styles & Assets
import styles from './spinner.module.scss';
import logo from '../../assets/svgs/logo-no-brackets.svg';

const Spinner: FunctionComponent = () => {
  return <img src={logo} className={styles.appLogo} alt='logo' />;
};

export default Spinner;
