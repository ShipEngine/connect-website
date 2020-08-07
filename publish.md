---
hidden: true
title: Publishing Your ShipEngine Application to the Integration Platform
description: Learn how to publish your application with the ShipEngine CLI
---

Publishing Your Application
===========================

One of the key benefits of integrating your service with the [ShipEngine Integration Platform](./index.md) is that we will take care of hosting your application, ensuring that it scales to meet the
needs of end users, and making it highly available at all times.

Part of your application's development cycle will involve end-to-end testing. To facilitate this, you can publish your application to our development environment for further testing before submitting it for production review.

Before you Publish
------------------

### Publishing a Carrier App
Before you can publish your Carrier application to the ShipEngine Integration Platform, you must define at least one of each of the following:
- [delivery service](./reference/delivery-service.md)
- [packaging](./reference/packaging.md)
- [delivery confirmation](./reference/delivery-confirmation.md)

This gives the ShipEngine Integration Platform the minimum amount of information it needs to present your app as a service provider inside one of our e-commerce applications,
where you may further test and interact with your application.

### Tests
Before publishing, you should verify that the [tests run by the ShipEngine CLI](testing/index.md) are all passing. This will tell you if you have any structural
issues with your application, such as missing the minimum implementation required for publishing. It also runs an extensive set
of functional tests that help validate your application further.

### Application Name
Your application's identity in the ShipEngine Integration Platform will be determined by the scoped `name` property in your project's `package.json` (ie `@org/carrier-name`).

The scoped package name will be treated as a unique identifier for your application in the ShipEngine Integration Platform ecosystem.

> **Warning**
> If at anytime you change the `name` property and re-publish, it will be treated as a different application.


### Definition IDs

[Definition](structure.md#definitions) `id` and `code` properties are used internally to uniquely identify your application's resources.
Each `id` and `code` property should contain a unique value. Additionally, `id` properties should
never be changed once the application is published to the ShipEngine Integration Platform.

Only one [delivery confirmation](./reference/delivery-confirmation.md) definition file should be created for
each unique delivery confirmation `type` as this value may be used internally to lookup the specified delivery confirmation
when no other identifiers are present.




### API Key
Before you publish your application, you will need to contact the [ShipEngine Integrations Team](mailto:lewis.zhang@shipstation.com) to have an API Key provisioned for you.


Publish
-------
From the root of your project run the `shipengine publish` command.

Once all the tests executed by the CLI are passing, your application will be packaged and published to our development environment.

You can poll the status of the publish command until it is complete via the `-w` or `--watch` flag.

Once you have completed your end-to-end testing, you can submit your application for production review. After it has been reviewed, it will be promoted to our production environment where
end users can begin to use it.

<div class="previous-next-nav">
  <a class="button button-small button-secondary" href="./testing/index.md">Previous: Testing</a>
</div>
