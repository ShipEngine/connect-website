import { isDev } from "../../../lib/utils";

export interface PageProps {
  title: string;
  description: string;
  tags: string[];
  url: URL;
  image: URL;
  hidden: boolean;
  createdAt: Date;
  modifiedAt: Date;
}

/**
 * Tags for search engine crawlers
 */
export function SEO({ hidden, url }: PageProps) {
  return <>
    { hidden
      ? <meta name="robots" content="noindex"/>
      : <meta name="robots" content="index, follow"/>
    }
    <link rel="canonical" href={url.href}/>
  </>;
}

/**
 * Segment analytics
 * @see https://segment.com/
 */
export function Analytics() {
  if (isDev) return null;

  return <script dangerouslySetInnerHTML={{ __html:
    `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";}}();`
  }}/>;
}

/**
 * Twitter embed metadata
 * @see https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup.html
 */
export function Twitter({ title, url, image, description }: PageProps) {
  return <>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:site" content="@ShipEngineAPI"/>
    <meta name="twitter:creator"  content="@ShipEngineAPI"/>
    <meta name="twitter:title" content={title}/>
    <meta name="twitter:url" content={url.href}/>
    <meta name="twitter:image" content={image.href}/>
    <meta name="twitter:description" content={description}/>
  </>;
}

/**
 * Facebook Open Graph meetadata
 * @see http://ogp.me/
 *
 * Many metadata fields are used for both SEO and Open Graph. Search engines use the "name" attribute,
 * and Open Graph uses the "property" attribute.
 * @see https://stackoverflow.com/questions/22350105/whats-the-difference-between-meta-name-and-meta-property
 *
 * We also repurpose this metadata for Swiftype by adding "data-type" and className="swiftype" fields
 * @see https://swiftype.com/documentation/site-search/crawler-configuration/meta-tags
 */
export function OpenGraph({ title, description, createdAt, modifiedAt, tags, url, image }: PageProps) {
  return <>
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" name="author" content="ShipEngine Connect"/>
    <meta property="og:url" content={url.href}/>
    <meta property="og:title" name="title" content={title} className="swiftype" data-type="string"/>
    <meta property="og:image" name="image" content={image.href} className="swiftype" data-type="enum"/>
    <meta property="og:description" name="description" content={description} className="swiftype" data-type="text"/>
    <meta property="og:type" content="article"/>

    {/*
      Open Graph metadata for docs pages (a.k.a. "articles")
      @see http://ogp.me/#type_article
    */}
    <meta property="article:section" content="documentation"/>
    <meta property="article:published_time" name="published_at" content={createdAt.toISOString()} className="swiftype" data-type="date"/>
    <meta property="article:modified_time" name="updated_at" content={modifiedAt.toISOString()} className="swiftype" data-type="date"/>
    {
      tags.map(tag =>
        <meta key={tag} property="article:tag" name="tags" content={tag} className="swiftype" data-type="string"/>)
    }
  </>;
}
