# TypeScript Library
The purpose of this library is to fill a similar role that EcommerceApi.Common serves for C# but for JavaScript & TypeScript. It will contain the models and definitions for Request/Response Bodies.

## Building & Publishing
To build the project use this command in the terminal from this directory.
```
npm run build
```

this will generate a ```./lib``` directory which contains the JavaScript & TypeScript.

To publish make sure you set the appropriate version in the package.json file and then:
```
npm run build
npm publish
```


### Include in Project

Create a **.npmrc** file with the a pointer to our internal registry
```
@ipaas:registry=https://infra-nexus.kube.sslocal.com/repository/s3-npm-hosted/
```
Then use the following command from the terminal
```
npm install @ipaas/ecommerce
```
