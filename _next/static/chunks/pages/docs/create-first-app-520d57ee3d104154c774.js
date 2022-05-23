(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9357],{919:function(e,n,t){"use strict";t.r(n),t.d(n,{title:function(){return m},description:function(){return c},tags:function(){return d},createdAt:function(){return l},modifiedAt:function(){return h},default:function(){return g}});var a=t(9016),o=t(3104),i=t(6687),r=t(2320),p=t(1783),s=["components"],m=(i.createElement,"Create your first ShipEngine Connect app."),c="Learn how to use the ShipEngine Connect CLI and the project template to being creating an Integration app.",d=["ShipEngine","Integration App","ShipEngine Integration","CLI","Javascript","Typescript"],l=new Date(1653338063537.9844),h=new Date(1653338063537.9844),k=function(e){return function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.kt)("div",n)}},u=k("CodeWrapper"),f=k("Pager"),w=function(e){return(0,r.kt)(p.Z,(0,o.Z)({title:"Create your first ShipEngine Connect app.",description:"Learn how to use the ShipEngine Connect CLI and the project template to being creating an Integration app.",tags:["ShipEngine","Integration App","ShipEngine Integration","CLI","Javascript","Typescript"],createdAt:new Date(1653338063538),modifiedAt:new Date(1653338063538)},e))};function g(e){var n=e.components,t=(0,a.Z)(e,s);return(0,r.kt)(w,(0,o.Z)({},t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{markdown:!0},"Creating Your First App"),(0,r.kt)("p",{markdown:!0},(0,r.kt)("a",{href:"/docs/cli",markdown:!0,parentName:"p"},"ShipEngine Connect CLI")," provides you with everything you need to get started with your integration application."),(0,r.kt)("blockquote",{markdown:!0},(0,r.kt)("p",{markdown:!0,parentName:"blockquote"},(0,r.kt)("strong",{markdown:!0,parentName:"p"},"INFO:")," Install ",(0,r.kt)("a",{href:"/docs/cli",markdown:!0,parentName:"p"},"ShipEngine Connect CLI")," before proceeding with this guide.")),(0,r.kt)("h2",{markdown:!0},"Using the CLI"),(0,r.kt)("ol",{markdown:!0},(0,r.kt)("li",{markdown:!0,parentName:"ol"},(0,r.kt)("p",{markdown:!0,parentName:"li"},"To create a new project, open a terminal on your computer and navigate to the directory where you would like to add your new project\nby running the following command: ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"cd my-project-directory"))),(0,r.kt)("li",{markdown:!0,parentName:"ol"},(0,r.kt)("p",{markdown:!0,parentName:"li"},"Run the following command: ",(0,r.kt)("a",{href:"/docs/cli#initialize-a-new-app",markdown:!0,parentName:"p"},(0,r.kt)("inlineCode",{markdown:!0,parentName:"a"},"connect init")))),(0,r.kt)("li",{markdown:!0,parentName:"ol"},(0,r.kt)("p",{markdown:!0,parentName:"li"},"Enter the ",(0,r.kt)("a",{href:"https://www.npmjs.com/",markdown:!0,parentName:"p"},"npm")," package name you would like to give your application. The default value is the name of the directory in which you ran the command. Type a new value for the name or press ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"Enter")," to accept the default name.")),(0,r.kt)("li",{markdown:!0,parentName:"ol"},(0,r.kt)("p",{markdown:!0,parentName:"li"},"Enter the npm package scope you would like to give your application. In most cases, you should use your company name (e.g. ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"@your-company-name"),")")),(0,r.kt)("li",{markdown:!0,parentName:"ol"},(0,r.kt)("p",{markdown:!0,parentName:"li"},"Use the arrow keys to select whether you want to create a ",(0,r.kt)("a",{href:"/docs/carrier-app",markdown:!0,parentName:"p"},"Carrier App")," or ",(0,r.kt)("a",{href:"/docs/order-app",markdown:!0,parentName:"p"},"Order App"),", then press ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"Enter"),".")),(0,r.kt)("li",{markdown:!0,parentName:"ol"},(0,r.kt)("p",{markdown:!0,parentName:"li"},"Enter a description for your application, and press ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"Enter"),".")),(0,r.kt)("li",{markdown:!0,parentName:"ol"},(0,r.kt)("p",{markdown:!0,parentName:"li"},"Enter a value to be used in the author property of your ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"package.json")," file. If you are logged into GitHub in the terminal from which you ran the command, your GitHub user information\nwill be populated as the default. Type a new author value, or press ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"Enter")," to accept the default.")),(0,r.kt)("li",{markdown:!0,parentName:"ol"},(0,r.kt)("p",{markdown:!0,parentName:"li"},"Enter a value to be used in the version property of your ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"package.json")," file. This value defaults to ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"1.0.0"),". Press ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"Enter")," to accept the default value, and then update this property in your ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"package.json")," file anytime you publish your\napplication.")),(0,r.kt)("li",{markdown:!0,parentName:"ol"},(0,r.kt)("p",{markdown:!0,parentName:"li"},"Use the arrow keys to select either ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"JavaScript")," or ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"TypeScript")," as your language and press ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"Enter"),".")),(0,r.kt)("li",{markdown:!0,parentName:"ol"},(0,r.kt)("p",{markdown:!0,parentName:"li"},"Use the arrow keys to select ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"YAML"),", ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"JSON"),", ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"JavaScript"),", or ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"TypeScript")," for your ",(0,r.kt)("a",{href:"/docs/structure#application-definition",markdown:!0,parentName:"p"},"definition files"),". Note that you can use a combination of\nthese options when you populate your definition files. This command will create them in the specified format, but you can change them before publishing your application.")),(0,r.kt)("li",{markdown:!0,parentName:"ol"},(0,r.kt)("p",{markdown:!0,parentName:"li"},"Type ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"Y")," or ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"N")," to indicate whether or not you are using ",(0,r.kt)("a",{href:"https://code.visualstudio.com/",markdown:!0,parentName:"p"},"Visual Studio Code")," for your development environment and press ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"Enter"),". When you use VS Code, ShipEngine Connect CLI provides you with a\ndebug command in the scripts section of your ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"package.json")," file and generates a ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},".vscode/launch.json")," file to faciliate ",(0,r.kt)("a",{href:"/docs/testing#visual-studio-code",markdown:!0,parentName:"p"},"debugging"),"."))),(0,r.kt)("p",{markdown:!0},(0,r.kt)("img",{src:"/img/create-first-app/cli-screenshot.png",markdown:!0,parentName:"p"})),(0,r.kt)("h2",{markdown:!0},"Your Application"),(0,r.kt)("p",{markdown:!0},"All done! You now have the application structure laid out, and you are ready to provide the implementation."),(0,r.kt)("h3",{markdown:!0},"Methods"),(0,r.kt)("p",{markdown:!0},"In the ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"src/methods")," directory, you will find a file for each ",(0,r.kt)("a",{href:"/docs/structure#methods",markdown:!0,parentName:"p"},"method")," that can be implemented by the application type you selected. Each file\ncontains a stubbed out method in the language you specified when you ran the command. It contains comments to remind you of the steps\nrequired to ",(0,r.kt)("a",{href:"/docs/implementation",markdown:!0,parentName:"p"},"implement each method"),". You aren't required to maintain this directory structure. You\ncan choose to implement all your methods in one file or choose a different directory structure. As long as your ",(0,r.kt)("a",{href:"/docs/structure#application-definition",markdown:!0,parentName:"p"},"application definition"),"\nspecifies the path to a file that exports the method, the structure is up to you. This is an example of the method stub that is generated for the ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"createShipment")," method of a ",(0,r.kt)("a",{href:"/docs/carrier-app",markdown:!0,parentName:"p"},"Carrier Application"),"."),(0,r.kt)(u,{mdxType:"CodeWrapper"},(0,r.kt)("pre",{markdown:!0},(0,r.kt)("code",{className:"language-javascript",markdown:!0,parentName:"pre"},'"use strict";\n\n/**\n * Generates a shipping label and tracking number for a shipment\n *\n * View documentation here:\n * https://connect.shipengine.com/docs/reference/methods/create-shipment\n *\n * View sample implementation here:\n * https://github.com/ShipEngine/connect-samples/blob/master/freightco/carrier/create-shipment.js\n */\nasync function createShipment(transaction, shipment) {\n  throw new Error("NotImplementedError");\n  // STEP 1: Validation\n  // STEP 2: Create the data that the carrier\'s API expects\n  // STEP 3: Call the carrier\'s API\n  // STEP 4: Create the output data that ShipEngine expects\n}\n\nmodule.exports = createShipment;\n\n')),(0,r.kt)("pre",{markdown:!0},(0,r.kt)("code",{className:"language-typescript",markdown:!0,parentName:"pre"},'import { NewShipment, ShipmentConfirmation, Transaction } from "@shipengine/connect";\nimport { Session } from "./session";\n\n/**\n * Generates a shipping label and tracking number for a shipment\n *\n * See an example implementation below\n * https://github.com/ShipEngine/connect-samples/blob/master/parcel-post/carrier/src/methods/create-shipment.ts\n */\nexport default async function createShipment(\n  transaction: Transaction<Session>,\n  shipment: NewShipment,\n): Promise<ShipmentConfirmation> {\n  throw new Error("NotImplementedError");\n  // STEP 1: Validation\n  // STEP 2: Create the data that the carrier\'s API expects\n  // STEP 3: Call the carrier\'s API\n  // STEP 4: Create the output data that ShipEngine expects\n}\n'))),(0,r.kt)("h3",{markdown:!0},"Definitions"),(0,r.kt)("p",{markdown:!0},"In the ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"src/definitions")," directory, you will find a sample file with the required properties for each type of ",(0,r.kt)("a",{href:"/docs/structure#definitions",markdown:!0,parentName:"p"},"definition")," you can provide for your application. For example,\nin a Carrier Application, you may provide one or more definitions for the following: ",(0,r.kt)("a",{href:"/docs/reference/delivery-service",markdown:!0,parentName:"p"},"delivery service"),", ",(0,r.kt)("a",{href:"/docs/reference/delivery-confirmation",markdown:!0,parentName:"p"},"delivery confirmation"),",\nand ",(0,r.kt)("a",{href:"/docs/reference/packaging",markdown:!0,parentName:"p"},"packaging"),"."),(0,r.kt)("p",{markdown:!0},"As with methods, you aren't required to maintain this directory structure. As long as your ",(0,r.kt)("a",{href:"/docs/structure#application-definition",markdown:!0,parentName:"p"},"application definition")," specifies the correct paths to the definitions you want to include, you can organize your files however you'd like.\nIn addition to the definitions for the services that are offered, running this command creates a sample application definition as well. It uses the values you provided when you ran the command along with some default values. This definition resides in an ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"index")," file in the\n",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"src")," directory. You can change the location of this file as long as you provide the correct path to it in your ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"package.json")," file."),(0,r.kt)("blockquote",{markdown:!0},(0,r.kt)("p",{markdown:!0,parentName:"blockquote"},(0,r.kt)("strong",{markdown:!0,parentName:"p"},"WARNING"),"\nOnce you have ",(0,r.kt)("a",{href:"/docs/cli#publish-your-app",markdown:!0,parentName:"p"},"published")," your app, you must not change the ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"id"),", ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"name"),", or ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"code")," properties for any of your\ndefinitions.")),(0,r.kt)("p",{markdown:!0},"This is an example of the application definition that is generated for a Carrier Application."),(0,r.kt)(u,{mdxType:"CodeWrapper"},(0,r.kt)("pre",{markdown:!0},(0,r.kt)("code",{className:"language-javascript",markdown:!0,parentName:"pre"},'module.exports = {\n  id: "bd45f17d-e32f-43d0-b397-d627bf0dbfa5",\n  name: "@shipengine/cargo-inc",\n  description: "ShipEngine Connect application for cargo-inc carrier services.",\n  websiteURL: "https://example-carrier.com",\n  logo: "./logo.svg",\n  icon: "./icon.svg",\n  manifestLocations: "single_location",\n  manifestShipments: "explicit_shipments",\n  cancelPickups: "./methods/cancel-pickups.js",\n  cancelShipments: "./methods/cancel-shipments.js",\n  createManifest: "./methods/create-manifest.js",\n  createShipment: "./methods/create-shipment.js",\n  rateShipment: "./methods/rate-shipment.js",\n  schedulePickup: "./methods/schedule-pickup.js",\n  trackShipment: "./methods/track-shipment.js",\n  deliveryServices: ["./definitions/example-delivery-service.json"],\n  pickupServices: []\n}\n')),(0,r.kt)("pre",{markdown:!0},(0,r.kt)("code",{className:"language-json",markdown:!0,parentName:"pre"},'{\n  "id": "bd45f17d-e32f-43d0-b397-d627bf0dbfa5",\n  "name": "@shipengine/cargo-inc",\n  "description": "ShipEngine Connect application for cargo-inc carrier services.",\n  "websiteURL": "https://example-carrier.com",\n  "logo": "./logo.svg",\n  "icon": "./icon.svg",\n  "manifestLocations": "single_location",\n  "manifestShipments": "explicit_shipments",\n  "cancelPickups": "./methods/cancel-pickups.js",\n  "cancelShipments": "./methods/cancel-shipments.js",\n  "createManifest": "./methods/create-manifest.js",\n  "createShipment": "./methods/create-shipment.js",\n  "rateShipment": "./methods/rate-shipment.js",\n  "schedulePickup": "./methods/schedule-pickup.js",\n  "trackShipment": "./methods/track-shipment.js",\n  "deliveryServices": ["./definitions/example-delivery-service.json"],\n  "pickupServices": []\n}\n')),(0,r.kt)("pre",{markdown:!0},(0,r.kt)("code",{className:"language-typescript",markdown:!0,parentName:"pre"},'import { CarrierDefinition } from "@shipengine/connect";\n\nconst carrier: CarrierDefinition = {\n  id: "ed16921d-678b-4d07-9921-1447e1847c1c",\n  name: "@shipengine/cargo-inc",\n  description: "ShipEngine Connect application for cargo-inc carrier services.",\n  websiteURL: "https://example-carrier.com",\n  logo: "./logo.svg",\n  icon: "./icon.svg",\n  manifestLocations: "single_location",\n  manifestShipments: "explicit_shipments",\n  cancelPickups: import("./methods/cancel-pickups"),\n  cancelShipments: import("./methods/cancel-shipments"),\n  createManifest: import("./methods/create-manifest"),\n  createShipment: import("./methods/create-shipment"),\n  rateShipment: import("./methods/rate-shipment"),\n  schedulePickup: import("./methods/schedule-pickup"),\n  trackShipment: import("./methods/track-shipment"),\n  deliveryServices: [import("./definitions/example-delivery-service")],\n  pickupServices: [],\n};\n\nexport default carrier;\n\n')),(0,r.kt)("pre",{markdown:!0},(0,r.kt)("code",{className:"language-yaml",markdown:!0,parentName:"pre"},'id: d94500ef-f81f-43ed-b4bb-e1fd8f150c7e\nname: "@shipengine/cargo-inc"\ndescription: "ShipEngine Connect application for cargo-inc carrier services."\nwebsiteURL: https://example-carrier.com\nlogo: ./logo.svg\nicon: ./icon.svg\nmanifestLocations: single_location\nmanifestShipments: explicit_shipments\ncancelPickups: ./methods/cancel-pickups.js\ncancelShipments: ./methods/cancel-shipments.js\ncreateManifest: ./methods/create-manifest.js\ncreateShipment: ./methods/create-shipment.js\nrateShipment: ./methods/rate-shipment.js\nschedulePickup: ./methods/schedule-pickup.js\ntrackShipment: ./methods/track-shipment.js\ndeliveryServices:\n  - ./definitions/example-delivery-service.yaml\npickupServices: []\n'))),(0,r.kt)("h3",{markdown:!0},"Implement"),(0,r.kt)("p",{markdown:!0},"Once you have generated the scaffolding for your application using ShipEngine Connect CLI, add your implementation for each method your application supports. Likewise, use the example service definition files to create unique definitions\nfor each of the services your application provides. Finally, update the application definition to include all the methods and definitions you have implemented."),(0,r.kt)("h3",{markdown:!0},"Test"),(0,r.kt)("p",{markdown:!0},"As you're building your app, you'll want to run it periodically so you can test and debug your code. Luckily, ",(0,r.kt)("a",{href:"/docs/cli",markdown:!0,parentName:"p"},"ShipEngine Connect CLI")," includes commands to help with this,\nsuch as ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"connect start")," and ",(0,r.kt)("inlineCode",{markdown:!0,parentName:"p"},"connect test"),". You can also write your own unit tests to exercise your code. See our ",(0,r.kt)("a",{href:"/docs/testing",markdown:!0,parentName:"p"},"testing page")," for more information."),(0,r.kt)("h3",{markdown:!0},"Publish"),(0,r.kt)("p",{markdown:!0},"Once all the generated tests pass, you will publish your application to ShipEngine Connect using the ",(0,r.kt)("a",{href:"/docs/publish",markdown:!0,parentName:"p"},(0,r.kt)("inlineCode",{markdown:!0,parentName:"a"},"connect publish"))," command. This command will publish to a development environment where your application\nwill be reviewed and further end-to-end testing may be performed before your application is published to production and made available within our suite of e-commerce solutions."),(0,r.kt)("blockquote",{markdown:!0},(0,r.kt)("p",{markdown:!0,parentName:"blockquote"},(0,r.kt)("strong",{markdown:!0,parentName:"p"},"NOTE:")," ShipEngine Connect currently runs Node.js v12")),(0,r.kt)("h2",{markdown:!0},"Sample Application References"),(0,r.kt)("p",{markdown:!0},"If you would like to see more examples of various ways to implement and structure your applications, please have a look at our ",(0,r.kt)("a",{href:"https://github.com/ShipEngine/connect-samples",markdown:!0,parentName:"p"},"sample app repo"),"."),(0,r.kt)(f,{prev:"/docs/cli",prevTitle:"Installing CLI",next:"/docs/implementation",nextTitle:"Implementing Your Methods",mdxType:"Pager"}))}g.isMDXComponent=!0},4937:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/create-first-app",function(){return t(919)}])}},function(e){e.O(0,[1783,2888,9774,179],(function(){return n=4937,e(e.s=n);var n}));var n=e.O();_N_E=n}]);