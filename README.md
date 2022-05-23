![ShipEngine Connect](public/img/logos/shipengine-connect-logo.png)

ShipEngine Connect Website
==============================================

This repo is the public website for [ShipEngine Connect v1](https://connect-v1.shipengine.com/), including its documentation.

This is a [Next.js](https://nextjs.org/) application, and it uses [MDX](https://github.com/mdx-js/mdx) for the documentation pages.



Development Environment Setup
--------------------------------

### System Requirements
- [Node.js v14](https://nodejs.org/) or later
- [yarn](https://yarnpkg.com/)
- This project works on MacOS, Windows (including WSL), or Linux
- This project uses private ShipEngine NPM packages, so you need to be signed into an NPM account with access to the [@ShipEngine org](https://www.npmjs.com/settings/shipengine/packages)

### Installation
Use yarn to install all dependencies needed for local development:

```bash
yarn
```


Development Process
-------------------------------------

### Local Development
Start the local Next.js development server, which automatically cleans the output directory, does a full re-build, monitors the source code for changes, and does incremental re-builds whenever changes are detected.

```bash
yarn dev
```

Anytime you make code changes, you should run the tests to confirm that your code didn't break anything. Currently the `lint` script simply runs ESLint to verify that the code complies with our lint rules.

```bash
yarn lint
```

You should also periodically update dependencies using this command:

```bash
yarn upgrade
```


### QA / Review
We use [Github Pages](https://pages.github.com/) to host the ShipEngine Connect v1 website. There is not currently a live preview associated with pull requests. Please test your changes locally and include screenshots in your pull request description when appropriate.


### Releasing to Prod
Once you've reviewed your changes on the preview website and are happy with them, releasing to production is just a matter of merging to `v1` and pushing.  Github will automatically deploy the site to [connect-v1.shipengine.com](https://connect-v1.shipengine.com).
