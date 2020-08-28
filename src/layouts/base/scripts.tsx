import { isDev } from "../../lib/utils";


/**
 * Segment analytics
 * @see https://segment.com/
 */
export function AnalyticsScript() {
  if (isDev) return null;

  return <script dangerouslySetInnerHTML={{
    __html:
      `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";analytics.load("ftxwmcSBxfMQgHFM29qNvegJAqbsZq3v");analytics.page();}}();`
  }} />;
}


/**
 * Swiftype search engine script
 * @see https://swiftype.com/
 */
export function SearchScript() {
  if (isDev) return null;

  return <script dangerouslySetInnerHTML={{
    __html:
      `(function(w,d,t,u,n,s,e){w['SwiftypeObject']=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments);};s=d.createElement(t);e=d.getElementsByTagName(t)[0];s.async=1;s.src=u;e.parentNode.insertBefore(s,e);})(window,document,'script','//s.swiftypecdn.com/install/v2/st.js','_st');_st('install','u86UF32qnUsbG7SMBeRd','2.0.0');`
  }} />;
}
