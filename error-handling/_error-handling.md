# Error Handling
All errors can be imported from the `@shipengine/connect-runtime` package and are thrown like normal JavaScript errors. These predefined errors are what we use to map to the appropriate http status codes in the response.

:::warning Warning

Avoid intentionally throwing generic JavaScript errors, these errors will be represented as an issue with your integration, and can cause your integration to be turned off from public consumption.
```JavaScript
throw new Error('This is a bad idea'); // Don't do this.
```

:::
