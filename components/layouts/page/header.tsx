import { siteURL } from "../../../lib/url";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.siteHeader}>
      <a id="site-logo" className={styles.siteLogo} href={siteURL.pathname}>
        <img src={`${siteURL.pathname}img/logos/shipengine-connect-logo.svg`} alt="Shipengine Connect"/>
      </a>

      {/* SwifType search, with Google Search fallback  */}
      <form className={`${styles.siteSearchForm} invisible`} method="get" action="https://www.google.com/search">
        <label htmlFor="site-search" className="visually-hidden">
          ShipEngine Connect Docs Search
        </label>
        <input id="site-search" className="st-default-search-input"
          name="q" type="search" placeholder="Search"/>
        <input type="hidden" name="as_sitesearch" value="connect.shipengine.com"/>
      </form>
    </header>
  );
}
