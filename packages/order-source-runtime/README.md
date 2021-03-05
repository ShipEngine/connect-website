# Developer Experience Order App Runtime

This is an HTTP runtime host for the ShipEngine Integration Platform's
[Order App](https://github.com/ShipEngine/shipengine-integration-platform-sdk#shipengine-integration-platform-sdk).

In default mode this runtime exposes the eCommerce API 1.0 HTTP
[specification](https://app.swaggerhub.com/apis/ss-ipaas/ecommerce_api/1.0.0) and serves as a mapping layer between
that specification, and the function calls that an Order App implements. ShipStation ultimately makes calls to this API
with the [ModuleClient](https://github.com/shipstation/shipstation/blob/master/SS.Business/Marketplace/ECommerceApi/ModuleClient.cs),
but are first routed through a Gateway using the HTTP header `api-code` as the discriminator.

The ShipEngine Integration Platform [Loader](https://github.com/ShipEngine/shipengine-integration-platform-loader)
loads the Order App from a directory specified by the environment variable `DX_APP_PATH`.

The runtime can run Order Apps of two types:

1. ShipEngine Order App (default)
1. A proxy for HTTP requests
    1. Set `config.runtime_proxy: true` in the App package.json
    1. Implement and default export the `ProxyApp` interface. See
        [ecom-proxy](../apps/ecom-proxy) for an example
    1. Mapping is __not__ performed with the proxy app type

## Developing

This runtime is invisible to a user of the ShipEngine Integration Platform ecosystem, as it is deployed
by an `app:publish` triggering a build and deployment within the
[Function Manager](https://github.com/shipstation/integrations-platform/tree/master/dx-function-manager).

To run this project locally you must set the `DX_APP_PATH` env variable to the root directory of your App. You can use
`.env.local`, a `.gitignore` file.

An example order export of the eCommerce 1.0 specification
```shell script
curl -X POST 'http://localhost:3006/export_sales_orders' \
    -H 'Content-Type: application/json' \
    -d '{
        "transaction_id": "754e4fc9-a7cd-4718-b029-9876c89267c2",
        "auth": {
            "base_url": "http://mock-custom-store-stage.kubedev.sslocal.com/"
        },
        "from_date_time": "2020-01-27T17:00:00.000Z",
        "to_date_time": "2020-01-27T18:00:00.000Z"
    }'
```

## See Also

This project is based on the Shipping App Runtime found
[here](https://github.com/shipstation/integrations-shipping/tree/master/dx-app-runtime).
