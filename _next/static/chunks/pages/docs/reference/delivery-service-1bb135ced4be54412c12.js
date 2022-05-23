(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[646],{4061:function(e,i,n){"use strict";n.r(i),n.d(i,{title:function(){return s},description:function(){return p},createdAt:function(){return m},modifiedAt:function(){return c},default:function(){return g}});var r=n(9016),a=n(3104),t=n(6687),o=n(2320),d=n(1783),l=["components"],s=(t.createElement,"Delivery Service Definition"),p="The page describes how to define a delivery service.",m=new Date(1653338063537.9844),c=new Date(1653338063537.9844),k=function(e){return function(i){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,o.kt)("div",i)}},y=k("Reference"),f=k("Field"),u=k("Type"),h=k("Description"),v=k("CodeWrapper"),w=function(e){return(0,o.kt)(d.Z,(0,a.Z)({title:"Delivery Service Definition",description:"The page describes how to define a delivery service.",createdAt:new Date(1653338063538),modifiedAt:new Date(1653338063538)},e))};function g(e){var i=e.components,n=(0,r.Z)(e,l);return(0,o.kt)(w,(0,a.Z)({},n,{components:i,mdxType:"MDXLayout"}),(0,o.kt)("h1",{markdown:!0},"Delivery Service Definition"),(0,o.kt)("p",{markdown:!0},'A Delivery Service is a type of delivery that is offered by a carrier, such as "international" or "standard overnight". Each delivery service that is offered must be defined\nin its own delivery service definition file. This file can reside anywhere within your application as long as its location is specified in the ',(0,o.kt)("a",{href:"/docs/reference/carrier",markdown:!0,parentName:"p"},"Carrier Application Definition")," file.\nThe definition may be specified in ",(0,o.kt)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript",markdown:!0,parentName:"p"},"JavaScript"),", ",(0,o.kt)("a",{href:"https://www.typescriptlang.org/",markdown:!0,parentName:"p"},"TypeScript"),", ",(0,o.kt)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON",markdown:!0,parentName:"p"},"JSON"),", or\n",(0,o.kt)("a",{href:"https://en.wikipedia.org/wiki/YAML",markdown:!0,parentName:"p"},"YAML"),"."),(0,o.kt)("p",{markdown:!0},"These delivery service definitions will be used by the ",(0,o.kt)("a",{href:"/docs",markdown:!0,parentName:"p"},"ShipEngine Connect")," to display delivery service options within our suite of e-commerce applications when your carrier is used."),(0,o.kt)("blockquote",{markdown:!0},(0,o.kt)("p",{markdown:!0,parentName:"blockquote"},(0,o.kt)("strong",{markdown:!0,parentName:"p"},"WARNING:")," Once you have published your app, you must not change the ",(0,o.kt)("inlineCode",{markdown:!0,parentName:"p"},"id"),", ",(0,o.kt)("inlineCode",{markdown:!0,parentName:"p"},"name")," or ",(0,o.kt)("inlineCode",{markdown:!0,parentName:"p"},"code")," for any of your definitions.")),(0,o.kt)("h2",{markdown:!0},"Delivery Service Properties"),(0,o.kt)(y,{mdxType:"Reference"},(0,o.kt)(f,{name:"id",required:!0,mdxType:"Field"},(0,o.kt)(u,{mdxType:"Type"},(0,o.kt)("p",{markdown:!0},(0,o.kt)("a",{href:"https://www.npmjs.com/package/uuid",markdown:!0,parentName:"p"},"UUID"))),(0,o.kt)(h,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"UUID that uniquely identifies the delivery service. This ID should never change."))),(0,o.kt)(f,{name:"identifiers",type:"object",required:!1,mdxType:"Field"},(0,o.kt)(h,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"Your own identifiers for this delivery service."))),(0,o.kt)(f,{name:"code",type:"string",required:!0,mdxType:"Field"},(0,o.kt)(h,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"Code used to map to what the carrier uses to identify the delivery service."))),(0,o.kt)(f,{name:"name",type:"string",required:!0,mdxType:"Field"},(0,o.kt)(h,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},'The user-friendly service name (e.g. "Priority Overnight", "2-Day Air").'))),(0,o.kt)(f,{name:"description",type:"string",required:!1,mdxType:"Field"},(0,o.kt)(h,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"A short, user-friendly description of the service."))),(0,o.kt)(f,{name:"fulfillmentService",type:"string",required:!1,mdxType:"Field"},(0,o.kt)(h,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"A well-known ",(0,o.kt)("a",{href:"/docs/reference/fulfillment-service",markdown:!0,parentName:"p"},"fulfillment service"),' that\'s used to fulfill this delivery service, such as "fedex_ground".'))),(0,o.kt)(f,{name:"serviceArea",type:"string",required:!1,mdxType:"Field"},(0,o.kt)(h,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The service area this delivery service covers. Valid values include the following:"),(0,o.kt)("ul",{markdown:!0},(0,o.kt)("li",{markdown:!0,parentName:"ul"},(0,o.kt)("inlineCode",{markdown:!0,parentName:"li"},"regional")," - Delivery based on the shipment's distance to its destination. Rates typically vary by zone."),(0,o.kt)("li",{markdown:!0,parentName:"ul"},(0,o.kt)("inlineCode",{markdown:!0,parentName:"li"},"domestic")," - Delivery with an origin address and a destination address within the same country."),(0,o.kt)("li",{markdown:!0,parentName:"ul"},(0,o.kt)("inlineCode",{markdown:!0,parentName:"li"},"international")," - Delivery to a from address in at least one other country."),(0,o.kt)("li",{markdown:!0,parentName:"ul"},(0,o.kt)("inlineCode",{markdown:!0,parentName:"li"},"global")," - Delivery to a from address anywhere in the world.")))),(0,o.kt)(f,{name:"isConsolidationService",type:"boolean",required:!0,mdxType:"Field"},(0,o.kt)(h,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"Indicates whether this delivery service is a consolidation of multiple carrier services."))),(0,o.kt)(f,{name:"allowsMultiplePackages",type:"boolean",required:!0,mdxType:"Field"},(0,o.kt)(h,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"Indicates whether the delivery service allows multiple packages in a single shipment."))),(0,o.kt)(f,{name:"isInsurable",type:"boolean",required:!0,mdxType:"Field"},(0,o.kt)(h,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"Indicates whether shippers can purchase insurance from the carrier for this delivery service."))),(0,o.kt)(f,{name:"isTrackable",type:"boolean",required:!0,mdxType:"Field"},(0,o.kt)(h,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"Indicates whether tracking numbers are provided by this delivery service."))),(0,o.kt)(f,{name:"supportsReturns",type:"boolean",required:!1,mdxType:"Field"},(0,o.kt)(h,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"Indicates whether the carrier supports return shipments. Defaults to ",(0,o.kt)("inlineCode",{markdown:!0,parentName:"p"},"false")," if not specified."))),(0,o.kt)(f,{name:"labelFormats",type:"string[]",required:!0,mdxType:"Field"},(0,o.kt)(h,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The list of label formats that are offered for this delivery service. Valid values include the following:"),(0,o.kt)("ul",{markdown:!0},(0,o.kt)("li",{markdown:!0,parentName:"ul"},(0,o.kt)("inlineCode",{markdown:!0,parentName:"li"},"pdf")," - Potable Document Format (PDF)"),(0,o.kt)("li",{markdown:!0,parentName:"ul"},(0,o.kt)("inlineCode",{markdown:!0,parentName:"li"},"zpl")," - Zebra Printer Label (ZPL)"),(0,o.kt)("li",{markdown:!0,parentName:"ul"},(0,o.kt)("inlineCode",{markdown:!0,parentName:"li"},"png")," - Portable Graphics Format (PNG)")))),(0,o.kt)(f,{name:"labelSizes",type:"string[]",required:!0,mdxType:"Field"},(0,o.kt)(h,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The list of label sizes that are offered for this delivery service. Valid values include the following:"),(0,o.kt)("ul",{markdown:!0},(0,o.kt)("li",{markdown:!0,parentName:"ul"},(0,o.kt)("inlineCode",{markdown:!0,parentName:"li"},"A4")," - A4 sized paper. 8.27 inches x 11.69 inches."),(0,o.kt)("li",{markdown:!0,parentName:"ul"},(0,o.kt)("inlineCode",{markdown:!0,parentName:"li"},"letter")," - Letter sized paper. 8.5 inches by 11 inches."),(0,o.kt)("li",{markdown:!0,parentName:"ul"},(0,o.kt)("inlineCode",{markdown:!0,parentName:"li"},"4x6")," - Paper sized 4 inches by 6 inches."),(0,o.kt)("li",{markdown:!0,parentName:"ul"},(0,o.kt)("inlineCode",{markdown:!0,parentName:"li"},"4x8")," - Paper sized 4 inches by 8 inches.")))),(0,o.kt)(f,{name:"availableCountries",type:"string[]",required:!0,mdxType:"Field"},(0,o.kt)(h,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The seller's home ",(0,o.kt)("a",{href:"/docs/reference/country-codes",markdown:!0,parentName:"p"},"countries")," in ",(0,o.kt)("a",{href:"https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes",markdown:!0,parentName:"p"},"ISO 3166-1 alpha-2 format")," that should have access to this service."))),(0,o.kt)(f,{name:"packaging",type:"string[]",required:!0,mdxType:"Field"},(0,o.kt)(h,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The types of packaging that are offered for this delivery service. This property should contain the paths to the packaging definition files for the packaging types that are valid for this delivery confirmation type."))),(0,o.kt)(f,{name:"deliveryConfirmation",required:!0,mdxType:"Field"},(0,o.kt)(u,{mdxType:"Type"},(0,o.kt)("p",{markdown:!0},(0,o.kt)("a",{href:"/docs/reference/delivery-confirmation",markdown:!0,parentName:"p"},"Delivery Confirmation"),"[] or string[]")),(0,o.kt)(h,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The types of ",(0,o.kt)("a",{href:"/docs/reference/delivery-confirmation",markdown:!0,parentName:"p"},"delivery confirmations")," offered for this delivery service. This property may define the delivery confirmations directly inline, following the ",(0,o.kt)("a",{href:"/docs/reference/delivery-confirmation",markdown:!0,parentName:"p"},"delivery confirmation")," format. It may also contain a list of paths to files that define the delivery confirmations available. Defining your delivery confirmations inside definition files allows you to reference those delivery confirmation definitions in multiple delivery service definition files."))),(0,o.kt)(f,{name:"manifestType",type:"string",required:!1,mdxType:"Field"},(0,o.kt)(h,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"Indicates whether the service supports digital or physical manifests. Valid values include the following:"),(0,o.kt)("ul",{markdown:!0},(0,o.kt)("li",{markdown:!0,parentName:"ul"},(0,o.kt)("inlineCode",{markdown:!0,parentName:"li"},"physical")," - This service will require physical documents even if the carrier default is digital transmission."),(0,o.kt)("li",{markdown:!0,parentName:"ul"},(0,o.kt)("inlineCode",{markdown:!0,parentName:"li"},"digital")," - This service will ",(0,o.kt)("em",{markdown:!0,parentName:"li"},"not")," require physical documents even if the carrier default is for physical documents."))))),(0,o.kt)("h2",{markdown:!0},"Examples"),(0,o.kt)(v,{mdxType:"CodeWrapper"},(0,o.kt)("pre",{markdown:!0},(0,o.kt)("code",{className:"language-yaml",markdown:!0,parentName:"pre"},"id: 43fc9d24-6a89-428a-ad34-c614c14170b6\nidentifiers:\n  apiCode: ECO\ncode: ECO\nname: International Economy\ndescription: Worldwide delivery at an affordable price\nserviceArea: global\nisConsolidationService: true\nisTrackable: false\nisInsurable: true\nsupportsReturns: false\nmanifestType: digital\n\nlabelFormats:\n  - pdf\n\nlabelSizes:\n  - A4\n  - letter\n\navailableCountries: north-america.yaml\n\npackaging:\n  - ../packaging/package.yaml\n  - ../packaging/pallet.yaml\n\ndeliveryConfirmations:\n  - ../delivery-confirmations/signature-required.yaml\n  - ../delivery-confirmations/adult-signature.yaml\n  - ../delivery-confirmations/recipient-signature.yaml\n")),(0,o.kt)("pre",{markdown:!0},(0,o.kt)("code",{className:"language-javascript",markdown:!0,parentName:"pre"},'{\n    id: "43fc9d24-6a89-428a-ad34-c614c14170b6",\n    identifiers: {\n        apiCode: "ECO"\n    },\n    code: "IEC",\n    name: "International Economy",\n    description: "Worldwide delivery at an affordable price",\n    serviceArea: "global",\n    isConsolidationService: true,\n    isTrackable: false,\n    isInsurable: true,\n    supportsReturns: false,\n    manifestType: "digital",\n    labelFormats:[\n        "pdf"\n    ],\n    labelSizes: [\n        "A4",\n        "letter"\n    ],\n    availableCountries: "north-america.yaml",\n    packaging: [\n        "../packaging/package.yaml",\n        "../packaging/pallet.yaml"\n    ],\n    deliveryConfirmations: [\n         "../delivery-confirmations/signature-required.yaml",\n         "../delivery-confirmations/adult-signature.yaml",\n         "../delivery-confirmations/recipient-signature.yaml"\n    ]\n}\n')),(0,o.kt)("pre",{markdown:!0},(0,o.kt)("code",{className:"language-typescript",markdown:!0,parentName:"pre"},'import {\n  Country,\n  DeliveryServiceClass,\n  DeliveryServiceDefinition,\n  DeliveryServiceGrade,\n  DocumentFormat,\n  DocumentSize,\n  ServiceArea,\n} from "@shipengine/connect";\n\nconst internationalEconomyDeliveryService: DeliveryServiceDefinition = {\n  id: "43fc9d24-6a89-428a-ad34-c614c14170b6",\n  code: "IEC",\n  name: "International Economy",\n  description:\n    "Worldwide delivery at an affordable price",\n  deliveryConfirmations: [import("./signature-delivery-confirmation")],\n  isInsurable: true,\n  isTrackable: false,\n  manifestType: digital,\n  supportsReturns: false,\n  labelFormats: [DocumentFormat.PDF, DocumentFormat.PNG],\n  labelSizes: [DocumentSize.Letter, DocumentSize.Inches4x6],\n  availableCountries: [Country.UnitedStates],\n  packaging: [import("./package-packaging")],\n  serviceArea: ServiceArea.domestic,\n};\n\nexport default internationalEconomyDeliveryService;\n\n')),(0,o.kt)("pre",{markdown:!0},(0,o.kt)("code",{className:"language-json",markdown:!0,parentName:"pre"},'{\n  "id": "43fc9d24-6a89-428a-ad34-c614c14170b6",\n  "name": "International Economy",\n  "code": "IEC",\n  "description": "Worldwide delivery at an affordable price",\n  "deliveryConfirmations": ["./signature-delivery-confirmation.json"],\n  "isInsurable": true,\n  "isTrackable": false,\n  "supportsReturns": false,\n  "manifestType": "digital",\n  "labelFormats": ["pdf"],\n  "labelSizes": ["4x8"],\n  "availableCountries": ["US", "CA", "MX"],\n  "packaging": ["./package-packaging.json"],\n  "serviceArea": "international"\n}\n'))))}g.isMDXComponent=!0},8854:function(e,i,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/reference/delivery-service",function(){return n(4061)}])}},function(e){e.O(0,[1783,2888,9774,179],(function(){return i=8854,e(e.s=i);var i}));var i=e.O();_N_E=i}]);