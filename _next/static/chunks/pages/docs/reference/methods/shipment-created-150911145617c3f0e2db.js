(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5610],{6544:function(e,t,n){"use strict";n.r(t),n.d(t,{title:function(){return p},description:function(){return m},createdAt:function(){return c},modifiedAt:function(){return k},default:function(){return x}});var r=n(9016),i=n(3104),a=n(6687),o=n(2320),s=n(1783),d=["components"],p=(a.createElement,"shipmentCreated Method"),m="This method is called when a shipment is created for one or more items in one or more sales orders.",c=new Date(1653338063537.9844),k=new Date(1653338063537.9844),l=function(e){return function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,o.kt)("div",t)}},h=l("CodeWrapper"),u=l("Reference"),w=l("Field"),y=l("Description"),T=l("Type"),f=function(e){return(0,o.kt)(s.Z,(0,i.Z)({title:"shipmentCreated Method",description:"This method is called when a shipment is created for one or more items in one or more sales orders.",createdAt:new Date(1653338063538),modifiedAt:new Date(1653338063538)},e))};function x(e){var t=e.components,n=(0,r.Z)(e,d);return(0,o.kt)(f,(0,i.Z)({},n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{markdown:!0},(0,o.kt)("inlineCode",{markdown:!0,parentName:"h1"},"shipmentCreated()")),(0,o.kt)("p",{markdown:!0},"This method is called when a shipment is created for one or more items in one or more sales orders.\nA single shipment may contain items from multiple sales orders, and a single sales order\nmay be fulfilled by multiple shipments."),(0,o.kt)("h2",{markdown:!0},"Syntax"),(0,o.kt)(h,{mdxType:"CodeWrapper"},(0,o.kt)("pre",{markdown:!0},(0,o.kt)("code",{className:"language-javascript",markdown:!0,parentName:"pre"},"module.exports = async function shipmentCreated(transaction, shipment) {\n  // Your code here\n}\n")),(0,o.kt)("pre",{markdown:!0},(0,o.kt)("code",{className:"language-typescript",markdown:!0,parentName:"pre"},'import { Transaction, SalesOrderShipment } from "@shipengine/connect";\n\nexport default async function shipmentCreated(\n  transaction: Transaction,\n  shipment: SalesOrderShipment\n): Promise<void> {\n  // Your code here\n}\n'))),(0,o.kt)("h2",{markdown:!0},"Parameters"),(0,o.kt)("h3",{markdown:!0},(0,o.kt)("inlineCode",{markdown:!0,parentName:"h3"},"transaction")),(0,o.kt)("p",{markdown:!0},"A ",(0,o.kt)("a",{href:"/docs/reference/order-transaction",markdown:!0,parentName:"p"},"transaction object")," containing information about the transaction and session state."),(0,o.kt)("h3",{markdown:!0},(0,o.kt)("inlineCode",{markdown:!0,parentName:"h3"},"shipment")),(0,o.kt)("p",{markdown:!0},"The shipment that was created."),(0,o.kt)(u,{mdxType:"Reference"},(0,o.kt)(w,{name:"trackingNumber",type:"string",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The master tracking number for the entire shipment. For single-piece shipments, this will be the same as the package tracking number. For multi-piece shipments, this may be a separate tracking number, or the same tracking number as one of the packages. This string will not contain newline characters."))),(0,o.kt)(w,{name:"identifiers",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"Your own identifiers for this shipment.")),(0,o.kt)(T,{mdxType:"Type"},(0,o.kt)("p",{markdown:!0},(0,o.kt)("a",{href:"/docs/reference/identifiers-object",markdown:!0,parentName:"p"},"identifiers object")))),(0,o.kt)(w,{name:"salesOrder",type:"object",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The sales order associated with this shipment."))),(0,o.kt)(w,{name:"salesOrder.id",nullable:!1,mdxType:"Field"},(0,o.kt)(T,{mdxType:"Type"},(0,o.kt)("p",{markdown:!0},(0,o.kt)("a",{href:"https://www.npmjs.com/package/uuid",markdown:!0,parentName:"p"},"UUID"))),(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The marketplace's unique ID for the sales order. This string must not contain newline characters."))),(0,o.kt)(w,{name:"salesOrder.identifiers",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"Your own identifiers for this sales order.")),(0,o.kt)(T,{mdxType:"Type"},(0,o.kt)("p",{markdown:!0},(0,o.kt)("a",{href:"/docs/reference/identifiers-object",markdown:!0,parentName:"p"},"identifiers object")))),(0,o.kt)(w,{name:"shipTo",nullable:!1,mdxType:"Field"},(0,o.kt)(T,{mdxType:"Type"},(0,o.kt)("p",{markdown:!0},(0,o.kt)("a",{href:"/docs/reference/address#address-contact-info-pickup-location-properties",markdown:!0,parentName:"p"},"address + contact info + pickup location object"))),(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The recipient's contact info and address."))),(0,o.kt)(w,{name:"shipDateTime",nullable:!1,mdxType:"Field"},(0,o.kt)(T,{mdxType:"Type"},(0,o.kt)("p",{markdown:!0},(0,o.kt)("a",{href:"/docs/reference/date-time",markdown:!0,parentName:"p"},"date/time object"))),(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The date/time that the shipment was shipped or is expected to ship. This is not guaranteed to be in the future."))),(0,o.kt)(w,{name:"contents",type:"object[]",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The items inside the package."))),(0,o.kt)(w,{name:"contents[].quantity",type:"object",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The quantity of this item in the sales order."))),(0,o.kt)(w,{name:"contents[].quantity.value",type:"number",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The quantity of items in this sales order item. The minimum value for this property is ",(0,o.kt)("inlineCode",{markdown:!0,parentName:"p"},"1"),"."))),(0,o.kt)(w,{name:"contents[].currency",type:"string",nullable:!0,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The three character ISO 4217 code of the currency used for all monetary amounts."))),(0,o.kt)(w,{name:"contents[].notes",nullable:!0,mdxType:"Field"},(0,o.kt)(T,{mdxType:"Type"},(0,o.kt)("p",{markdown:!0},"object[]")),(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"Additional notes associated with this notification or its sales order."))),(0,o.kt)(w,{name:"contents[].notes[].type",nullable:!0,mdxType:"Field"},(0,o.kt)(T,{mdxType:"Type"},(0,o.kt)("p",{markdown:!0},(0,o.kt)("a",{href:"../reference/common-types#notes-types",markdown:!0,parentName:"p"},"notes type string"))),(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The type for this note."))),(0,o.kt)(w,{name:"contents[].notes[].text",nullable:!0,mdxType:"Field"},(0,o.kt)(T,{mdxType:"Type"},(0,o.kt)("p",{markdown:!0},"string")),(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The note text itself."))),(0,o.kt)(w,{name:"contents[].salesOrderItem",type:"object",nullable:!0,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The sales order associated with this item."),(0,o.kt)("p",{markdown:!0},"This property may be null. If it is provided, all its required properties, listed below, will be included."))),(0,o.kt)(w,{name:"contents[].salesOrderItem.id",type:"string",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The marketplace's unique ID for the sales order item. This string must not contain newline characters."))),(0,o.kt)(w,{name:"contents[].salesOrderItem.sku",type:"string",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The ",(0,o.kt)("a",{href:"https://en.wikipedia.org/wiki/Stock_keeping_unit",markdown:!0,parentName:"p"},"Stock Keeping Unit"),". This string must not contain newline characters."))),(0,o.kt)(w,{name:"contents[].salesOrderItem.identifiers",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"Your own identifiers for this sales order item.")),(0,o.kt)(T,{mdxType:"Type"},(0,o.kt)("p",{markdown:!0},(0,o.kt)("a",{href:"/docs/reference/identifiers-object",markdown:!0,parentName:"p"},"identifiers object")))),(0,o.kt)(w,{name:"contents[].product",type:"object",nullable:!0,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The product associated with this item."),(0,o.kt)("p",{markdown:!0},"This property may be null. If it is provided, all its required properties, listed below, will be included."))),(0,o.kt)(w,{name:"contents[].product.id",type:"string",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The product catalog's unique ID for the order. This string must not contain newline characters."))),(0,o.kt)(w,{name:"contents[].product.sku",type:"string",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The ",(0,o.kt)("a",{href:"https://en.wikipedia.org/wiki/Stock_keeping_unit",markdown:!0,parentName:"p"},"Stock Keeping Unit"),". This string must not contain newline characters."))),(0,o.kt)(w,{name:"contents[].product.upc",type:"string",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The ",(0,o.kt)("a",{href:"https://en.wikipedia.org/wiki/Universal_Product_Code",markdown:!0,parentName:"p"},"Universal Product Code")," for this item. This string must not contain newline characters."))),(0,o.kt)(w,{name:"contents[].product.isbn",type:"string",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The ",(0,o.kt)("a",{href:"https://www.isbn-international.org/",markdown:!0,parentName:"p"},"International Standard Book Number")," for this item. This string must not contain newline characters."))),(0,o.kt)(w,{name:"contents[].product.asin",type:"string",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The ",(0,o.kt)("a",{href:"https://www.amazon.com/gp/seller/asin-upc-isbn-info.html",markdown:!0,parentName:"p"},"Amazon Standard Identification Number")," for this item. This string must not contain newline characters."))),(0,o.kt)(w,{name:"contents[].product.fulfillmentSku",type:"string",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The ",(0,o.kt)("a",{href:"https://en.wikipedia.org/wiki/Stock_keeping_unit",markdown:!0,parentName:"p"},"Stock Keeping Unit")," related to the fulfillment of this item. This string must not contain newline characters."))),(0,o.kt)(w,{name:"contents[].product.inventoryID",type:"string",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The inventory ID for this item. This string must not contain newline characters."))),(0,o.kt)(w,{name:"contents[].product.identifiers",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"Your own identifiers for this product.")),(0,o.kt)(T,{mdxType:"Type"},(0,o.kt)("p",{markdown:!0},(0,o.kt)("a",{href:"/docs/reference/identifiers-object",markdown:!0,parentName:"p"},"identifiers object")))),(0,o.kt)(w,{name:"contents[].product.details",nullable:!1,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"A list of details associated with this product.")),(0,o.kt)(T,{mdxType:"Type"},(0,o.kt)("p",{markdown:!0},(0,o.kt)("a",{href:"/docs/reference/identifiers-object",markdown:!0,parentName:"p"},"identifiers object")))),(0,o.kt)(w,{name:"trackingURL",nullable:!0,mdxType:"Field"},(0,o.kt)(T,{mdxType:"Type"},(0,o.kt)("p",{markdown:!0},(0,o.kt)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/API/URL/URL",markdown:!0,parentName:"p"},"URL"))),(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The URL of a webpage where the customer can track the shipment."))),(0,o.kt)(w,{name:"carrierCode",nullable:!0,type:"string",mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"If the shipment is being fulfilled using a well-known third-party carrier, such as UPS, FedEx, DHL, etc., then this field specifies the carrier."))),(0,o.kt)(w,{name:"carrierServiceCode",nullable:!0,type:"string",mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"If the shipment is being fulfilled using a well-known third-party carrier, such as UPS, FedEx, DHL, etc., then this field specifies the service code."))),(0,o.kt)(w,{name:"fulfillmentService",nullable:!0,mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"If the shipment is being fulfilled using a well-known third-party carrier, such as UPS, FedEx, DHL, etc., then this field specifies the carrier service.")),(0,o.kt)(T,{mdxType:"Type"},(0,o.kt)("p",{markdown:!0},(0,o.kt)("a",{href:"/docs/reference/fulfillment-service",markdown:!0,parentName:"p"},"fulfillment service string")))),(0,o.kt)(w,{name:"shipFrom",nullable:!0,mdxType:"Field"},(0,o.kt)(T,{mdxType:"Type"},(0,o.kt)("p",{markdown:!0},(0,o.kt)("a",{href:"/docs/reference/address",markdown:!0,parentName:"p"},"address + contact object"))),(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The sender's contact info and address."))),(0,o.kt)(w,{name:"notifyBuyer",nullable:!0,type:"boolean",mdxType:"Field"},(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"Instructs the order source on whether to notify the buyer.\nOmit, or set to null, to retain the order source's default behavior."))),(0,o.kt)(w,{name:"fulfillmentCost",nullable:!0,mdxType:"Field"},(0,o.kt)(T,{mdxType:"Type"},(0,o.kt)("p",{markdown:!0},(0,o.kt)("a",{href:"/docs/reference/charge",markdown:!0,parentName:"p"},"charge object"))),(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The amount it costs to fulfill this shipment."))),(0,o.kt)(w,{name:"insuranceCost",nullable:!0,mdxType:"Field"},(0,o.kt)(T,{mdxType:"Type"},(0,o.kt)("p",{markdown:!0},(0,o.kt)("a",{href:"/docs/reference/charge",markdown:!0,parentName:"p"},"charge object"))),(0,o.kt)(y,{mdxType:"Description"},(0,o.kt)("p",{markdown:!0},"The amount of insurance purchased for this shipment.")))),(0,o.kt)("h2",{markdown:!0},"Return Value"),(0,o.kt)("h3",{markdown:!0},(0,o.kt)("inlineCode",{markdown:!0,parentName:"h3"},"void")),(0,o.kt)("p",{markdown:!0},"This method is used to notify your application when a shipment is created. It does not return a value."),(0,o.kt)("h2",{markdown:!0},"Example"),(0,o.kt)(h,{mdxType:"CodeWrapper"},(0,o.kt)("pre",{markdown:!0},(0,o.kt)("code",{className:"language-javascript",markdown:!0,parentName:"pre"},"async function shipmentCreated(transaction, shipment) {\n  // STEP 1: Validation\n  // Add any desired validation here\n\n  // STEP 2: Create the data that the order source's API expects\n  const data = {\n    operation: \"create_shipment\",\n    session_id: transaction.session.id,\n    shipment_id: shipment.trackingNumber\n  };\n  // STEP 3: Call the order source's API\n  await apiClient.request({ data });\n}\n")),(0,o.kt)("pre",{markdown:!0},(0,o.kt)("code",{className:"language-typescript",markdown:!0,parentName:"pre"},"export default async function shipmentCreated(\n  transaction: Transaction<Session>,\n  shipment: SalesOrderShipment,\n): Promise<void> {\n  // STEP 1: Validation\n  // Add any desired validation here\n\n  // STEP 2: Create the data that the order source's API expects\n  const data = {\n    operation: \"create_shipment\",\n    session_id: transaction.session.id,\n    shipment_id: shipment.trackingNumber\n  };\n  // STEP 3: Call the order source's API\n  await apiClient.request({ data });\n}\n"))))}x.isMDXComponent=!0},6842:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/reference/methods/shipment-created",function(){return n(6544)}])}},function(e){e.O(0,[1783,2888,9774,179],(function(){return t=6842,e(e.s=t);var t}));var t=e.O();_N_E=t}]);