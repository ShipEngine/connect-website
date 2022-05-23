(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8934],{8892:function(e,t,r){"use strict";r.r(t),r.d(t,{title:function(){return m},description:function(){return p},createdAt:function(){return l},modifiedAt:function(){return k},default:function(){return g}});var n=r(9016),a=r(3104),i=r(6687),d=r(2320),o=r(1783),s=["components"],m=(i.createElement,"getSalesOrderByDate Method"),p="This method returns detailed information about sales orders, filtered by time range.",l=new Date(1653338063537.9844),k=new Date(1653338063537.9844),u=function(e){return function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,d.kt)("div",t)}},c=u("CodeWrapper"),h=u("Reference"),y=u("Field"),w=u("Type"),T=u("Description"),f=function(e){return(0,d.kt)(o.Z,(0,a.Z)({title:"getSalesOrderByDate Method",description:"This method returns detailed information about sales orders, filtered by time range.",createdAt:new Date(1653338063538),modifiedAt:new Date(1653338063538)},e))};function g(e){var t=e.components,r=(0,n.Z)(e,s);return(0,d.kt)(f,(0,a.Z)({},r,{components:t,mdxType:"MDXLayout"}),(0,d.kt)("h1",{markdown:!0},(0,d.kt)("inlineCode",{markdown:!0,parentName:"h1"},"getSalesOrderByDate()")),(0,d.kt)("p",{markdown:!0},"This method returns detailed information about sales orders, filtered by time range."),(0,d.kt)("h2",{markdown:!0},"Syntax"),(0,d.kt)(c,{mdxType:"CodeWrapper"},(0,d.kt)("pre",{markdown:!0},(0,d.kt)("code",{className:"language-javascript",markdown:!0,parentName:"pre"},"module.exports = async function getSalesOrderByDate(transaction, range) {\n  // Your code here\n}\n")),(0,d.kt)("pre",{markdown:!0},(0,d.kt)("code",{className:"language-typescript",markdown:!0,parentName:"pre"},'import { Transaction, SalesOrderTimeRange, SalesOrderArray } from "@shipengine/connect";\n\nexport default async function getSalesOrderByDate(\n  transaction: Transaction,\n  range: SalesOrderTimeRange\n): Promise<SalesOrderArray> {\n  // Your code here\n}\n'))),(0,d.kt)("h2",{markdown:!0},"Paging"),(0,d.kt)("p",{markdown:!0},"For returning large numbers of sales orders, you can take advantage of ",(0,d.kt)("a",{href:"https://jsonapi.org/profiles/ethanresnick/cursor-pagination/#auto-id--cursors",markdown:!0,parentName:"p"},"cursor based pagination"),"\nto return the needed data in more consumable chunks."),(0,d.kt)("p",{markdown:!0},"To accomplish this you will need to populate the ",(0,d.kt)("inlineCode",{markdown:!0,parentName:"p"},"paging.cursor")," property with your preferred cursor structure and the ",(0,d.kt)("inlineCode",{markdown:!0,parentName:"p"},"getSalesOrderByDate")," method\nwill be called again with the ",(0,d.kt)("inlineCode",{markdown:!0,parentName:"p"},"paging.cursor")," property populated with the return object."),(0,d.kt)("p",{markdown:!0},"The method will continue to be called until the ",(0,d.kt)("inlineCode",{markdown:!0,parentName:"p"},"paging.cursor")," property is returned as ",(0,d.kt)("inlineCode",{markdown:!0,parentName:"p"},"undefined"),"."),(0,d.kt)("h2",{markdown:!0},"Parameters"),(0,d.kt)("h3",{markdown:!0},(0,d.kt)("inlineCode",{markdown:!0,parentName:"h3"},"transaction")),(0,d.kt)("p",{markdown:!0},"A ",(0,d.kt)("a",{href:"/docs/reference/order-transaction",markdown:!0,parentName:"p"},"transaction object")," containing information about the transaction and session state."),(0,d.kt)("h3",{markdown:!0},(0,d.kt)("inlineCode",{markdown:!0,parentName:"h3"},"range")),(0,d.kt)("p",{markdown:!0},"Specifies a date/time range to retrieve sales orders for."),(0,d.kt)(h,{mdxType:"Reference"},(0,d.kt)(y,{name:"startDateTime",nullable:!0,mdxType:"Field"},(0,d.kt)(w,{mdxType:"Type"},(0,d.kt)("p",{markdown:!0},(0,d.kt)("a",{href:"/docs/reference/date-time",markdown:!0,parentName:"p"},"DateTime"))),(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The start date/time of the range."))),(0,d.kt)(y,{name:"endDateTime",nullable:!0,mdxType:"Field"},(0,d.kt)(w,{mdxType:"Type"},(0,d.kt)("p",{markdown:!0},(0,d.kt)("a",{href:"/docs/reference/date-time",markdown:!0,parentName:"p"},"DateTime"))),(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The end date/time of the range."))),(0,d.kt)(y,{name:"toString",nullable:!1,mdxType:"Field"},(0,d.kt)(w,{mdxType:"Type"},(0,d.kt)("p",{markdown:!0},"method")),(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"A method that returns the time range as a string."))),(0,d.kt)(y,{name:"paging",type:"object",nullable:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"An object that indicates that page preferences for the items that are returned from this method."),(0,d.kt)("p",{markdown:!0},"This property may be null. If it is provided, all its required properties, listed below, will be included."))),(0,d.kt)(y,{name:"paging.pageSize",type:"number",nullable:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The desired maximum number of items to return. This value will always be provided and will be greater than zero."))),(0,d.kt)(y,{name:"paging.pageCount",type:"number",nullable:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"he desired maximum number of pages to return. This value is optional."))),(0,d.kt)(y,{name:"paging.pageNumber",type:"number",nullable:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The desired page number to return. This value will always be provided and will be zero or greater."))),(0,d.kt)(y,{name:"paging.cursor",type:"string",nullable:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"Identifies the next page of results to return. This value is optional."))),(0,d.kt)(y,{name:"statusMappings",type:"object",nullable:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"A customer specified mapping for status codes. The keys of this object will be the custom status strings provided by a user, and the values will be one of the following valid status codes:"),(0,d.kt)("ul",{markdown:!0},(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"awaiting_payment")," - The sales order is awaiting payment."),(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"awaiting_shipment")," - This sales order is awaiting shipment."),(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"on_hold")," - This sales order is on hold."),(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"completed")," - This sales order is completed."),(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"cancelled")," - This sales order has been cancelled.")))),(0,d.kt)(y,{name:"fieldMappings",type:"object",nullable:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"A custom specified mapping for supported custom fields. The supported custom fields will be predefined by the app developer."))),(0,d.kt)(y,{name:"fieldMappings.customField1",type:"number",nullable:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The custom field whose value that will map to the RequestedFulfillmentExtensions.CustomField1."))),(0,d.kt)(y,{name:"fieldMappings.customField2",type:"number",nullable:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The custom field whose value that will map to the RequestedFulfillmentExtensions.CustomField2."))),(0,d.kt)(y,{name:"fieldMappings.customField3",type:"string",nullable:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The custom field whose value that will map to the RequestedFulfillmentExtensions.CustomField3.")))),(0,d.kt)("h2",{markdown:!0},"Return Value"),(0,d.kt)("h3",{markdown:!0},(0,d.kt)("inlineCode",{markdown:!0,parentName:"h3"},"salesOrders")),(0,d.kt)("p",{markdown:!0},"An array of sales orders matching the date range."),(0,d.kt)(h,{mdxType:"Reference"},(0,d.kt)(y,{name:"id",type:"string",required:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The marketplace's unique ID for the sales order. This string must not contain newline characters."))),(0,d.kt)(y,{name:"orderNumber",type:"string",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"Use this field when a marketplace provides a customer facing identifier for the order that\nis different from that order's unique id."))),(0,d.kt)(y,{name:"createdDateTime",required:!0,mdxType:"Field"},(0,d.kt)(w,{mdxType:"Type"},(0,d.kt)("p",{markdown:!0},(0,d.kt)("a",{href:"/docs/reference/date-time",markdown:!0,parentName:"p"},"Date Time"),", ",(0,d.kt)("br",null),"\nor ",(0,d.kt)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date",markdown:!0,parentName:"p"},"Date")," object, ",(0,d.kt)("br",null),"\nor a string representing the date and time in ",(0,d.kt)("a",{href:"https://www.w3.org/TR/NOTE-datetime",markdown:!0,parentName:"p"},"ISO")," format.")),(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The date/time that the sales order was originally placed."))),(0,d.kt)(y,{name:"lastModifiedDateTime",required:!1,mdxType:"Field"},(0,d.kt)(w,{mdxType:"Type"},(0,d.kt)("p",{markdown:!0},(0,d.kt)("a",{href:"/docs/reference/date-time",markdown:!0,parentName:"p"},"Date Time"),", ",(0,d.kt)("br",null),"\nor ",(0,d.kt)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date",markdown:!0,parentName:"p"},"Date")," object, ",(0,d.kt)("br",null),"\nor a string representing the date and time in ",(0,d.kt)("a",{href:"https://www.w3.org/TR/NOTE-datetime",markdown:!0,parentName:"p"},"ISO")," format.")),(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The date/time that the sales order was last modified."))),(0,d.kt)(y,{name:"status",type:"string",required:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The current status of this sales order. Valid values include the following:"),(0,d.kt)("ul",{markdown:!0},(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"awaiting_payment")," - The sales order is awaiting payment."),(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"awaiting_shipment")," - This sales order is awaiting shipment."),(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"on_hold")," - This sales order is on hold."),(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"completed")," - This sales order is completed."),(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"cancelled")," - This sales order has been cancelled.")))),(0,d.kt)(y,{name:"buyer",type:"object",required:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The buyer who bought the order. This is not necessarily the same person as the ",(0,d.kt)("inlineCode",{markdown:!0,parentName:"p"},"shipTo"),"."))),(0,d.kt)(y,{name:"buyer.id",type:"string",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The marketplace's unique ID for the buyer. This string must not contain newline characters."))),(0,d.kt)(y,{name:"buyer.address",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The address of the buyer.")),(0,d.kt)(w,{mdxType:"Type"},(0,d.kt)("p",{markdown:!0},(0,d.kt)("a",{href:"/docs/reference/address#address-properties",markdown:!0,parentName:"p"},"address object")))),(0,d.kt)(y,{name:"buyer.name",type:"object",required:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The name of the contact."))),(0,d.kt)(y,{name:"buyer.name.title",type:"string",nullablerequired:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},'The title of the contact (eg "Mr", "Mrs", "Dr"). This string must not include newline characters.'))),(0,d.kt)(y,{name:"buyer.name.given",type:"string",required:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The first name of the signer. This string must not include newline characters."))),(0,d.kt)(y,{name:"buyer.name.middle",type:"string",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The middle name of the signer. This string must not include newline characters."))),(0,d.kt)(y,{name:"buyer.name.family",type:"string",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The last name or family name of the signer. This string must not include newline characters."))),(0,d.kt)(y,{name:"buyer.name.suffix",type:"string",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},'The suffix of the signer (eg "Sr", "Jr", "IV"). This string must not include newline characters.'))),(0,d.kt)(y,{name:"buyer.email",type:"string",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The email address of the contact. This string must be a valid email address."))),(0,d.kt)(y,{name:"buyer.phoneNumber",type:"string",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The phone number of the contact.\nand must not include newline characters."))),(0,d.kt)(y,{name:"requestedFulfillments",type:"object[]",required:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"An array of fulfillment requests."))),(0,d.kt)(y,{name:"requestedFulfillments[].items",required:!0,mdxType:"Field"},(0,d.kt)(w,{mdxType:"Type"},(0,d.kt)("p",{markdown:!0},(0,d.kt)("a",{href:"/docs/reference/sales-order-item",markdown:!0,parentName:"p"},"sales order item object[]"))),(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The items in this sales order."))),(0,d.kt)(y,{name:"requestedFulfillments[].shipTo",required:!0,mdxType:"Field"},(0,d.kt)(w,{mdxType:"Type"},(0,d.kt)("p",{markdown:!0},(0,d.kt)("a",{href:"/docs/reference/address#address-contact-info-pickup-location-properties",markdown:!0,parentName:"p"},"address + contact info + pickup location object"))),(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The address or pickup location where the sales order should be shipped. Be sure to include the extra contact info fields as indicated in the reference doc."))),(0,d.kt)(y,{name:"requestedFulfillments[].shippingPreferences",required:!1,mdxType:"Field"},(0,d.kt)(w,{mdxType:"Type"},(0,d.kt)("p",{markdown:!0},(0,d.kt)("a",{href:"/docs/reference/shipping-preferences",markdown:!0,parentName:"p"},"shipping preferences object"))),(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"Preferences on how this order should be fulfilled."))),(0,d.kt)(y,{name:"originalOrderSource",type:"object",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"Information regarding the original order source. This is used when an order source is acting on behalf of other order sources, in order to persist information regarding the original order."))),(0,d.kt)(y,{name:"originalOrderSource.sourceId",type:"string",required:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"A unique identifier for the source marketplace."))),(0,d.kt)(y,{name:"originalOrderSource.marketplaceCode",type:"string",required:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The code for the type of marketplace."))),(0,d.kt)(y,{name:"originalOrderSource.orderId",type:"string",required:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The unique identifier for the order at the source marketplace."))),(0,d.kt)(y,{name:"notes",type:"object[]",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"An array of objects containing additional information about this sales order."))),(0,d.kt)(y,{name:"notes[].type",required:!0,mdxType:"Field"},(0,d.kt)(w,{mdxType:"Type"},(0,d.kt)("p",{markdown:!0},(0,d.kt)("a",{href:"/docs/reference/common-types#notes-types",markdown:!0,parentName:"p"},"notes type string"))),(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The type for this note."))),(0,d.kt)(y,{name:"notes[].text",type:"string",required:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The note text itself."))),(0,d.kt)(y,{name:"metadata",type:"object",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"Custom data about this sales order that was persisted by ShipEngine Connect. Must be JSON serializable."))),(0,d.kt)(y,{name:"paging",type:"object",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"An object that indicates that page preferences for the items that are returned from this method."))),(0,d.kt)(y,{name:"paging.pageSize",type:"number",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The desired maximum number of items to return. This value will always be provided and will be greater than zero."))),(0,d.kt)(y,{name:"paging.pageNumber",type:"number",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The desired page number to return. This value will always be provided and will be zero or greater."))),(0,d.kt)(y,{name:"paging.pageCount",type:"number",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"he desired maximum number of pages to return. This value is optional."))),(0,d.kt)(y,{name:"paging.cursor",type:"string",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"Identifies the next page of results to return. This value is optional."))),(0,d.kt)(y,{name:"identifiers",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"Your own identifiers for this sales order.")),(0,d.kt)(w,{mdxType:"Type"},(0,d.kt)("p",{markdown:!0},(0,d.kt)("a",{href:"/docs/reference/identifiers-object",markdown:!0,parentName:"p"},"identifiers object")))),(0,d.kt)(y,{name:"paymentMethod",type:"string",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"Indicates how the customer has paid for the order. Valid values include the following:"),(0,d.kt)("ul",{markdown:!0},(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"cash")," - The sales order was paid for with cash."),(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"cash_equivalent")," - The sales order was paid for with guaranteed funds, such as a cashier's check or money order."),(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"check")," - This sales order was paid for with a check."),(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"credit_card")," - This sales order was paid for with a credit card."),(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"bank_transfer")," - This sales order was paid for with a bank transfer.")))),(0,d.kt)(y,{name:"paymentStatus",type:"string",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"Indicates the status of the customer payment for the order. Valid values include the following:"),(0,d.kt)("ul",{markdown:!0},(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"awaiting_payment")," - The sales order is still waiting on the customer's payment."),(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"payment_cancelled")," - The sales order payment was cancelled."),(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"payment_failed")," - The sales order payment failed."),(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"payment_in_process")," - The sales order payment is currently being processed."),(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"paid")," - The sales order has been payed for."),(0,d.kt)("li",{markdown:!0,parentName:"ul"},(0,d.kt)("inlineCode",{markdown:!0,parentName:"li"},"other")," - The sales order payment is in an unknown state.")))),(0,d.kt)(y,{name:"paymentAmount",type:"object",required:!1,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The amount the customer has paid for the order."))),(0,d.kt)(y,{name:"paymentAmount.value",type:"number",required:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The value for paymentAmount."))),(0,d.kt)(y,{name:"paymentAmount.currency",type:"string",required:!0,mdxType:"Field"},(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The currency for paymentAmount."))),(0,d.kt)(y,{name:"orderURL",required:!1,mdxType:"Field"},(0,d.kt)(w,{mdxType:"Type"},(0,d.kt)("p",{markdown:!0},(0,d.kt)("a",{href:"https://nodejs.org/api/url.html",markdown:!0,parentName:"p"},"URL")," or string")),(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"The URL of a webpage where the customer can view the order.  Must be a valid HTTP or HTTPS url."))),(0,d.kt)(y,{name:"charges",required:!1,mdxType:"Field"},(0,d.kt)(w,{mdxType:"Type"},(0,d.kt)("p",{markdown:!0},(0,d.kt)("a",{href:"/docs/reference/charge",markdown:!0,parentName:"p"},"charge object[]"))),(0,d.kt)(T,{mdxType:"Description"},(0,d.kt)("p",{markdown:!0},"Any additional charges for this order that aren't tied to a line item.")))),(0,d.kt)("h2",{markdown:!0},"Example"),(0,d.kt)(c,{mdxType:"CodeWrapper"},(0,d.kt)("pre",{markdown:!0},(0,d.kt)("code",{className:"language-javascript",markdown:!0,parentName:"pre"},'async function getSalesOrdersByDate(transaction, range) {\n  // STEP 1: Validation\n  // Add any desired validation here\n\n  // STEP 2: Create the data that the order\'s API expects\n  const data = {\n    operation: "retrieve_sales_orders_by_date",\n    session_id: transaction.session.id,\n    start_date:  range.startDateTime,\n    end_date: range.endDateTime\n  };\n\n  // STEP 3: Call the order source\'s API\n  const response = await apiClient.request({ data });\n\n  // Step 4: Create the output data that ShipEngine expects\n  return formatSalesOrders(response.data);\n}\n\nfunction formatSalesOrders(salesOrders) {\n\n  return salesOrders.map(salesOrder => {\n    return {\n      id: salesOrder.id,\n      createdDateTime: salesOrder.createdDateTime,\n      status: mapSalesOrderStatus(salesOrder.status),\n      paymentMethod: mapPaymentMethod(salesOrder.payment.method),\n      buyer: {\n        id: salesOrder.buyer.id,\n        name: salesOrder.buyer.name\n      },\n      requestedFulfillments: [\n        {\n          items: salesOrder.shipping_items.map((item) => {\n            return {\n              id: item.id,\n              name: item.name,\n              quantity: {\n                value: item.quantity,\n                unit: "ea"\n              },\n              unitPrice: {\n                value: item.price_per_unit,\n                currency: "USD"\n              }\n            }\n        }),\n        shipTo: salesOrder.ship_to\n      }]\n    }\n  });\n}\n')),(0,d.kt)("pre",{markdown:!0},(0,d.kt)("code",{className:"language-typescript",markdown:!0,parentName:"pre"},"export default async function getSalesOrdersByDate(\n  transaction: Transaction<Session>,\n  range: SalesOrderTimeRange,\n): Promise<Iterable<SalesOrder>> {\n  // STEP 1: Validation\n  // Add any desired validation here\n\n  // STEP 2: Create the data that the order's API expects\n  const data = {\n    operation: \"retrieve_sales_orders_by_date\",\n    session_id: transaction.session.id,\n    start_date:  range.startDateTime,\n    end_date: range.endDateTime\n  };\n\n  // STEP 3: Call the order source's API\n  const response = await apiClient.request<RetrieveSalesOrdersByDateResponse>({ data });\n\n  // Step 4: Create the output data that ShipEngine expects\n  return formatSalesOrders(response.data);\n}\n"))))}g.isMDXComponent=!0},8945:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/reference/methods/get-sales-orders-by-date",function(){return r(8892)}])}},function(e){e.O(0,[1783,2888,9774,179],(function(){return t=8945,e(e.s=t);var t}));var t=e.O();_N_E=t}]);