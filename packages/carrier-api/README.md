# TypeScript Library
The purpose of this library is to fill a similar role that CarrierApi.Common serves for C# but for JavaScript & TypeScript. It will contain the models and definitions for Request/Response Bodies.

## Building & Publishing
To build the project use this command in the terminal from this directory.
```
npm build
```

this will generate a ```./lib``` directory which contains the JavaScript & TypeScript.

To publish make sure you set the appropriate version in the package.json file
**change directory to the ./lib directory and publish**
```
npm publish
```


**DO NOT PUBLISH FROM THIS DIRECTORY**
*this is because the pathing for the package will be weird, exposing both the src directory and the lib directory we want imports to be able to look like this* 
```javascript
 import CreateLabelRequest from '@ipaas/capi/requests'
 ```
 *and not like this*
```javascript
 import CreateLabelRequest from '@ipaas/capi/lib/requests'
 ```


