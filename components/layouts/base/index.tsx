import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { defaultImageURL, getPageURL } from "../../../lib/url";
import { Favicons } from "./favicons";
import { JsonLD } from "./json-ld";
import { Analytics, OpenGraph, PageProps, SEO, Twitter } from "./meta";

export interface BaseLayoutProps {
  title: string;
  description: string;
  tags: string[];
  createdAt: Date;
  modifiedAt: Date;
  image?: string;
  hidden?: boolean;
  children?: ReactNode;
}

/**
 * This is the base layout for all other layouts.  It renders metadata for SEO and social media
 * in the `<head>`, but leaves the `<body>` empty.
 */
export default function BaseLayout(props: BaseLayoutProps) {
  const { title, description, tags, createdAt, modifiedAt, image, hidden, children } = props;
  const router = useRouter();
  const pageURL = getPageURL(router);

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    !Array.isArray(tags) ||
    tags.length === 0
  ) {
    throw new Error(`${router.pathname} is missing required metadata (title, description, tags)`);
  }

  const pageProps: PageProps = {
    title,
    description,
    tags,
    createdAt,
    modifiedAt,
    url: pageURL,
    image: image ? new URL(image, pageURL) : defaultImageURL,
    hidden: hidden || false,
  };

  return <>
    <Head>
      <title>{title.includes("ShipEngine Connect") ? title : `${title} | ShipEngine Connect`}</title>
      <meta content="utf-8" httpEquiv="encoding"/>
      <meta content="text/html;charset=utf-8" httpEquiv="Content-Type"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <SEO {...pageProps}/>
      <Twitter {...pageProps}/>
      <OpenGraph {...pageProps}/>
      <JsonLD {...pageProps}/>
      <Favicons/>
      <Analytics/>
    </Head>
    { children }
  </>;
}
