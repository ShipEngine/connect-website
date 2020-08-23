import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <div className="centered-content">
        <nav className={styles.footerNav}>
          <div className={styles.column}>
            <div className={styles.columnHeading}>Products</div>
            <ul>
              <li><a href="https://www.shipengine.com/shipping/">Shipping</a></li>
            </ul>

            <div className={styles.columnHeading}>Pricing</div>
            <ul>
              <li><a href="https://www.shipengine.com/pricing/">Plans</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <div className={styles.columnHeading}>Solutions</div>
            <ul>
              <li><a href="https://www.shipengine.com/e-commerce-platforms/">E-commerce Platforms</a></li>
              <li><a href="https://www.shipengine.com/third-party-logistics/">Third Party Logistics</a></li>
              <li><a href="https://www.shipengine.com/brands/">Brands</a></li>
            </ul>

            <div className={styles.columnHeading}>Integrations</div>
            <ul>
              <li><a href="https://www.shipengine.com/integrations/carriers/">Carriers</a></li>
              <li><a href="https://www.shipengine.com/integrations/marketplaces/">Marketplaces</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <div className={styles.columnHeading}>Developers</div>
            <ul>
              <li><a href="https://www.shipengine.com/docs/">Documentation</a></li>
              <li><a href="https://status.shipengine.com/">API Status</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <div className={styles.columnHeading}>Company</div>
            <ul>
              <li><a href="https://www.shipengine.com/about/">About</a></li>
              <li><a href="https://www.shipengine.com/customers/">Customers</a></li>
              <li><a href="https://www.shipengine.com/blog/">Blog</a></li>
              <li><a href="https://www.shipengine.com/contact/">Contact</a></li>
              <li><a href="https://help.shipengine.com/">Support</a></li>
              <li><a href="https://gear.shipengine.com/">ShipEngine Gear Shop</a></li>
              <li><a href="https://www.shipengine.com/privacy-policy/">Privacy Policy</a></li>
              <li><a href="https://www.shipengine.com/terms-of-service/">Terms of Service</a></li>
            </ul>
          </div>

          <div className={styles.socialMediaIcons}>
            <div className="heading visually-hidden">Social Media</div>
            <ul>
              <li>
                <a href="https://www.instagram.com/shipengineapi/" className={styles.instagram}>
                  <span className="visually-hidden">ShipEngine on Instagram</span>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/ShipEngineAPI/" className={styles.facebook}>
                  <span className="visually-hidden">ShipEngine on Facebook</span>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/ShipEngineAPI" className={styles.twitter}>
                  <span className="visually-hidden">ShipEngine on Twitter</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/shipengine/" className={styles.linkedin}>
                  <span className="visually-hidden">ShipEngine on LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <p className={styles.copyright}>
          &copy; 2019 Shipengine. All rights reserved
        </p>
      </div>
    </footer>
  );
}
