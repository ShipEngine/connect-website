(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2404],{2089:function(e,a,n){"use strict";n.r(a),n.d(a,{title:function(){return l},description:function(){return d},image:function(){return p},createdAt:function(){return w},modifiedAt:function(){return u},default:function(){return N}});var t=n(9016),r=n(3104),i=n(6687),m=n(2320),o=n(1783),k=["components"],l=(i.createElement,"v1.0.2 Changelog"),d="This page describes what changed in @shipengine/connect v1.0.2",p="/img/changelog/card.png",w=new Date(1653338063533.9841),u=new Date(1653338063533.9841),s=function(e){return(0,m.kt)(o.Z,(0,r.Z)({title:"v1.0.2 Changelog",description:"This page describes what changed in @shipengine/connect v1.0.2",image:"/img/changelog/card.png",createdAt:new Date(1653338063534),modifiedAt:new Date(1653338063534)},e))};function N(e){var a=e.components,n=(0,t.Z)(e,k);return(0,m.kt)(s,(0,r.Z)({},n,{components:a,mdxType:"MDXLayout"}),(0,m.kt)("h1",{markdown:!0},"Changelog ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"h1"},"v1.0.2")," ",(0,m.kt)("small",null,"(2020-08-31)")),(0,m.kt)("p",{markdown:!0},"Previous to version ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"p"},"v1.0.2"),' there were so many changes in flux that we were unable to maintain a meticulous changelog. Those changes for the most part have settled and moving forward the changelog will be the place of "truth" as to what has changed in the connect SDK and connect CLI.'),(0,m.kt)("h2",{markdown:!0},"Overall Changes"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},"HTML label format is no longer supported"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Removed geo-coordinates from all Address properties"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Removed support for Localization"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Updated ",(0,m.kt)("a",{href:"/docs/cli",markdown:!0,parentName:"li"},"CLI")," namespace. You should uninstall the old one before the latest version."),(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Removed ",(0,m.kt)("a",{href:"/docs/reference/common-types#notes-types",markdown:!0,parentName:"li"},"NotesType")," not supported by ShipStation."),(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Removed ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"POJO"))),(0,m.kt)("h3",{markdown:!0},"Transaction Object"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Removed ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"isRetry"))),(0,m.kt)("h3",{markdown:!0},"CLI"),(0,m.kt)("p",{markdown:!0},"The name of the CLI NPM package has changed. You may need to run both uninstall commands to make sure you have removed all previous versions\nof the CLI before installing the latest version."),(0,m.kt)("pre",{markdown:!0},(0,m.kt)("code",{markdown:!0,parentName:"pre"},"npm uninstall @shipengine/connect-cli --global\nnpm uninstall @shipengine/connect-cli --global\n\nnpm install @shipengine/connect-cli --global\n")),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("a",{href:"/docs/cli",markdown:!0,parentName:"li"},"CLI")," commands are no longer prefaced with ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"apps:"),". The documentation has been updated."),(0,m.kt)("li",{markdown:!0,parentName:"ul"},"The ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"shipengine test")," command has changed. We are in the process of updating the documentation for this.")),(0,m.kt)("h2",{markdown:!0},"Carrier App"),(0,m.kt)("p",{markdown:!0},"These changes affect the ",(0,m.kt)("a",{href:"/docs/carrier-app",markdown:!0,parentName:"p"},"Carrier App"),"."),(0,m.kt)("h3",{markdown:!0},(0,m.kt)("a",{href:"/docs/reference/carrier",markdown:!0,parentName:"h3"},"Carrier App Definition")),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Added an ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"icon")," property similar to the logo property."),(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Added a ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"manifestType")," property."),(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Added a ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"trackingURLTemplate")," property")),(0,m.kt)("h3",{markdown:!0},(0,m.kt)("a",{href:"/docs/reference/methods/create-shipment",markdown:!0,parentName:"h3"},"createShipment()")," Method"),(0,m.kt)("h4",{markdown:!0},"Parameter: ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"h4"},"NewShipment")),(0,m.kt)("h4",{markdown:!0},"Removed properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"outboundShipment")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.contents.quantity.unit")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.deliveryConfirmation")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"documents"))),(0,m.kt)("h4",{markdown:!0},"Added properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryService.supportsReturns")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryConfirmation")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"label")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"form"))),(0,m.kt)("h4",{markdown:!0},"Changes:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.customs.contents.unitValue.value")," -  now a number rather than a string"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.customs.contents.unitValue.currency")," - now accepts any string rather than an enum value"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.customs.contents.totalValue.value")," - now a number rather than a string"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.customs.contents.totalValue.currency")," - now accepts any string rather than an enum value"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.contents.unitPrice.value")," - now a number rather than a string"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.contents.unitPrice.currency")," - now accepts any string rather than an enum value"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.contents.totalPrice.value")," - now a number rather than a string"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.contents.totalPrice.currency")," - now accepts any string rather than an enum value")),(0,m.kt)("h4",{markdown:!0},"Return Value: ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"h4"},"ShipmentConfirmation")),(0,m.kt)("h4",{markdown:!0},"Removed properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryWindow")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"fulfillmentService")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"zone")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"isGuarnteed")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"isNegotiatedRate")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"minimumDeliveryDays")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"maximumDeliveryDays")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"metadata")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"trackingURL")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.trackingURL")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.documents")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.label")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.customForm")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"billing")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.code")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.description")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.notes")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.customs.contents.unitValue.unit")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.customs.contents.totalValue.unit")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.deliveryConfirmation"))),(0,m.kt)("h4",{markdown:!0},"Added properties: (moved from the packages property up a level)"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"documents")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"label")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"customsForm"))),(0,m.kt)("h4",{markdown:!0},"Changes:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.insuredValue.value")," - now a number rather than a string"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.insuredValue.currency")," - now accepts any string rather than an enum value"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.amount.value")," - now accepts a number rather than a string"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.amount.value.currency")," - now accepts any string rather than an enum value")),(0,m.kt)("h3",{markdown:!0},(0,m.kt)("a",{href:"/docs/reference/methods/rate-shipment",markdown:!0,parentName:"h3"},"rateShipment()")," Method"),(0,m.kt)("h4",{markdown:!0},"Parameter: ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"h4"},"RateCriteria")),(0,m.kt)("h4",{markdown:!0},"Removed properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"outboundShipment")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryWindow")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"fulfillmentService")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"zone")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"isGuaranteed")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"minimumDeliveryDays")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"maximumDeliveryDays")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"totalInsuredValue")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"package.deliveryConfirmation"))),(0,m.kt)("h4",{markdown:!0},"Added properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryService.supportsReturns")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryService.manifestType")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryConfirmation"))),(0,m.kt)("h4",{markdown:!0},"Changes:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Renamed ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryServices")," to ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryService")," and changed it from an array to a single object"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Renamed ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"fulfillmentServices")," to ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"fulfillmentService")," and changed it from an array to a single object"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("del",{markdown:!0,parentName:"li"},"totalInsuredValue.value - now a number rather than a string")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("del",{markdown:!0,parentName:"li"},"totalInsuredValue.currency - now accepts any string rather than an enum value")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("del",{markdown:!0,parentName:"li"},"Renamed packages to package and changed it from an array to a single object")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Changed ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages.packaging")," from an array to a string")),(0,m.kt)("h4",{markdown:!0},"Return Value: ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"h4"},"Rate")),(0,m.kt)("h4",{markdown:!0},"Removed properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.code")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.description")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.notes"))),(0,m.kt)("h4",{markdown:!0},"Added properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryService.supportsReturns")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryService.manifestType")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryConfirmation"))),(0,m.kt)("h4",{markdown:!0},"Changes:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.amount.value")," - now accepts a number rather than a string"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.amount.value.currency")," - now accepts any string rather than an enum value"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryService")," now acceptes an object or a string containing the ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"code"),"."),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryConfirmation")," now accepts an object or a string containing the ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"code")," or the ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"type"),".")),(0,m.kt)("h3",{markdown:!0},(0,m.kt)("a",{href:"/docs/reference/methods/track-shipment",markdown:!0,parentName:"h3"},"trackShipment()")),(0,m.kt)("h3",{markdown:!0},"Return Value: ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"h3"},"TrackingInfo")),(0,m.kt)("h4",{markdown:!0},"Added properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages[].packaging.deliveryService.supportsReturns")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages[].packaging.deliveryService.manifestType"))),(0,m.kt)("h4",{markdown:!0},"Changes:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages[].packaging")," now acceptes an object or a string containing the ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"code"),".")),(0,m.kt)("h3",{markdown:!0},(0,m.kt)("a",{href:"/docs/reference/methods/schedule-pickup",markdown:!0,parentName:"h3"},"schedulePickup()")),(0,m.kt)("h4",{markdown:!0},"Parameter: ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"h4"},"PickupRequest")),(0,m.kt)("h4",{markdown:!0},"Added properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"pickupService.shipments[].deliveryService.supportsReturns")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"pickupService.shipments[].deliveryService.manifestType"))),(0,m.kt)("h4",{markdown:!0},"Removed properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contact.phoneExtension"))),(0,m.kt)("h4",{markdown:!0},"Return Value: ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"h4"},"PickupConfirmation")),(0,m.kt)("h4",{markdown:!0},"Removed properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.code")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.description")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.notes"))),(0,m.kt)("h4",{markdown:!0},"Changes:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.amount.value")," - now accepts a number rather than a string"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.amount.value.currency")," - now accepts any string rather than an enum value")),(0,m.kt)("h3",{markdown:!0},(0,m.kt)("a",{href:"/docs/reference/methods/cancel-pickups",markdown:!0,parentName:"h3"},"cancelPickup()")),(0,m.kt)("h4",{markdown:!0},"Parameter: ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"h4"},"PickupCancellation")),(0,m.kt)("h4",{markdown:!0},"Added properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"shipments[].deliveryService.supportsReturns")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"shipments[].deliveryService.manifestType"))),(0,m.kt)("h4",{markdown:!0},"Removed properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contact.phoneExtension"))),(0,m.kt)("h3",{markdown:!0},"Definition Changes"),(0,m.kt)("p",{markdown:!0},(0,m.kt)("a",{href:"/docs/reference/delivery-service",markdown:!0,parentName:"p"},"Delivery Service")),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Added ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"supportsReturns")," property."),(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Added  ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"manifestType")," property."),(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Added ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"code")," property.")),(0,m.kt)("p",{markdown:!0},(0,m.kt)("a",{href:"/docs/reference/pickup-service",markdown:!0,parentName:"p"},"Pickup Service")),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Added ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"code")," property.")),(0,m.kt)("p",{markdown:!0},(0,m.kt)("a",{href:"/docs/reference/packaging",markdown:!0,parentName:"p"},"Packaging")),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Added ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"code")," property.")),(0,m.kt)("p",{markdown:!0},(0,m.kt)("a",{href:"/docs/reference/delivery-confirmation",markdown:!0,parentName:"p"},"Delivery Confirmation")),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Added ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"code")," property.")),(0,m.kt)("h2",{markdown:!0},"Order  App"),(0,m.kt)("p",{markdown:!0},"These changes affect the ",(0,m.kt)("a",{href:"/docs/order-app",markdown:!0,parentName:"p"},"Order App"),"."),(0,m.kt)("h3",{markdown:!0},"Overall Changes"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Removed ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryDateTime")," from ",(0,m.kt)("a",{href:"/docs/reference/shipping-preferences",markdown:!0,parentName:"li"},"Shipping Preferences"))),(0,m.kt)("h3",{markdown:!0},(0,m.kt)("a",{href:"/docs/reference/order",markdown:!0,parentName:"h3"},"Order App Definition")),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Added an icon property similar to the logo property."),(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Added a ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"sendEmail")," property"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},"Added a ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"configureTimeZone")," property")),(0,m.kt)("h3",{markdown:!0},(0,m.kt)("a",{href:"/docs/reference/methods/get-sales-orders-by-date",markdown:!0,parentName:"h3"},"getSalesOrdersByDate()")),(0,m.kt)("h4",{markdown:!0},"Parameter: ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"h4"},"SalesOrderTimeRange")),(0,m.kt)("h4",{markdown:!0},"Added properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"paging")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"paging.pageSize")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"paging.pageNumber")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"paging.pageCount")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"paging.cursor"))),(0,m.kt)("h4",{markdown:!0},"Return Value: ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"h4"},"SalesOrderArray")," (Previously returned ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"h4"},"<Iterable>SalesOrder"),")"),(0,m.kt)("h4",{markdown:!0},"Removed properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"fulfillmentStatus")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"paymentStatus")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"seller")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.code")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.description")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.notes")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"totalCharges.code")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"totalCharges.description")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"totalCharges.notes")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"buyer.identifiers")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"buyer.phoneExtension")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"items.quantity.unit")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"includeChanges")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"modifiedDate"))),(0,m.kt)("h4",{markdown:!0},"Added properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"paging")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"paging.pageSize")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"paging.pageNumber")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"paging.pageCount")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"paging.cursor")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"buyer.address")," (optional)"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.subTotal")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.subTotal.value")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.subTotal.currency")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.taxAmount")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.taxAmount.value")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.taxAmount.currency")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.shippingAmount")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.shippingAmount.value")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.shippingAmount.currency")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.shippingCost")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.shippingCost.value")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.shippingCost.currency")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.confirmationCost")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.confirmationCost.value")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.confirmationCost.currency")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.insuranceCost")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.insuranceCost.value")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.insuranceCost.currency")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.otherCost")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.otherCost.value")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.otherCost.currency"))),(0,m.kt)("h4",{markdown:!0},"Changes:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.amount.value")," - now accepts a number rather than a string"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges.amount.value.currency")," - now accepts any string rather than an enum value"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"totalCharges.amount.value")," - now accepts a number rather than a string"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"totalCharges.amount.value.currency")," - now accepts any string rather than an enum value"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"shippingPreferences.insuredValue.value")," - now accepts a number rather than a string"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"shippingPreferences.insuredValue.currency")," - now accepts any string rather than an enum value"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges")," renamed to ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"adjustments")," and a new ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"charges")," property was added with a new type")),(0,m.kt)("h3",{markdown:!0},(0,m.kt)("a",{href:"/docs/reference/methods/shipment-created",markdown:!0,parentName:"h3"},"shipmentCreated()")),(0,m.kt)("h4",{markdown:!0},"Parameter: ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"h4"},"SalesOrderShipment")),(0,m.kt)("h4",{markdown:!0},"Removed properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryDateTime")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"minimumDeliveryDays")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"maximumDeliveryDays")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryWindow")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"items.fulfillmentStatus")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"items.trackingURL")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"items.shippingPreferences")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"items.charges")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"items.totalAmount")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"items.totalCharges"))),(0,m.kt)("h4",{markdown:!0},"Added properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents")," (moved from packages up a level)"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.salesOrder")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.salesOrder.id")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.salesOrder.identifiers")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.salesOrderItem")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.salesOrderItem.id")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.salesOrderItem.sku")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.salesOrderItem.identifiers")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.product")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.product.id")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.product.sku")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.product.identifiers")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.quantity")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.quantity.value")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"items.thumbnailURL"))),(0,m.kt)("h4",{markdown:!0},"Changes:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"items.product")," is now required"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"fulfillmentStatus")," now accepts a string instead of an enum")),(0,m.kt)("h3",{markdown:!0},(0,m.kt)("a",{href:"/docs/reference/methods/shipment-cancelled",markdown:!0,parentName:"h3"},"shipmentCancelled()")),(0,m.kt)("h4",{markdown:!0},"Parameter: ",(0,m.kt)("inlineCode",{markdown:!0,parentName:"h4"},"SalesOrderShipment")),(0,m.kt)("h4",{markdown:!0},"Removed properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryDateTime")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"minimumDeliveryDays")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"maximumDeliveryDays")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"deliveryWindow")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"packages")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"items.fulfillmentStatus")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"items.trackingURL")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"items.shippingPreferences")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"items.charges")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"items.totalAmount")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"items.totalCharges"))),(0,m.kt)("h4",{markdown:!0},"Added properties:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents")," (moved from packages up a level)"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.salesOrder")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.salesOrder.id")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.salesOrder.identifiers")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.salesOrderItem")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.salesOrderItem.id")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.salesOrderItem.sku")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.salesOrderItem.identifiers")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.product")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.product.id")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.product.sku")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.product.identifiers")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.quantity")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"contents.quantity.value")),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"items.thumbnailURL"))),(0,m.kt)("h4",{markdown:!0},"Changes:"),(0,m.kt)("ul",{markdown:!0},(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"items.product")," is now required"),(0,m.kt)("li",{markdown:!0,parentName:"ul"},(0,m.kt)("inlineCode",{markdown:!0,parentName:"li"},"fulfillmentStatus")," now accepts a string instead of an enum")),(0,m.kt)("h3",{markdown:!0},"getSalesOrder() Method"),(0,m.kt)("p",{markdown:!0},"No longer supported."),(0,m.kt)("h3",{markdown:!0},"getSeller() Method"),(0,m.kt)("p",{markdown:!0},"No longer supported."))}N.isMDXComponent=!0},7612:function(e,a,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/changelog/v1.0.2",function(){return n(2089)}])}},function(e){e.O(0,[1783,2888,9774,179],(function(){return a=7612,e(e.s=a);var a}));var a=e.O();_N_E=a}]);