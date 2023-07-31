# ShipEngine Connect developer portal

## Prerequisites

- [node.js >= 12.22.6 and <= 16.x](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/en/)

## Install

    yarn install

###### Start development server

    yarn start

Note: search isn't functional in the development environment.

## API documentation

The content under the `Methods` section is generated from OpenAPI specs that
are maintained in the `shipstation/ipaas-connect` repository. Redocly is
configured to pull in changes when the specs in that repository change in the
`master` branch. The Redocly configuration can be managed by logging in via Okta.

## Troubleshooting

If some changes are not reflected in the resulting portal try cleaning cache by running:

    yarn clean

## Redocly Docs

This site is built on Redocly.
Read the [online documentation](https://redoc.ly/docs/developer-portal/introduction/).
