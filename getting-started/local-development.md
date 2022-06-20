---
title: Local Development
---
# Local Development
## Project Layout
```bash
.
assets/ # contains logos and icons
src/ # contains entry point of code
├─ definitions/ # contains definition files for metadata
├─ forms/ # contains registration / settings forms
├─ methods/ # contains functional implementation
├─ index.(ts || js) # exports object containing implementation and metadata definition
├─ server.(ts || js) # imports definition from index and starts a web service
```
## Running Locally
:::info TypeScript
Make sure to run `npm run-script build` to transpile your TypeScript before running any local development commands.
:::

You can run the `npm start` command to start your webserver locally.

![](./images/running-service-locally.png)

This will start a webservice running on `http://localhost:3005/`

From your browser you can go to the `http://localhost:3005/docs`  endpoint to see the open api specification for your app.
![](./images/docs-endpoint.png)

You can use an application like [Postman](https://www.postman.com/) or  to make http requests to the various endpoints that are wired up to the functions you write of a corresponding name in the `src/methods` directory.

## Unit Tests
Another great way to test locally is to write unit tests for your code. We internally are big fans of the [Jest](https://jestjs.io/) testing framework for executing the methods locally without needing to stand up the server.

### Steps for Installing Jest
#### JavaScript
- Run `npm install jest --save-dev`
- Update **package.json** file to call jest when test is ran
```JSON
{
        "scripts": {
            "test": "jest"
        }
}
```
- Add a root level **/tests/** directory
- Add a test Example: **/tests/sales-order-export.test.js**
```JavaScript
// /tests/sales-order-export.test.js
const { SalesOrdersExport } = require('../src/methods/sales-orders-export/index');
describe('When SalesOrderExport is called with a valid request',() => {
    it('it should export at least one sales order', async () => {
        const results = await SalesOrdersExport({
            auth: {
                username: 'name',
                password: 'password'
            },
            criteria: {
                from_date_time: '2022-04-04T00:00:00.000Z',
                to_date_time: '2022-04-18T00:00:00.000Z'
            }
        });
        expect(results.sales_orders.length).toBeGreaterThanOrEqual(1);
    })
})
```
- Run tests by using `npm run-script test`

#### TypeScript
- Run `npm install jest @types/jest ts-jest --save-dev`
- Run `npx ts-jest config:init`
- Update **package.json** file to call jest when test is ran
```JSON
{
        "scripts": {
            "test": "jest"
        }
}
```
- Add a root level **/tests/** directory
- Add a test Example: **/tests/sales-order-export.test.ts**
```TypeScript
// /tests/sales-order-export.test.ts
import { SalesOrdersExport } from "../src/methods/sales-orders-export";
describe("When SalesOrderExport is called with a valid request", () => {
    it("it should export at least one sales order", async () => {
        const results = await SalesOrdersExport({
            transaction_id: "",
            auth: {
                order_source_api_code: "",
                username: "name",
                password: "password",
            },
            criteria: {
                from_date_time: "2022-04-04T00:00:00.000Z",
                to_date_time: "2022-04-18T00:00:00.000Z",
            },
        });
        expect(results.sales_orders.length).toBeGreaterThanOrEqual(1);
    });
});
```
- Run tests by using `npm run-script test`

:::warning Mocking
You can mock function calls to the outside world with Jest. This can be extremely useful for testing without needing valid credentials. Documentation can be found on [Jests website here](https://jestjs.io/docs/mock-functions)
:::
