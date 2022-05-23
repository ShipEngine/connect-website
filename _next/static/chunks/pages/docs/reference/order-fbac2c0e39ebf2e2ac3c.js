(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[714],{1264:function(e,t,n){"use strict";n.r(t),n.d(t,{title:function(){return s},description:function(){return m},createdAt:function(){return c},modifiedAt:function(){return l},default:function(){return T}});var o=n(9016),r=n(3104),i=n(6687),a=n(2320),d=n(1783),p=["components"],s=(i.createElement,"Order Application Definition"),m="The page describes how to define an Order application.",c=new Date(1653338063541.9846),l=new Date(1653338063541.9846),h=function(e){return function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,a.kt)("div",t)}},k=h("Reference"),f=h("Field"),u=h("Type"),y=h("Description"),w=h("CodeWrapper"),g=function(e){return(0,a.kt)(d.Z,(0,r.Z)({title:"Order Application Definition",description:"The page describes how to define an Order application.",createdAt:new Date(1653338063542),modifiedAt:new Date(1653338063542)},e))};function T(e){var t=e.components,n=(0,o.Z)(e,p);return(0,a.kt)(g,(0,r.Z)({},n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{markdown:!0},"Order Application Definition"),(0,a.kt)("p",{markdown:!0},"The Order Application Definition file tells the ",(0,a.kt)("a",{href:"/docs",markdown:!0,parentName:"p"},"ShipEngine Connect")," where to find the resources that define\nyour application, such as methods and forms."),(0,a.kt)("p",{markdown:!0},"This file can reside anywhere within your application as long as its location is specified\nin the ",(0,a.kt)("inlineCode",{markdown:!0,parentName:"p"},"main")," property of your ",(0,a.kt)("inlineCode",{markdown:!0,parentName:"p"},"package.json")," file.\nThe definition may be specified in ",(0,a.kt)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript",markdown:!0,parentName:"p"},"JavaScript"),", ",(0,a.kt)("a",{href:"https://www.typescriptlang.org/",markdown:!0,parentName:"p"},"TypeScript"),", ",(0,a.kt)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON",markdown:!0,parentName:"p"},"JSON"),", or\n",(0,a.kt)("a",{href:"https://en.wikipedia.org/wiki/YAML",markdown:!0,parentName:"p"},"YAML"),"."),(0,a.kt)("blockquote",{markdown:!0},(0,a.kt)("p",{markdown:!0,parentName:"blockquote"},(0,a.kt)("strong",{markdown:!0,parentName:"p"},"WARNING:")," Once you have published your app, you must not change the ",(0,a.kt)("inlineCode",{markdown:!0,parentName:"p"},"id")," or ",(0,a.kt)("inlineCode",{markdown:!0,parentName:"p"},"name")," of the app.")),(0,a.kt)("h2",{markdown:!0},"Order Application"),(0,a.kt)(k,{mdxType:"Reference"},(0,a.kt)(f,{name:"id",required:!0,mdxType:"Field"},(0,a.kt)(u,{mdxType:"Type"},(0,a.kt)("p",{markdown:!0},(0,a.kt)("a",{href:"https://www.npmjs.com/package/uuid",markdown:!0,parentName:"p"},"UUID"))),(0,a.kt)(y,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"A UUID that uniquely identifies the application for internal ShipEngine Connect purposes. This ID should never change."))),(0,a.kt)(f,{name:"providerId",required:!1,mdxType:"Field"},(0,a.kt)(u,{mdxType:"Type"},(0,a.kt)("p",{markdown:!0},(0,a.kt)("a",{href:"https://www.npmjs.com/package/uuid",markdown:!0,parentName:"p"},"UUID"))),(0,a.kt)(y,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"A UUID that is used to relate this app to an existing production application. Do not set this field unless instructed to by the ShipEngine Connect team."))),(0,a.kt)(f,{name:"name",type:"string",required:!0,mdxType:"Field"},(0,a.kt)(y,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The user-friendly name for this Order application."))),(0,a.kt)(f,{name:"description",type:"string",required:!1,mdxType:"Field"},(0,a.kt)(y,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"A short, user-friendly description of this Order application."))),(0,a.kt)(f,{name:"websiteURL",type:"string",required:!0,mdxType:"Field"},(0,a.kt)(y,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The URL of your company's website."))),(0,a.kt)(f,{name:"logo",type:"string",required:!0,mdxType:"Field"},(0,a.kt)(y,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The file path to your company's logo image."))),(0,a.kt)(f,{name:"icon",type:"string",required:!0,mdxType:"Field"},(0,a.kt)(y,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The file path to the Carrier's icon image."))),(0,a.kt)(f,{name:"sendMail",type:"boolean",required:!1,mdxType:"Field"},(0,a.kt)(y,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Indicates whether or not emails should be sent to communicate shipping updates on behalf of the seller for orders imported through this Order App."))),(0,a.kt)(f,{name:"canConfigureTimeZone",type:"boolean",required:!1,mdxType:"Field"},(0,a.kt)(y,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"Indicates whether or not to display time zone related settings when this app is used within one of our e-commerce applications, such as ShipStation."))),(0,a.kt)(f,{name:"connectionForm",required:!0,mdxType:"Field"},(0,a.kt)(u,{mdxType:"Type"},(0,a.kt)("p",{markdown:!0},(0,a.kt)("a",{href:"/docs/reference/forms",markdown:!0,parentName:"p"},"Form"))),(0,a.kt)(y,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"A form that allows the user to specify the credentials needed to generate the OAuth token."))),(0,a.kt)(f,{name:"getSalesOrdersByDate",required:!1,mdxType:"Field"},(0,a.kt)(u,{mdxType:"Type"},(0,a.kt)("p",{markdown:!0},"method ",(0,a.kt)("em",{markdown:!0,parentName:"p"},"or")," string")),(0,a.kt)(y,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"A method that returns all orders that were created and/or modified within a given time frame. You may define this method direcly inline inside of this file or you may specify the path to the file that exports your ",(0,a.kt)("a",{href:"/docs/reference/methods/get-sales-orders-by-date",markdown:!0,parentName:"p"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"a"},"getSalesOrdersByDate"))," method."))),(0,a.kt)(f,{name:"shipmentCreated",required:!1,mdxType:"Field"},(0,a.kt)(u,{mdxType:"Type"},(0,a.kt)("p",{markdown:!0},"method ",(0,a.kt)("em",{markdown:!0,parentName:"p"},"or")," string")),(0,a.kt)(y,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"A method that's called when a shipment is created for one or more items in one or more sales orders. A single shipment may contain items from multiple sales orders, and a single sales order may be fulfilled by multiple shipments. You may define this method direcly inline inside of this file or you may specify the path to the file that exports your ",(0,a.kt)("a",{href:"/docs/reference/methods/shipment-created",markdown:!0,parentName:"p"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"a"},"shipmentCreated"))," method."))),(0,a.kt)(f,{name:"acknowledgeOrders",required:!1,mdxType:"Field"},(0,a.kt)(u,{mdxType:"Type"},(0,a.kt)("p",{markdown:!0},"method ",(0,a.kt)("em",{markdown:!0,parentName:"p"},"or")," string")),(0,a.kt)(y,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"A method that's called when a shipment is cancelled for one or more items in one or more sales orders. A single shipment may contain items from multiple sales orders, and a single sales order may be fulfilled by multiple shipments. You may define this method direcly inline inside of this file or you may specify the path to the file that exports your ",(0,a.kt)("a",{href:"/docs/reference/methods/shipment-cancelled",markdown:!0,parentName:"p"},(0,a.kt)("inlineCode",{markdown:!0,parentName:"a"},"shipmentCancelled"))," method."))),(0,a.kt)(f,{name:"oauthConfig",required:!1,mdxType:"Field"},(0,a.kt)(u,{mdxType:"Type"},(0,a.kt)("p",{markdown:!0},"object ",(0,a.kt)("em",{markdown:!0,parentName:"p"},"or")," string")),(0,a.kt)(y,{mdxType:"Description"},(0,a.kt)("p",{markdown:!0},"The ",(0,a.kt)("a",{href:"/docs/oauth/oauth-config",markdown:!0,parentName:"p"},"OAuth Config Definition")," that describes the authorization process. This can be defined directly inline inside this file or you may specify the path to a separate OAuth Config Definition file.")))),(0,a.kt)("h2",{markdown:!0},"Examples"),(0,a.kt)(w,{mdxType:"CodeWrapper"},(0,a.kt)("pre",{markdown:!0},(0,a.kt)("code",{className:"language-typescript",markdown:!0,parentName:"pre"},'import { OrderAppDefinition } from "@shipengine/connect";\n\nconst orderSource: OrderAppDefinition = {\n  id: "5e386891-f693-4cdf-8b0c-82d7eb7542d0",\n  name: "IBuy MarketPlace",\n  description: "Welcome to iBuy, the international marketplace for all of your needs.",\n  websiteURL: "https://www.iBuy.net",\n  logo: "./../logo.svg",\n  icon: "./../icon.svg",\n  connectionForm: import("./forms/connect"),\n\n  getSalesOrdersByDate: import("./methods/get-sales-orders-by-date"),\n  shipmentCreated: import("./methods/shipment-created"),\n  acknowledgeOrders: import("./methods/acknowledge-orders"),\n  sendMail: false,\n  canConfigureTimeZone: false,\n  oauthConfig: import("./oauth-config"\n}\n\nexport default orderSource;\n')),(0,a.kt)("pre",{markdown:!0},(0,a.kt)("code",{className:"language-javascript",markdown:!0,parentName:"pre"},'const orderSource = {\n  id: "5e386891-f693-4cdf-8b0c-82d7eb7542d0",\n  name: "IBuy MarketPlace",\n  description: "Welcome to iBuy, the international marketplace for all of your needs.",\n  websiteURL: "https://www.iBuy.net",\n  logo: "./../logo.svg",\n  icon: "./../icon.svg",\n  connectionForm: "./forms/connect.js",\n\n  getSalesOrdersByDate: "./methods/get-sales-orders-by-date.js",\n  shipmentCreated: "./methods/shipment-created.js",\n  acknowledgeOrders: "./methods/acknowledge-orders.js",\n  sendMail: false,\n  canConfigureTimeZone: false,\n  oauthConfig: "./definitions/oauth-config.js"\n}\n\nmodule.exports = orderSource;\n')),(0,a.kt)("pre",{markdown:!0},(0,a.kt)("code",{className:"language-yaml",markdown:!0,parentName:"pre"},"id: 5e386891-f693-4cdf-8b0c-82d7eb7542d0\n\nname: IBuy MarketPlace\n\ndescription:  Welcome to iBuy, the international marketplace for all of your needs.\n\nwebsiteURL: https://www.ibuy.net\n\nlogo: ./../logo.svg\n\nicon: ./../icon.svg\n\nconnectionForm: ./forms/connection-form.js\n\ngetSalesOrdersByDate: ./methods/get-sales-orders-by-date.js\nshipmentCreated: ./methods/shipment-created.js\nacknowledgeOrders: ./methods/acknowledge-orders.js\n\nsendMail: false\ncanConfigureTimeZone: false\n\noauthConfig: ./definitions/oauth-config.js\n"))))}T.isMDXComponent=!0},3066:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/reference/order",function(){return n(1264)}])}},function(e){e.O(0,[1783,2888,9774,179],(function(){return t=3066,e(e.s=t);var t}));var t=e.O();_N_E=t}]);