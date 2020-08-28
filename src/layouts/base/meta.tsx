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
    {hidden
      ? <meta name="robots" content="noindex" />
      : <meta name="robots" content="index, follow" />
    }
    <link rel="canonical" href={url.href} />
  </>;
}

/**
 * Twitter embed metadata
 * @see https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup.html
 */
export function Twitter({ title, url, image, description }: PageProps) {
  return <>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@ShipEngineAPI" />
    <meta name="twitter:creator" content="@ShipEngineAPI" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:url" content={url.href} />
    <meta name="twitter:image" content={image.href} />
    <meta name="twitter:description" content={description} />
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
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" name="author" content="ShipEngine Connect" />
    <meta property="og:url" content={url.href} />
    <meta property="og:title" name="title" content={title} className="swiftype" data-type="string" />
    <meta property="og:image" name="image" content={image.href} className="swiftype" data-type="enum" />
    <meta property="og:description" name="description" content={description} className="swiftype" data-type="text" />
    <meta property="og:type" content="article" />

    {/*
      Open Graph metadata for docs pages (a.k.a. "articles")
      @see http://ogp.me/#type_article
    */}
    <meta property="article:section" content="documentation" />
    <meta property="article:published_time" name="published_at" content={createdAt.toISOString()} className="swiftype" data-type="date" />
    <meta property="article:modified_time" name="updated_at" content={modifiedAt.toISOString()} className="swiftype" data-type="date" />
    {
      tags.map(tag =>
        <meta key={tag} property="article:tag" name="tags" content={tag} className="swiftype" data-type="string" />)
    }
  </>;
}
