import { siteURL } from '../../lib/url'

/**
 * Favicons
 * https://realfavicongenerator.net/faq#.XTNmkOhKiuw
 */
export function Favicons() {
  return (
    <>
      {/*
      These icons are used by every major browser, and as fallbacks for device-specific and OS-specific icons.
      @see https://www.w3.org/TR/html5/links.html#link-type-icon
    */}
      <link rel="icon" type="image/png" sizes="32x32" href={`${siteURL.pathname}img/favicons/favicon-32x32.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`${siteURL.pathname}img/favicons/favicon-16x16.png`} />

      {/*
      These icons are used by iOS, MacOS, and Safari.
      @see https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
    */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${siteURL.pathname}img/favicons/apple-touch-icon-180x180.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href={`${siteURL.pathname}img/favicons/apple-touch-icon-152x152.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href={`${siteURL.pathname}img/favicons/apple-touch-icon-120x120.png`}
      />
      <link rel="apple-touch-icon" sizes="76x76" href={`${siteURL.pathname}img/favicons/apple-touch-icon-76x76.png`} />
      <link rel="apple-touch-icon" sizes="60x60" href={`${siteURL.pathname}img/favicons/apple-touch-icon-60x60.png`} />
      <link rel="mask-icon" href={`${siteURL.pathname}img/favicons/safari-pinned-tab.svg`} color="#5bbad5" />
      <meta name="apple-mobile-web-app-title" content="ShipEngine Connect" />

      {/*
      These icons are used by Windows 8, Windows 10, IE 11 and Edge

      @see https://technet.microsoft.com/en-us/windows/dn255024(v=vs.60)
      @see https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/dn320426(v=vs.85)
    */}
      <meta name="application-name" content="ShipEngine Connect" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content={`${siteURL.pathname}img/favicons/mstile-144x144.png`} />
      <meta name="msapplication-config" content={`${siteURL.pathname}browserconfig.xml`} />
      <meta name="theme-color" content="#ffffff" />

      {/*
      The manifest file is used when "installing" the site as an app.
      It tells the browser the app's name, description, URL, etc. and what icons and colors to use.

      @see https://developer.mozilla.org/en-US/docs/Web/Manifest
      @see https://developers.google.com/web/fundamentals/web-app-manifest/
    */}
      <link rel="manifest" href={`${siteURL.pathname}site.webmanifest`} />
    </>
  )
}
