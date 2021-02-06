![ShipEngine Connect](public/img/logos/shipengine-connect-logo.png)

ShipEngine Connect Website
==============================================

This repo is the public website for [ShipEngine Connect](https://connect.shipengine.com/), including its documentation.

This is a [Next.js](https://nextjs.org/) application, and it uses [MDX](https://github.com/mdx-js/mdx) for the documentation pages.



Development Environment Setup
--------------------------------

### System Requirements
- [Node.js v14](https://nodejs.org/) or later
- [NPM v6](https://docs.npmjs.com/about-npm-versions) or later
- This project works on MacOS, Windows (including WSL), or Linux
- This project uses private ShipEngine NPM packages, so you need to be signed into an NPM account with access to the [@ShipEngine org](https://www.npmjs.com/settings/shipengine/packages)

### Installation
Use NPM to install all dependencies needed for local development:

```bash
npm install
```


Development Process
-------------------------------------

### Local Development
Start the local Next.js development server, which automatically cleans the output directory, does a full re-build, monitors the source code for changes, and does incremental re-builds whenever changes are detected.

```bash
npm run dev
```

Anytime you make code changes, you should run the tests to confirm that your code didn't break anything. Currently the `test` script simply runs ESLint to verify that the code complies with our lint rules.

```bash
npm test
```

You should also periodically update dependencies using this command:

```bash
npm run upgrade
```


### QA / Review
We use [Vercel](https://vercel.com/) to host the ShipEngine Connect website. One of the nice features of Vercel is that it creates a preview URL for every Git branch and PR, so you can see how the site will look in production and share the link with others to review .

Just push your changes to your branch/PR and then go to [the Vercel dashboard](https://vercel.com/shipengine) to monitor the build process and get your preview URL.


### Releasing to Prod
Once you've reviewed your changes on the preview website and are happy with them, releasing to production is just a matter of merging to `master` and pushing.  Vercel will automatically deploy the site to [connect.shipengine.com](https://connect.shipengine.com).
