import { siteURL } from "../../lib/url";
import styles from "./header.module.scss";
import React from "react";
import useSwiftType from "../../components/swiftype/use-swiftype";

export function Header() {
  useSwiftType();
  return (
    <header className={styles.siteHeader}>
      <a id="site-logo" className={styles.siteLogo} href={siteURL.pathname}>
        <img src={`${siteURL.pathname}img/logos/shipengine-connect-logo.svg`} alt="Shipengine Connect" />
      </a>

      {/* SwifType search  */}
      <form className={`${styles.siteSearchForm} invisible`} method="get" action="https://www.google.com/search">
        <label htmlFor="site-search" className="visually-hidden">
          ShipEngine Connect Docs Search
        </label>
        <input id="site-search" className="st-default-search-input"
          name="q" type="search" placeholder="Search" />
      </form>
    </header>
  );
}