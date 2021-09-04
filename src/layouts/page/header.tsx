import { siteURL } from '../../lib/url'
import styles from './header.module.scss'
import React from 'react'

export function Header() {
  return (
    <header className={styles.siteHeader}>
      <a id="site-logo" className={styles.siteLogo} href={siteURL.pathname}>
        <img src={`${siteURL.pathname}img/logos/shipengine-connect-logo.svg`} alt="Shipengine Connect" />
      </a>
    </header>
  )
}
