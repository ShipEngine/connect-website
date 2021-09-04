import { defaultImageURL, logoURL, siteURL } from '../../lib/url'
import { PageProps } from './meta'

/**
 * JSON Linked Data
 *
 * @see https://json-ld.org/
 * @see https://developers.google.com/search/docs/guides/intro-structured-data
 *
 * An application programming interface accessible over Web/Internet technologies
 * @see https://pending.schema.org/WebAPI
 *
 * Reference documentation for application programming interfaces
 * @see https://schema.org/APIReference
 */
export function JsonLD({ title, description, createdAt, modifiedAt, tags, url, image }: PageProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          {
            '@context': 'http://schema.org',
            '@type': ['Service', 'WebAPI'],
            name: 'ShipEngine Connect',
            serviceType: 'API',
            category: 'Internet Service > API',
            url: siteURL.href,
            image: defaultImageURL.href,
            logo: logoURL.href,
            documentation: {
              '@context': 'http://schema.org',
              '@type': 'APIReference',
              name: 'ShipEngine Connect',
              headline: 'ShipEngine Connect',
              description:
                'Integrate your carrier or marketplace with our world class e-commerce solutions ' +
                'and gain immediate access to a global user base',
              keywords: tags.join(', '),
              url: new URL('docs', siteURL),
              image: defaultImageURL,
              isAccessibleForFree: true,
              targetPlatform: 'http',
              dateCreated: createdAt.toISOString(),
              dateModified: modifiedAt.toISOString(),
              author: {
                '@type': 'Organization',
                name: 'ShipEngine',
                telephone: '1 (512) 856-5379',
                email: 'connect@shipengine.com',
                url: siteURL.href,
                logo: logoURL.href,
              },
            },
            termsOfService: new URL('terms-of-service', siteURL),
            description,
            provider: {
              '@type': 'Organization',
              name: 'ShipEngine',
              telephone: '1 (512) 856-5379',
              email: 'connect@shipengine.com',
              url: siteURL.href,
              logo: logoURL.href,
            },
          },
          {
            '@context': 'http://schema.org',
            '@type': 'APIReference',
            name: 'ShipEngine Connect',
            headline: title,
            description,
            keywords: tags.join(', '),
            url: url.href,
            image: image.href,
            isAccessibleForFree: true,
            targetPlatform: 'NodeJS',
            dateCreated: createdAt.toISOString(),
            dateModified: modifiedAt.toISOString(),
            author: {
              '@type': 'Organization',
              name: 'ShipEngine',
              telephone: '1 (512) 856-5379',
              email: 'connect@shipengine.com',
              url: siteURL.href,
              logo: logoURL.href,
            },
          },
        ]),
      }}
    />
  )
}
